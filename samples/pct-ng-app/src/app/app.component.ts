import { environment } from './../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndpointConnectionFactory, IEndpointConnection } from '@macrix/pct-cmd';
import { HubConnectionState } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;
  readonly console: Array<string>;
  command: any = `
  {
    "CustomerName": "ProconTEL team"
  }`;

  form: FormGroup;
  endpointConnection: IEndpointConnection;

  constructor(
    private connectionFactory: EndpointConnectionFactory,
    private formBuilder: FormBuilder) {
    this.title = 'ProconTEL';
    this.console = new Array<string>();
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      ip: [environment.procontelEndpointUrl, Validators.required]
    });
    this.form.markAllAsTouched();
  }

  async start() {
    this.endpointConnection = this.connectionFactory.create(this.form.get('ip').value);
    this.endpointConnection.onconnected(async id => {
      await this.endpointConnection.off('order_created');
      await this.endpointConnection.on('order_created', (command) => {
        this.console.push(`Received notification: ${JSON.stringify(this.command)}.`);
      });
    });
    await this.endpointConnection.start();
  }

  async stop() {
    await this.endpointConnection.stop();
  }

  get state(): HubConnectionState {
    return this.endpointConnection && this.endpointConnection.state;
  }

  get isConnected(): boolean {
    return this.state === HubConnectionState.Connected;
  }

  clearConsole() {
    this.console.splice(0, this.console.length);
  }

  createOrder() {
    this.clearConsole();
    this.console.push(`Sending POST command: ${JSON.stringify(this.command)}.`);
    this.endpointConnection
      .post('create_order', JSON.parse(this.command))
      .then(x => this.console.push('Command sent.'));
  }

  getOrder() {
    this.clearConsole();
    this.console.push(`Sending GET command: ${JSON.stringify(this.command)}.`);
    this.endpointConnection
      .get('create_order_sync', JSON.parse(this.command))
      .then(x => this.console.push(`Received: ${JSON.stringify(x)}.`));
  }
}

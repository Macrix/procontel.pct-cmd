import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HubConnectionState } from '@macrix/pct-cmd';
import { WebpointService } from './core/services';

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
  constructor(private webpointService: WebpointService, private formBuilder: FormBuilder) {
    this.title = 'ProconTEL';
    this.console = new Array<string>();
    this.webpointService
      .getPipe()
      .subscribe(x => this.console.push(`Received notification: ${JSON.stringify(x)}.`));
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      ip: [null, Validators.required]
    });
    this.form.markAllAsTouched();
  }

  start() {
    this.webpointService.start(this.form.get('ip').value);
  }

  stop() {
    this.webpointService.webpointConnection.stop().then(x => { });
  }

  get state(): HubConnectionState {
    return this.webpointService.webpointConnection && this.webpointService.webpointConnection.state;
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
    this.webpointService.createOrder(JSON.parse(this.command)).then(x => this.console.push('Command sent.'));
  }

  getOrder() {
    this.clearConsole();
    this.console.push(`Sending GET command: ${JSON.stringify(this.command)}.`);
    this.webpointService.getOrder(JSON.parse(this.command)).then(x => this.console.push(`Received: ${JSON.stringify(x)}.`));
  }
}

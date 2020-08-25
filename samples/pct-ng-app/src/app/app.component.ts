import { Component, OnInit } from '@angular/core';
import { WebpointService } from 'src/core/services/webpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;
  ngOnInit() {
    this.webpointService.start('http://localhost:5009');
  }
  constructor(private webpointService: WebpointService) {
    this.title = 'ProconTEL';
  }

  createOrder() {
    this.webpointService.createOrder();
  }

  getOrder(){
    this.webpointService.getOrder();
  }
}

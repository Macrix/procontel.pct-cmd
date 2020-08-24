import { Component, OnInit } from '@angular/core';
import { WebpointService } from 'src/core/services/webpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title: string;
  ngOnInit() {
    // this.operationsNotificationService.getOperationChange().subscribe(x => {
    //     this.snackBar.openFromComponent(OperationMessageComponent, {
    //       data: x.status === OperationStatus.Completed ? `Operation completed. Resource ${x.resource}` : `Operation rejected. Error ${x.code}`,
    //       panelClass: x.status === OperationStatus.Completed ? 'operation-completed' : 'operation-rejected',
    //       ...this.configSuccess
    //     });

    // });

    this.webpointService
      .start('f35b9ece-ba15-44d0-b863-ad13faf37b5b', 'http://localhost:5009')
      .subscribe();
  }
  constructor(private webpointService: WebpointService) {
    this.title = "Super";
  }
}

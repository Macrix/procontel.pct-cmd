import { Injectable } from '@angular/core';
import { EndpointConnection } from '@macrix/pct-cmd';
import { Observable, Observer, Subject, timer } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { delayWhen, map, retryWhen } from 'rxjs/operators';
import { AuthorizationService } from './authorization.service';

export enum OperationStatus {
    NotDefined,
    Sending,
    // network
    NetworkError,
    // in operation
    Pending,
    // error from server
    Rejected,
    Completed
}

export interface IOperationStatusInfo {
    resource: string;
    status: OperationStatus;
    operationId: string;
    code: string;
}


@Injectable({
    providedIn: 'root'
  })
export class WebpointService {

    private webpointConnection: EndpointConnection;
    private readonly notifier: Subject<IOperationStatusInfo>;
    constructor(private authorizationService: AuthorizationService) {
        this.notifier = new Subject<IOperationStatusInfo>();
    }

    getNotificationPipe(): Observable<IOperationStatusInfo> {
        return this.notifier.asObservable();
    }

    start(userId: string, baseUrl: string): Observable<boolean> {
        return Observable.create((obs: Observer<boolean>) => {
            this.webpointConnection =
                new EndpointConnection(baseUrl + '/hubs/commands/', { accessTokenFactory: () => this.authorizationService.getAccessToken() });

            this.webpointConnection.onclose(error => {
                if (error) {
                    console.error(`Connection close with error ${error}`);
                    this.start(userId, baseUrl).pipe(
                        retryWhen(errors => errors.pipe(
                            delayWhen(val => timer(1000))))
                    )
                    .subscribe(() => console.log('Reconnection successful'));
                } else {
                    console.log('Connection stoped.');
                }
            });

            return fromPromise(this.webpointConnection.start())
                .pipe(
                     map((x) => {
                        this.webpointConnection.on('web_order_created', (command) =>{
                            console.log(command);
                        } );

                        this.webpointConnection.post('PostAsync', 'create_order', {CustomerName: 'jkurdzieko'}).then(x => console.log(x));
                        // store.dispatch(ConnectionsActions.connect(id));
                        //this.webpointConnection.send('SubscribeAsync');
                        // this.webpointConnection.stream('GetChannelReader', 'order_created_www')
                        // .subscribe({
                        //     next: (item) => {
                        //         console.log(item);
                        //         // var li = document.createElement("li");
                        //         // li.textContent = item;
                        //         // document.getElementById("messagesList").appendChild(li);
                        //     },
                        //     complete: () => {
                        //         // var li = document.createElement("li");
                        //         // li.textContent = "Stream completed";
                        //         // document.getElementById("messagesList").appendChild(li);
                        //         console.log('completed');
                        //     },
                        //     error: (err) => {
                        //         // var li = document.createElement("li");
                        //         // li.textContent = err;
                        //         // document.getElementById("messagesList").appendChild(li);
                        //         console.log(err);
                        //     },
                        // });
                    }),
                    map(x => true)
                )
                .subscribe(obs);
        });
    }
}

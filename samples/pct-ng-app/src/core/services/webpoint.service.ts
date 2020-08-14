import { Injectable } from '@angular/core';
import { EndpointConnection } from '@macrix/pct-sdk';
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
                new EndpointConnection(baseUrl + '/hubs/', { accessTokenFactory: () => this.authorizationService.getAccessToken() });

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

            this.webpointConnection.on('pendingOperation', (evt) => {
                console.log(evt);
                this.notifier.next({
                        resource: evt.resource,
                        status: OperationStatus.Pending,
                        operationId: evt.aggregateId,
                        code: ''
                 });
            });


            return fromPromise(this.webpointConnection.start())
                .pipe(
                     map((x) => {
                        // store.dispatch(ConnectionsActions.connect(id));
                        this.webpointConnection.send('SubscribeAsync');
                    }),
                    map(x => true)
                )
                .subscribe(obs);
        });
    }
}

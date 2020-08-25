import { Injectable } from '@angular/core';
import { EndpointConnection } from '@macrix/pct-cmd';
import { Observable, Subject } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable({
    providedIn: 'root'
})
export class WebpointService {
    private webpointConnection: EndpointConnection;
    private readonly notifier: Subject<any>;
    constructor(private authorizationService: AuthorizationService) {
        this.notifier = new Subject<any>();
    }

    getPipe(): Observable<any> {
        return this.notifier.asObservable();
    }

    createOrder() {
        this.webpointConnection.post('create_order', { CustomerName: 'jkurdzieko' }).then(x => console.log(x));
    }

    getOrder() {
        this.webpointConnection.get('create_order_sync', { CustomerName: 'dwilczak' }).then(x => console.log(x));
    }

    public start(baseUrl: string){
        this.webpointConnection = new EndpointConnection(
            baseUrl + '/hubs/commands/',
            { accessTokenFactory: () => this.authorizationService.getAccessToken() });

        this.webpointConnection.onclose(error => {
            if (error) {
                console.error(`Connection close with error ${error}`);
            } else {
                console.log('Connection stoped.');
            }
        });

        this.webpointConnection.onreconnected(id => {
            console.log(`Reconnected. Id ${id}`);
            this.unsubscribe();
            this.subscribe();
        });

        this.webpointConnection
            .start()
            .then(() => {
                console.log('Connection started');
                this.subscribe();
            })
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    subscribe(){
        this.webpointConnection.on('web_order_created', (command) => {
            console.log(command);
        });
    }

    unsubscribe(){
        this.webpointConnection.off('web_order_created');
    }
}

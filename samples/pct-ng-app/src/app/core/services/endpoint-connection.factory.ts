import { Injectable } from '@angular/core';
import { EndpointConnection } from '@macrix/pct-cmd';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EndpointConnectionFactory {
    public async start(baseUrl: string): Promise<EndpointConnection> {
        const webpointConnection = new EndpointConnection(baseUrl + '/hubs/commands/');
        await webpointConnection.start();
        return webpointConnection;
    }
}

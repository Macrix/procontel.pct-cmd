import { EndpointConnection, IConnection } from ".";

export class EndpointConnectionFactory {
    public create(baseUrl: string): IConnection {
        return new EndpointConnection(baseUrl + '/hubs/commands/');
    }
}

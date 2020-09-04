import { EndpointConnection, IEndpointConnection } from ".";

export class EndpointConnectionFactory {
    public create(baseUrl: string): IEndpointConnection {
        return new EndpointConnection(baseUrl + '/hubs/commands/');
    }
}

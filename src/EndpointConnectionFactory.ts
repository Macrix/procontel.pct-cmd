import { EndpointConnection } from ".";

export class EndpointConnectionFactory {
    public async start(baseUrl: string): Promise<EndpointConnection> {
        const webpointConnection = new EndpointConnection(baseUrl + '/hubs/commands/');
        await webpointConnection.start();
        return webpointConnection;
    }
}

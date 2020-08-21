import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions, IStreamResult } from '@aspnet/signalr';
import { IDuplexConnection } from './';
export { IHttpConnectionOptions, IStreamResult };

export class EndpointConnection implements IDuplexConnection {
    private readonly connection: HubConnection;

    constructor(url: string, options: IHttpConnectionOptions = {}) {
        this.connection = new HubConnectionBuilder()
            .withUrl(url, options)
            .build();
        this.connection.onclose((error?: Error) => this.onclose ?? (error));
    }

    start(): Promise<void> {
        return this.connection.start();
    }

    stop(): Promise<void> {
        return this.connection.stop();
    }

    on(methodName: string, newMethod: (...args: any[]) => void): void {
        return this.connection.on(methodName, newMethod);
    }

    off(methodName: string): void {
        return this.connection.off(methodName);
    }

    get<T = any>(methodName: string, ...args: any[]): Promise<T> {
        return this.connection.invoke(methodName, ...args);
    }

    send(methodName: string, ...args: any[]): Promise<void> {
        return this.connection.send(methodName, ...args);
    }

    onclose(callback: (error?: Error) => void): void{
        this.connection.onclose(callback);
    }

    stream<T = any>(methodName: string, ...args: any[]): IStreamResult<T> {
        return this.connection.stream(methodName, ...args);
    }
}

import { HubConnection, HubConnectionBuilder, HubConnectionState, IHttpConnectionOptions, IStreamResult } from '@microsoft/signalr';
import { IConnection } from './';

export class EndpointConnection implements IConnection {
    private readonly connection: HubConnection;

    constructor(url: string, options: IHttpConnectionOptions = {}) {
        this.connection = new HubConnectionBuilder()
            .withAutomaticReconnect()
            .withUrl(url, options)
            .build();
    }

    get state(): HubConnectionState {
        return this.connection.state;
    }

    start(): Promise<void> {
        return this.connection.start();
    }

    stop(): Promise<void> {
        return this.connection.stop();
    }

    on(commandId: string, newMethod: (...args: any[]) => void): Promise<any> {
        this.connection.on(commandId, newMethod);
        return this.connection.invoke("AddToGroupAsync", commandId)
    }

    off(commandId: string): Promise<any> {
        this.connection.off(commandId);
        return this.connection.invoke("RemoveFromGroupAsync", commandId)
    }

    get<T = any>(commandId: string, arg: any): Promise<T> {
        return this.connection.invoke('GetAsync', commandId, arg);
    }

    post(commandId: string, arg: any): Promise<void> {
        return this.connection.send('PostAsync', commandId, arg);
    }

    onclose(callback: (error?: Error) => void): void {
        this.connection.onclose(callback);
    }

    onreconnecting(callback: (error?: Error) => void): void {
        this.connection.onreconnecting(callback);
    }

    onreconnected(callback: (connectionId?: string) => void): void {
        this.connection.onreconnected(callback);
    }

    stream<T = any>(methodName: string, ...args: any[]): IStreamResult<T> {
        return this.connection.stream(methodName, ...args);
    }
}

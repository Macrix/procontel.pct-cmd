import { HubConnectionState } from "@microsoft/signalr"

export interface IDuplexConnection {
    start(): Promise<void>;
    stop(): Promise<void>;

    on(commandId: string, newMethod: (...args: any[]) => void): void
    off(commandId: string): void;
    get<T = any>(commandId: string, arg: any): Promise<T>;
    post(commandId: string, arg: any): Promise<void>;
 
    onclose(callback: (error?: Error) => void): void;
    onreconnecting(callback: (error?: Error) => void): void;
    onreconnected(callback: (connectionId?: string) => void): void;

    state: HubConnectionState;
}

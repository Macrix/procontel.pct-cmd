
export interface IDuplexConnection {
    start(): Promise<void>;
    stop(): Promise<void>;

    on(methodName: string, newMethod: (...args: any[]) => void): void
    off(methodName: string): void;
    get<T = any>(methodName: string, ...args: any[]): Promise<T>;
    send(methodName: string, ...args: any[]): Promise<void>;
 
    onclose(callback: (error?: Error) => void): void;
}

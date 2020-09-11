import { EndpointConnectionFactory, IEndpointConnection } from '@macrix/pct-cmd';
import React from 'react';
import { useFormInput } from './../hooks';
import { HubConnectionState } from '@microsoft/signalr';

type Props = {}
export const Orders: React.FC = props => {
    const { } = props;
    const ip = useFormInput('http://localhost:6001');
    const [factory, setFactory] = React.useState(new EndpointConnectionFactory());
    const [connection, setConnection] = React.useState<IEndpointConnection>(null!);
    const [connectionState, setConnectionState] = React.useState<HubConnectionState>(HubConnectionState.Disconnected);
    const [logs, _setLogs] = React.useState<string[]>([]);

    const stateRef = React.useRef(logs);
    const setLogs = (data: string[]) => {
        stateRef.current = data;
        _setLogs(data);
    };

    const handleSubmit = () => { };

    const start = async () => {
        const connection = factory.create(ip.value);
        connection.onconnected(id => {
            connection.off('order_created');
            connection.on('order_created', (command) => {
                setLogs([
                    ...stateRef.current,
                    `Received notification: ${JSON.stringify(command)}.`
                ]);
            });
        });
        try {
            await connection.start();
        }
        catch (err) {
            console.error(err);
        }
        setConnection(connection);
        setConnectionState(connection.state);
    };

    const stop = async () => {
        await connection.stop();
        setConnectionState(connection.state);
    };

    const printConnectionButtons = () =>
        connectionState && connectionState === 'Connected' ?
            (<button onClick={async (ev) => await stop()}>Stop</button>) :
            (<button onClick={async (ev) => await start()}>Start</button>)


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Endpoint IP:
             </label>
                <br></br>
                <input type="text" name="name" {...ip} disabled={connectionState !== 'Disconnected'}/>
            </form>
            {connectionState}
            <br></br>
            {printConnectionButtons()}
            {/* <form onSubmit={addItem}>
                <label>
                    <input
                        name="item"
                        type="text"
                        value={itemName}
                        onChange={e => setItemName(e.target.value)}
                    />
                </label>
            </form> */}

            <ul>
                {logs.map((log, idx) => (
                    <li key={idx}>{log}</li>
                ))}
            </ul>
        </>
    )
}
    // constructor(props: {}) {
    //     super(props);

    //     this.state = {
    //         console: new Array<string>(),
    //         connectionFactory: new EndpointConnectionFactory,
    //         hubConnection: null,
    //     };
    // }

//     render() {
//         return <div>Here goes chat
//             <button onClick={async (ev) => start()}>Start</button>
//             <button onClick={async (ev) => stop()}>Stop</button>
//         </div>;
//     }

//     async start() {
//         this.state.
//         this.endpointConnection = await this.connectionFactory.start(this.form.get('ip').value);
//         this.endpointConnection.onreconnected(id => {
//           this.endpointConnection.off('order_created');
//           this.subscribe();
//         });
//         this.subscribe();
//       }

//       subscribe() {
//         this.endpointConnection.on('order_created', (command) => {
//           this.console.push(`Received notification: ${JSON.stringify(this.command)}.`);
//         });
//       }

//       async stop() {
//         await this.endpointConnection.stop();
//       }

//       get state(): HubConnectionState {
//         return this.endpointConnection && this.endpointConnection.state;
//       }

//       get isConnected(): boolean {
//         return this.state === HubConnectionState.Connected;
//       }

//       clearConsole() {
//         this.console.splice(0, this.console.length);
//       }

//       createOrder() {
//         this.clearConsole();
//         this.console.push(`Sending POST command: ${JSON.stringify(this.command)}.`);
//         this.endpointConnection
//           .post('create_order', JSON.parse(this.command))
//           .then(x => this.console.push('Command sent.'));
//       }

//       getOrder() {
//         this.clearConsole();
//         this.console.push(`Sending GET command: ${JSON.stringify(this.command)}.`);
//         this.endpointConnection
//           .get('create_order_sync', JSON.parse(this.command))
//           .then(x => this.console.push(`Received: ${JSON.stringify(x)}.`));
//       }

//     componentDidMount = () => {

//         const hubConnection = new EndpointConnectionFactory('http://localhost:7001');

//         this.setState({ hubConnection, nick }, () => {
//           this.state.hubConnection
//             .start()
//             .then(() => console.log('Connection started!'))
//             .catch(err => console.log('Error while establishing connection :('));
//         });
//     }
// }
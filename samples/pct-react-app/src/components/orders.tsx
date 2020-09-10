import { EndpointConnectionFactory, IEndpointConnection } from '@macrix/pct-cmd';
import React from 'react';
import { useFormInput } from './../hooks';

type Props = {
}
export const Orders: React.FC<Props> = props => {
    const { } = props;
    const ip = useFormInput('http://localhost:7001');
    const [factory, setFactory] = React.useState(new EndpointConnectionFactory());
    const [connection, setConnection] = React.useState<IEndpointConnection>(null!);
    const [console, setConsole] = React.useState(new Array<string>());
    const handleSubmit = () => { }
    const start = async () => {
        const connection = factory.create(ip.value);
        connection.onconnected(id => {
            connection.off('order_created');
            connection.on('order_created', (command) => {
                setConsole([
                    ...console,
                    `Received notification: ${JSON.stringify(command)}.`
                ]);
            });
        });
        await connection.start();
        setConnection(connection);
    };

    const stop = async () => {
        await connection.stop();
    };
    const printConnectionButtons = () =>
        connection && connection.state === 'Connected' ?
            (<button onClick={async (ev) => await stop()}>Stop</button>) :
            (<button onClick={async (ev) => await start()}>Start</button>)
    const printConnectionStatus = () => connection ? connection.state : 'Not started'


    return <div>
        <form onSubmit={handleSubmit}>
            <label>
                Endpoint IP:
            </label>
            <br></br>
            <input type="text" name="name" {...ip} />
        </form>
        {printConnectionStatus()}
        <br></br>
        {printConnectionButtons()}
        <ul>
            {console.map((item, idx) => (
                <li key={idx}>{item}</li>
            ))}
        </ul>
    </div>
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
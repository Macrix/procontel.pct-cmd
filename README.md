# pct-cmd

[![npm version](https://badge.fury.io/js/@macrix%2Fpct-cmd.svg)](https://www.npmjs.org/package/@macrix/pct-cmd)
[![install size](https://packagephobia.now.sh/badge?p=@macrix%2Fpct-cmd)](https://packagephobia.now.sh/result?p=@macrix/pct-cmd)
[![npm downloads](https://img.shields.io/npm/dm/@macrix%2Fpct-cmd.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@macrix/pct-cmd)
## Table of Contents

1. [Quick introduction](#id-quick-introduction)
2. [Installation](#id-installation)
3. [Features](#id-features)
4. [Angular](#id-angular)
    1. [Start connection](#id-angular-start-connection)
    2. [Reconnect](#id-angular-reconnect)
    3. [On](#id-angular-on)
    4. [Off](#id-angular-off)
    5. [Post](#id-angular-post)
    6. [Get](#id-angular-get)
5. [React](#id-react)
    1. [Start connection](#id-react-start-connection)
    2. [Reconnect](#id-react-reconnect)
    3. [On](#id-react-on)
    4. [Off](#id-react-off)
    5. [Post](#id-react-post)
    6. [Get](#id-react-get)
6. [Deployment](#id-deployment)

<div id='id-quick-introduction'/>

## 1. Quick introduction

`pct-cmd` is a modern npm package provide communication layer to ProconTel web infrastructure.

<div id='id-installation'/>

## 2. Installation
You can install the latest released JavaScript client from npm with the following command:

```npm install @macrix/pct-cmd```

<div id='id-features'/>

## 3. Features
Table below lists feature available in package *@macrix/pct-cmd* and compares it with features available in next release.

| Feature                   | [![npm version](https://badge.fury.io/js/@macrix%2Fpct-cmd.svg)](https://www.npmjs.org/package/@macrix/pct-cmd) | <br>*Next*  |
| :---                      |:---:                  |:---:        |
| Start connection          | ✓                     | ✓           |
| Reconnect                 | ✓                     | ✓           |
| On                        | ✓                     | ✓           | 
| Off                       | ✓                     | ✓           | 
| Post                      | ✓                     | ✓           | 
| Get                       | ✓                     | ✓           | 

<div id='id-angular'/>

## 4. Angular

List of  code samples which describes how to integrate `@macrix/pct-cmd` with `angular` framework. 
To run angular sample app run command:
```docker run --rm -p 3000:80 macrix/pct-ng-app``` 

<div id='id-angular-start-connection'/>

* ### Start connection
This is simple example how to start connection with endpoint.
```csharp
import { EndpointConnection } from '@macrix/pct-cmd';

export class EndpointConnectionFactory {
    public async start(baseUrl: string): Promise<EndpointConnection> {
        const endpointConnection = new EndpointConnection(baseUrl + '/hubs/commands/');
        await endpointConnection.start();
        return endpointConnection;
    }
}
```

or use existing factory method
```csharp
import { EndpointConnectionFactory, IEndpointConnection } from '@macrix/pct-cmd';

export class AppComponent implements OnInit {
  endpointConnection: IEndpointConnection;
  constructor(private connectionFactory: EndpointConnectionFactoryr) { }
  async start() {
    this.endpointConnection = this.connectionFactory.create(environment.procontelEndpointUrl);
    await this.endpointConnection.start();
  }
}
```

<div id='id-angular-reconnect'/>

* ### Reconnect
This is simple example how to appropriate handle reconnect process.

<b>IMPORTANT: Always unsubscribe and subscribe during reconnect process.  </b>

```csharp
  this.endpointConnection = this.connectionFactory.create(environment.procontelEndpointUrl);
    this.endpointConnection.onconnected(async id => {
      await this.endpointConnection.off('order_created');
      await this.endpointConnection.on('order_created', (command) => {
        //some business logic
      });
    });
```

<div id='id-angular-on'/>

* ### On
This is simple example how we can <b>subscribe</b> on server push notification.

<b>IMPORTANT: Subscribe on server push notification after connection start established. </b>

```csharp
  this.endpointConnection = this.connectionFactory.create(environment.procontelEndpointUrl);
  await this.endpointConnection.start();
  await this.endpointConnection.on('order_created', (command) => {
    //some business logic
  });
});
```
<div id='id-angular-off'/>

* ### Off
This is simple example how we can <b>unsubscribe</b> on server push notification.

```csharp
  await this.endpointConnection.off('order_created');
```

<div id='id-angular-post'/>

* ### Post
This is simple example how we can send <b>POST</b> command. Operation result will be deliver by server push notification.
```csharp
  await this.endpointConnection.on('order_created', (command) => {
    //some business logic
  });

  this.endpointConnection
    .post('create_order', this.command)
    .then(x => console.log('Command sent.'));
```

<div id='id-angular-get'/>

* ### Get 
This is simple example how we can send <b>GET</b> command. Operation result will be deliver as a <b>GET</b> method result.
```csharp
  this.endpointConnection
    .get('create_order_sync', this.command)
    .then(x => {
      //some business logic
    }));
```

<div id='id-react'/>

## 5. React

List of  code samples which describes how to integrate `@macrix/pct-cmd` with `react` framework.
To run react sample app run command:
```docker run --rm -p 3000:80 macrix/pct-react-app``` 
<div id='id-react-start-connection'/>

* ### Start connection
This is simple example how to start connection with endpoint.
```csharp
import { EndpointConnection } from '@macrix/pct-cmd';

export class EndpointConnectionFactory {
    public async start(baseUrl: string): Promise<EndpointConnection> {
        const endpointConnection = new EndpointConnection(baseUrl + '/hubs/commands/');
        await endpointConnection.start();
        return endpointConnection;
    }
}
```

or use existing factory method
```csharp
import { EndpointConnectionFactory, IEndpointConnection } from '@macrix/pct-cmd';

export const AppComponent: React.FC = props => {
  const [factory] = React.useState(new EndpointConnectionFactory());
  const [endpointConnection, setEndpointConnection] = React.useState<IEndpointConnection>(null!);
  async start() {
    const connection = factory.create(environment.procontelEndpointUrl);
    await this.endpointConnection.start();
    setEndpointConnection(connection);
  }
}
```

<div id='id-react-reconnect'/>

* ### Reconnect
This is simple example how to appropriate handle reconnect process.

<b>IMPORTANT: Always unsubscribe and subscribe during reconnect process.  </b>

```csharp
  const connection = factory.create(environment.procontelEndpointUrl);
  connection.onconnected(async id => {
    await connection.off('order_created');
    await connection.on('order_created', (command) => {
      //some business logic
    });
  });
  await connection.start();
```

<div id='id-react-on'/>

* ### On
This is simple example how we can <b>subscribe</b> on server push notification.

<b>IMPORTANT: Subscribe on server push notification after connection start established. </b>

```csharp
  const connection = factory.create(environment.procontelEndpointUrl);
  await connection.start();
  await connection.on('order_created', (command) => {
    //some business logic
  });
```
<div id='id-react-off'/>

* ### Off
This is simple example how we can <b>unsubscribe</b> on server push notification.

```csharp
  await endpointConnection.off('order_created');
```

<div id='id-react-post'/>

* ### Pos
This is simple example how we can send <b>POST</b> command. Operation result will be deliver by server push notification.
```csharp
  await endpointConnection.on('order_created', (command) => {
    //some business logic
  });

  endpointConnection
    .post('create_order', command)
    .then(x => console.log('Command sent.'));
```

<div id='id-react-get'/>

* ### Get
This is simple example how we can send <b>GET</b> command. Operation result will be deliver as a <b>GET</b> method result.
```csharp
  endpointConnection
    .get('create_order_sync', this.command)
    .then(x => {
      //some business logic
    }));

<div id='id-deployment'/>

## 6. Deployment

<div id='id-deployment-github'/>

* ### Github
```csharp

```

<div id='id-deployment-gitlab'/>

* ### GitLab
```csharp

```

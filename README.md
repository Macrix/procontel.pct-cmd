# pct-cmd

## Table of Contents

1. [Quick introduction](#id-quick-introduction)
2. [Installation](#id-installation)
3. [Features](#id-feature)
4. [Angular](#id-angular)
    1. [Start connection](#id-angular-start-connection)
    2. [Post command](#id-angular-post-command)
    3. [Get command](#id-angular-get-command)
5. [React](#id-react)
    1. [Start connection](#id-react-start-connection)
    2. [Post command](#id-react-post-command)
    3. [Get command](#id-react-get-command)
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

| Feature                   | 1.0.13 <br>*Current*  | <br>*Next*  |
| :---                      |:---:                  |:---:        |
| Start connection          | ✓                     | ✓           | 
| Stop  connection          | ✓                     | ✓           | 

<div id='id-angular'/>

## 4. Angular

List of  code samples which describes how to integrate `@macrix/pct-cmd` with `angular` framework. 
To run angular sample app run command:
```docker run -p 3000:80 macrix/pct-ng-app``` 

<div id='id-angular-start-connection'/>

* ### Start connection
This is simple example how we can decorate endpoint class.
```csharp
  [EndpointMetadata(Name = "Empty", SupportedRoles = SupportedRoles.Both)]
  public class EmptyEndpoint
  {
  }
```

<div id='id-angular-post-command'/>

* ### Post command
This is simple example how we can decorate endpoint class.
```csharp
  [EndpointMetadata(Name = "Empty", SupportedRoles = SupportedRoles.Both)]
  public class EmptyEndpoint
  {
  }
```

<div id='id-angular-get-command'/>

* ### Get command
This is simple example how we can decorate endpoint class.
```csharp
  [EndpointMetadata(Name = "Empty", SupportedRoles = SupportedRoles.Both)]
  public class EmptyEndpoint
  {
  }
```

<div id='id-react'/>

## 5. React

List of  code samples which describes how to integrate `@macrix/pct-cmd` with `react` framework. 

<div id='id-react-start-connection'/>

* ### Start connection
This is simple example how we can decorate endpoint class.
```csharp
  [EndpointMetadata(Name = "Empty", SupportedRoles = SupportedRoles.Both)]
  public class EmptyEndpoint
  {
  }
```

<div id='id-react-post-command'/>

* ### Post command
This is simple example how we can decorate endpoint class.
```csharp
  [EndpointMetadata(Name = "Empty", SupportedRoles = SupportedRoles.Both)]
  public class EmptyEndpoint
  {
  }
```

<div id='id-react-get-command'/>

* ### Get command
This is simple example how we can decorate endpoint class.
```csharp
  [EndpointMetadata(Name = "Empty", SupportedRoles = SupportedRoles.Both)]
  public class EmptyEndpoint
  {
  }
```

## 6. Deployment

<div id='id-deployment-github'/>

* ### Github
```csharp

```

<div id='id-deployment-gitlab'/>

* ### GitLab
```csharp

```

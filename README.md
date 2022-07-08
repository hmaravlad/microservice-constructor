# microservice-constructor

This program generates parts of microservice-based web-app, which include:
- kubernetes configuration files for microservices, databases, API gateways and message brokers;
- configuration files for CI/CD;
- parts of code of microservices.

## Installation

### Windows

Download archive with executable file [here](https://github.com/hmaravlad/microservice-constructor/releases) and unzip it. 

### Linux

Download archive with deb package [here](https://github.com/hmaravlad/microservice-constructor/releases) and unzip it. Use apt to install it:
```
$ sudo apt install ./microservice-constructor_1.0.13.deb
```

## Usage

Firstly, create [here](https://microservice-constructor-front.herokuapp.com) and export configuration for your project.

Then run console app to generate project. Enter path to configuration file as "source" argument and folder for generating project as "target" argument:
```
$ microservice-constructor --source=./config.json --target=./project-dir
```
After that enter requested values and wait for project generation.
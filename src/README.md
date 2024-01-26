# Hi Everyone 👋,

Let's setup your environment

## Things We code with

![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=white&style=for-the-badge)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white&style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-46a2f1?logo=docker&logoColor=white&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge)
![Nodejs](https://img.shields.io/badge/Nodejs-43853d?logo=Node.js&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-13aa52?logo=mongodb&logoColor=white&style=for-the-badge)
![Redis](https://img.shields.io/badge/Redis-CB3837?logo=redis&logoColor=white&style=for-the-badge)
![BullMQ](https://img.shields.io/badge/BullMQ-1E293B?logo=bullmq&logoColor=white&style=for-the-badge)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?logo=socketio&logoColor=white&style=for-the-badge)

## Docker

### Installation

You can download and install Docker on https://docs.docker.com/desktop/install/windows-install/

### Network

```bash
docker network create vnf-network
```

### Ubuntu

```bash
docker run --name vnf-ubuntu --network vnf-network -p 80:8080 -p 443:8443 -p 22:22 -itd ubuntu:latest
```

### MongoDB

#### Primary

```bash
docker run -d --network vnf-network -p 127.0.10.1:27017:27017 --name vnf-mongo mongo:latest mongod --replSet repl-set

docker exec -it vnf-mongo mongosh

config = { "_id" : "repl-set", "members" : [ { "_id" : 0, "host" : "vnf-mongo:27017" }, { "_id" : 1, "host" : "vnf-mongo-secondary:27017" } ] }

rs.initiate(config)
```

##### Secondary

```bash
docker run -d --network vnf-network -p 127.0.20.1:27017:27017 --name vnf-mongo-secondary mongo:latest mongod --replSet repl-set

docker exec -it vnf-mongo-secondary mongosh
```

##### Add Host

```txt
# Docker VNF MongoDB Replica Set
127.0.10.1 vnf-mongo
127.0.20.1 vnf-mongo-secondary
# End of section
```

#### URI

```txt
mongodb://vnf-mongo:27017,vnf-mongo-secondary:27018/test?replicaSet=repl-set
```

#### Redis

```bash
docker run -d --network vnf-network -p 6379:6379 --name vnf-redis redis:latest
```

### Docker Build

```bash
docker build . -t vnf-rest:latest
```

### Docker Run

```bash
docker run -d -p 80:80 -p 443:443 --network vnf-network -v d:/Debug/vnf-rest/app:/app/ --name vnf-rest vnf-rest:latest
```

### Docker Compose

```bash
docker-compose up
```

## Git Branch Naming Convention

### Code Flow Branches

➖ Development (dev)

All new features and bug fixes should be brought to the development branch.

➖ QA/Test (test)

Contains all codes ready for QA testing.

➖ Staging (staging, Optional)

It contains tested features that the stakeholders wanted to be available either for a demo or a proposal before elevating into production.

➖ Master (master)

The production branch, if the repository is published, is the default branch being presented.

### Temporary Branches

#### ➖ Feature

Any code changes for a new module or use case should be done on a feature branch. This branch is created based on the current development branch. When all changes are Done, a Pull Request/Merge Request is needed to put all of these to the development branch.

Examples

feature/AZURE-1234

feature/AZURE-5678

#### ➖ Bug Fix

If the code changes made from the feature branch were rejected after a release, sprint or demo, any necessary fixes after that should be done on the bugfix branch.

Examples

bugfix/AZURE-1234

bugfix/AZURE-5678

#### ➖ Hot Fix
If there is a need to fix a blocker, do a temporary patch, or apply a critical framework or configuration change that should be handled immediately, it should be created as a Hotfix. It does not follow the scheduled integration of code and could be merged directly to the production branch and then into the development branch later.

Examples

hotfix/disable-endpoint-zero-day-exploit

hotfix/increase-scaling-threshold

#### ➖ Experimental
Any new feature or idea that is not part of a release or a sprint. A branch for playing around.

Examples

experimental/dark-theme-support

#### ➖ Build
A branch specifically for creating specific build artifacts or for doing code coverage runs.

Examples

build/azure-metric

#### ➖ Release
A branch for tagging a specific release version.

Examples

release/app-1.0.0

#### ➖ Merging
A temporary branch for resolving merge conflicts, usually between the latest development and a feature or Hotfix branch. This can also be used if two branches of a feature being worked on by multiple developers need to be merged, verified, and finalized.

Examples

merge/dev_lombok-refactoring

merge/combined-device-support

## MongoDB Naming Conventions

Use clear, descriptive names. Use camelCase for multi-word names. Avoid using MongoDB reserved words.

## Visual Studio Extensions

- ESLint
- Prettier - Code formatter
- Prettier ESLint
- SonarLint
- Code Spell Checker

## Issues

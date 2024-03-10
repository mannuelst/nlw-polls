# nlw-polls

## Description

nlw-polls is a TypeScript project aimed at building a polling application. It utilizes Fastify as the web server framework, Prisma for database operations, and integrates WebSocket functionality for real-time communication. Additionally, it employs Zod for input validation and Ioredis for Redis support.

## Installation

To install nlw-polls, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/nlw-polls.git`
2. Navigate to the project directory: `cd nlw-polls`
3. Install dependencies: `npm install`

## Usage

To run the project in development mode, execute the following command:

```
npm run dev
```

This command will start the TypeScript compiler in watch mode, rebuilding the project when changes are detected, and launch the Fastify server.

## Dependencies

- [@fastify/cookie](https://www.npmjs.com/package/@fastify/cookie): Version 9.3.1
- [@fastify/websocket](https://www.npmjs.com/package/@fastify/websocket): Version 9.0.0
- [@prisma/client](https://www.npmjs.com/package/@prisma/client): Version 5.9.1
- [fastify](https://www.npmjs.com/package/fastify): Version 4.26.1
- [ioredis](https://www.npmjs.com/package/ioredis): Version 5.3.2
- [zod](https://www.npmjs.com/package/zod): Version 3.22.4

## Dev Dependencies

- [@types/node](https://www.npmjs.com/package/@types/node): Version 20.11.17
- [prisma](https://www.npmjs.com/package/prisma): Version 5.9.1
- [tsx](https://www.npmjs.com/package/tsx): Version 4.7.1
- [typescript](https://www.npmjs.com/package/typescript): Version 5.3.3

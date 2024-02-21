
import cookie from '@fastify/cookie';
import fastify from "fastify";

import { createPoll } from "../routes/create-poll";
import { getPoll } from "../routes/get-poll";
import { voteOnPoll } from "../routes/vote-on-poll";



const PORT = process.env.PORT || 3
const app = fastify({ logger: true })
// const app = fastify()

app.register(cookie, {
    secret: "polls-app",//um chave!!!
    hook: "onRequest",
    // parseOptions: {}
})

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)


// app.get('/', () => {
//     return 'ROOT ROUT!'

// })

app.listen({ port: PORT }).then(() => { console.log(`HTTP server is running on ${PORT}!`); })

import fastify from "fastify";

import { createPoll } from "../routes/create-poll";
import { getPoll } from "../routes/get-poll";
const PORT = process.env.PORT || 3333
// const app = fastify({ logger: true })
const app = fastify()
app.register(createPoll)
app.register(getPoll)
app.get('/', () => {
    return 'ROOT ROUT!'

})

app.listen({
    port: PORT,
}).then(() => { console.log(`HTTP server is running on ${PORT}!`); })
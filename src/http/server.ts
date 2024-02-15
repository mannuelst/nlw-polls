
import fastify from "fastify";

import { createPoll } from "../routes/create-poll";

const app = fastify()
app.register(createPoll)
app.get ('/',()=>{
    return 'ROOT ROUT!'

})

app.listen({
    port: 3333
}).then(() => {
    console.log("HTTP server is running!");
})
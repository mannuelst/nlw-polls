import fastify from "fastify";

const app = fastify()

app.post('/polls', (req) => {
    return 'Hello Server'
})

app.listen({
    port: 3333
}).then(() => {
    console.log("HTTP server is running!");
})
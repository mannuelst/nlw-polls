import { PrismaClient } from '@prisma/client';
import fastify from "fastify";
import { z } from 'zod';

const app = fastify()
const prisma = new PrismaClient()

app.post('/polls', async(request, reply) => {
    const createPoll = z.object({
        title :z.string()
    })
    const { title } = createPoll.parse(request.body)
    const poll = await prisma.poll.create(
        {data: 
            {
                title
            }
        })

   // console.log(request.body.title)
    return reply.status(201).send({pollid: poll.id})
})

app.listen({
    port: 3333
}).then(() => {
    console.log("HTTP server is running!");
})
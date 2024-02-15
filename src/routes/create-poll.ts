import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function createPoll(app:FastifyInstance) {  
app.post('/polls', async(request, reply) => {
    const createPoll = z.object({
        title :z.string(),
        options: z.array(z.string())
    })

    const { title, options } = createPoll.parse(request.body)


    const poll = await prisma.poll.create({
        data:{
            title,
            options: {
                createMany :{
                    data: options.map(opt=>{
                        return {title: opt}
                    })
                }
            }
        } 
            
    })       
        // console.log(request.body.title)
        return reply.status(201).send({pollid: poll.id})
    })
}
 
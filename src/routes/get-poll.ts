import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function getPoll(app: FastifyInstance) {
    app.get('/polls/:pollId', async (request, reply) => {
        const getPoll = z.object({
            pollId: z.string().uuid(),
            // options: z.array(z.string())
        })

        const { pollId } = getPoll.parse(request.params)


        const poll = await prisma.poll.findUnique({
            where: {
                id: pollId
            },
            include: {
                //options:true
                options: {
                    select: {
                        id: true,
                        title: true

                    }

                }
            }
        })
        // console.log(request.body.title)
        return reply.send({ poll })
    })
}

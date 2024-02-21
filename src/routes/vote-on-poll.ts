import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { redis } from "../lib/redis";

export async function voteOnPoll(app: FastifyInstance) {
    app.post('/polls/:pollId/votes', async (request, reply) => {
        console.log('inicio')
        const voteOnPollBody = z.object({
            pollOptionId: z.string().uuid()
        })

        const voteOnPollParams = z.object({
            pollId: z.string().uuid()
        })
        const { pollId } = voteOnPollParams.parse(request.params)
        const { pollOptionId } = voteOnPollBody.parse(request.body)


        let { sessionId } = request.cookies
        if (sessionId) {
            const userPreviousVoteOnPol = await prisma.vote.findUnique({
                where: {
                    sessionId_pollId: {
                        sessionId,
                        pollId
                    }
                }
            })
            if (userPreviousVoteOnPol && userPreviousVoteOnPol.pollOptionId !== pollOptionId) {
                await prisma.vote.delete({
                    where: {
                        id: userPreviousVoteOnPol.id
                    }
                })
                await redis.zincrby(pollId, -1, userPreviousVoteOnPol.pollOptionId)

            } else if (userPreviousVoteOnPol) {
                return reply.status(400).send('you alredy voted on this poll! ')
            }
        }

        if (!sessionId) { //verificando se já existe uma sessão 
            sessionId = randomUUID()
            //console.log({ sessionId })
            reply.setCookie('sessionId', sessionId, {
                path: '/',//em quais rotas o cookie estará on
                maxAge: 60 * 60 * 24 * 30,//30dyas[em segundos], tempo de duração
                signed: true,
                httpOnly: true,
            })
            console.log({ sessionId })

        }
        await prisma.vote.create({
            data: {
                sessionId,
                pollId,
                pollOptionId

            }
        })

        await redis.zincrby(pollId, 1, pollOptionId)
        console.log('fim', { sessionId })

        return reply.status(201).send()
    })
}

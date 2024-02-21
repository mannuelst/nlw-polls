import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from 'zod';

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


        let session_Id = request.cookies.sessionId

        if (!session_Id) { //verificando se já existe uma sessão 
            session_Id = randomUUID()
            // console.log({ session_Id })
            reply.setCookie('sessionId', session_Id, {
                path: '/',//em quais rotas o cookie estará on
                maxAge: 60 * 60 * 24 * 30,//30dyas[em segundos], tempo de duração
                signed: true,
                httpOnly: true,
            })
            console.log('passei!')
        }
        console.log('fim', { session_Id })

        return reply.status(201).send(session_Id)
    })
}

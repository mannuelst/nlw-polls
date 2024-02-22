import { FastifyInstance } from "fastify";
import z from "zod";
import { voting } from "../../utils/voting-pub-sub";

export async function pollResult(app: FastifyInstance) {
    app.get('/poll/:pollId/results', {
        websocket: true
    }, (connection, request) => {
        // connection.socket.on('message', (message: string) => {
        //      connection.socket.send('you sent: ' + message)

        // })
        const getPollParamns = z.object({
            pollId: z.string().uuid()
        })

        const { pollId } = getPollParamns.parse(request.params)
        voting.subscriber(pollId, (message) => {
            connection.socket.send(JSON.stringify(message))
        })
    })
}
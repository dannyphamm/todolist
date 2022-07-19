import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ServerResponse } from 'http'
import { createContext } from '../../graphql/context'
import { schema } from '../../graphql/schema';
import { PageConfig } from 'next'
const cors = Cors()

const apolloServer = new ApolloServer({
    schema,
    context: createContext
})

const startServer = apolloServer.start()

export default cors(async function handler(req: MicroRequest, res: ServerResponse) {
    if (req.method === 'OPTIONS') {
        res.end()
        return false
    }
    await startServer

    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res)
})

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
}
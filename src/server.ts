import { createServer } from 'http'
import app from './app'
import { PORT, ENV } from './config/keys'
export const server = createServer(app)

server.listen(PORT, () => {
	console.log(`server running in ${ENV} and listening on port ${PORT}\n`)
})

import mongoose from 'mongoose'
import { DATABASE_URI } from './keys'
// import Logger from '../infrastructure/Logger'
// import CryptoProfiler from '../core/profiler'

class Database {
	database: MongoDatabase

	constructor(database: MongoDatabase) {
		this.database = database
	}

	connectDatabase(): void {
		this.database.connect()
	}
}

class MongoDatabase {
	// connect(): void {
	// 	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	// 	mongoose.connect(DATABASE_URI!, { useUnifiedTopology: true, useNewUrlParser: true })

	// 	mongoose.connection.on('connected', async function() {
	// 		// Logger.info('mongoose connected to ' + databaseURI)
	// 		console.log('mongodb connected')
	// 	})

	// 	mongoose.connection.on('disconnected', function() {
	// 		// Logger.error('mongoose disconnected')
	// 	})

	// 	mongoose.connection.on('error', function(err) {
	// 		// Logger.error('mongoose connection error ' + err)
	// 	})

	// 	process.on('SIGINT', function() {
	// 		mongoose.connection.close(function() {
	// 			// Logger.error('mongoose disconnected through app termination!')
	// 			process.exit(0)
	// 		})
	// 	})

	// 	process.on('SIGTERM', function() {
	// 		mongoose.connection.close(function() {
	// 			// Logger.error('mongoose disconnected through app termination!')
	// 			process.exit(0)
	// 		})
	// 	})

	// 	process.once('SIGUSR2', function() {
	// 		mongoose.connection.close(function() {
	// 			// Logger.error('mongoose disconnected through app termination!')
	// 			process.kill(process.pid, 'SIGUSR2')
	// 		})
	// 	})
	// }

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	async connect() {
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const conn: any = mongoose.connect(DATABASE_URI, { useUnifiedTopology: true, useNewUrlParser: true })
			console.log(`mongo db connected: ${(await conn).connection.host}\n`)
		} catch (error) {
			console.log(`Unable to connect to MongoDB. Error: ${error.message}`)
			process.exit(1)
		}
	}
}

export default new Database(new MongoDatabase())

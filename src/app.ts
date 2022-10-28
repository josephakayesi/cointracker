import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import hpp from 'hpp'
import cors from 'cors'
import compression from 'compression'
import Database from './config/Database'
import { errorHandler } from './core/middleware/handlers/error'
import { ENV } from './config/keys'

// Routes
import auth from './api/routes/auth'
import users from './api/routes/users'
import path from 'path'

// Initialize express
const app: Express = express()

// Disable etag and x-powered-by to improve server performance
app.disable('etag').disable('x-powered-by')

// Express body parser middleware
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ limit: '20mb', extended: false }))

// Express-Mongo-Sanitize middleware
app.use(mongoSanitize())

// Set security headers with helmet middleware
app.use(
	helmet({
		contentSecurityPolicy: ENV === 'development' ? false : true,
	}),
)

// Prevent cross-site scripting attacks with XSS-Clean middlware
app.use(xss())

// Prevent hpp param polution middleware
app.use(hpp())

// Use cors middleware
app.use(cors())

// Use compression middleware
app.use(compression())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Connect to database
Database.connectDatabase()

// Development logging middleware
if (ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(function(req, res, next) {
	res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'")
	next()
})

// Index route
app.get('/', (req: Request, res: Response) => {
	// return res.status(200).json({
	// 	ENV,
	// 	message: `welcome to cointracker`,
	// })
	return res.sendFile(path.join(__dirname + 'public', '/index.html'))
})

// Mount routes
app.use('/auth', auth)
app.use('/users', users)

// Use errorHandler middleware
app.use(errorHandler)

export default app

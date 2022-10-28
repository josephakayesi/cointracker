import * as dotenv from 'dotenv'

// Initialize dotenv
dotenv.config()

export const ENV = process.env.NODE_ENV || 'development'
export const PORT = Number(process.env.PORT) || 5000
export const DATABASE_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cointracker'
export const BCRYPT_SECRET = process.env.BCRYPT_SECRET

// JsonWebRoken
export const JWT_SECRET = 'secret'

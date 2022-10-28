import mongoose from 'mongoose'

type ObjectId = mongoose.Types.ObjectId

export type UserJwtDecoded = {
	id?: string
	name: string
	email: string
}

export type UserDecoded = {
	id: ObjectId
	name: string
	username: string
	avatar: string
	mobile: string
	iat: number
	exp: number
}

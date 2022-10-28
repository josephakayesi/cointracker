import { modelOptions, prop, getModelForClass, pre, index, DocumentType, mongoose } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { JWT_SECRET, BCRYPT_SECRET } from '../../config/keys'
import { ObjectId } from 'mongoose'
import { NextFunction } from 'express'

export type UserBitcoinAddress = {
	addressName: string
	address: string
}

@pre<IUser>('save', async function(next: NextFunction): Promise<void> {
	if (!this.isModified('password')) {
		next()
	}

	this.password = await bcrypt.hash(this.password, BCRYPT_SECRET)

	next()
})
@modelOptions({
	schemaOptions: {
		timestamps: true,
		collection: 'users',
		id: false,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	},
})
class IUser extends Base {
	// @prop()
	// id: string

	@prop()
	public username: string

	@prop()
	public password: string

	@prop()
	public bitcoinAddresses: UserBitcoinAddress[]

	// Sign JWT and return
	public async getSignedJwtToken(this: DocumentType<IUser>): Promise<string> {
		const payload = {
			id: this._id,
			username: this.username,
		}

		return jwt.sign(payload, JWT_SECRET, { expiresIn: 24 * 60 * 1000 })
	}

	// Match user entered password to hashed password in database
	public async matchPassword(enteredPassword: string): Promise<boolean> {
		return await bcrypt.compare(enteredPassword, this.password)
	}
}

const User = getModelForClass(IUser)

export { User, IUser }

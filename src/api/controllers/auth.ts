import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { User, IUser } from '../../core/models/User'
import { FailureResponse } from '../../core/utils/responses'
import { generateLogID } from '../common'
import { sendUserTokenResponse } from '../../core/middleware/auth'
import { log, inspectBody, inspectError } from '../../core/utils/logger'

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	const logID = generateLogID()

	try {
		log('Register User', `New user attempting to register with ${inspectBody(req.body)}`, logID)

		const { username, password } = req.body

		if (!username || !password) {
			return res.status(400).json(new FailureResponse(1011, 'must provide a username and password'))
		}
		const user: IUser = await User.create(req.body)

		log('Register User', `New user with username ${req.body.username} registration succeeded.`, logID)

		return sendUserTokenResponse(user, 200, res, 1012)
	} catch (error) {
		log('Register User', `User registration failed. Error: ${inspectError(error)}`, logID)
		error.constant = 1004
		next(error)
	}
}

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	const session = await mongoose.startSession()
	session.startTransaction()

	const logID = generateLogID()

	try {
		log('Login User', `User ${req.body.username} is attempting to login with ${inspectBody(req.body)}`, logID)

		const { username, password } = req.body

		const user = await User.findOne({ username })

		const passwordMatch = await user.matchPassword(password)

		if (!passwordMatch) {
			log('Login User', `User with username: ${username} login attempt failed. Log a login failure`, logID)

			return res.status(400).json(new FailureResponse(1011))
		}

		log('Login User', `User ${req.body.mobileOrUsername} login attempt succeeded`, logID)

		return sendUserTokenResponse(user, 200, res, 1012)
	} catch (error) {
		await session.abortTransaction()

		log('Login User', `User ${req.body.mobileOrUsername} login attempt exited with error. Error: ${error}`, logID)
		error.constant = 1009
		next(error)
	} finally {
		session.endSession()
	}
}

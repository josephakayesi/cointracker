import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, ENV } from '../../config/keys'
import { ErrorResponse } from '../utils/responses'
import { User, IUser } from '../models/User'
import { UserJwtDecoded } from '../utils/types'
import { TokenResponse } from '../utils/responses'

// Protect user routes
export const protectUser = async (req: Request, res: Response, next: NextFunction): Promise<NextFunction | void> => {
	let token

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]
	}

	// Make sure token exist
	if (!token) {
		return next(new ErrorResponse('Not authorized to access this route', 401, 1020))
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, JWT_SECRET) as UserJwtDecoded

		const user = await User.findById(decoded.id)

		if (!user) return next(new ErrorResponse('Not authorized to access this route', 401, 1020))

		req.user = user

		next()
	} catch (error) {
		return next(new ErrorResponse('Not authorized to access this route', 401, 1020))
	}
}

// Get token from model, create cookie and send response
export const sendUserTokenResponse = async (user: IUser, statusCode: number, res: Response, constant: number): Promise<Response> => {
	const renewedUser = await User.findOneAndUpdate({ _id: user._id }, { new: true })

	// Create token
	const token = await renewedUser.getSignedJwtToken()

	const options = {
		expires: new Date(Date.now() + 36000 * 24 * 60 * 60 * 1000), // 30 days
		httpOnly: true,
		secure: ENV !== 'development' ? true : false,
	}

	return res
		.status(statusCode)
		.cookie('token', token, options)
		.json(new TokenResponse(constant, token))
}

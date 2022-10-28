import { Request, Response, NextFunction } from 'express'
import { ErrorResponse, FailureResponse } from '../../utils/responses'

export type ApplicationError = {
	value?: string
	code?: number
	status: number
	message: string
	name: string
	stack?: string
	errors?: object
	constant?: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
	let error = { ...err } as ApplicationError
	error.message = err.message

	// Mongoose bad ObjectId
	if (error.name === 'CastError') {
		const message = `Resource not found`
		error = new ErrorResponse(message, 404, error.constant)
	}

	// Mongoose duplicate key
	if (error.code === 11000) {
		const message = 'Duplicate field value entered'
		error = new ErrorResponse(message, 400, error.constant)
	}

	// Mongoose validation error
	if (error.name === 'ValidationError') {
		const message = Object.values(error.errors)
			.map(error => error.message)
			.join()

		error = new ErrorResponse(message, 400, error.constant)
	}

	return res.status(error.status || 500).json(new FailureResponse(error.code, error.message))
}

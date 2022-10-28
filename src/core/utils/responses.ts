import { messages } from './constants'

class ServerResponse {
	success: boolean
	code: number
	message: string

	constructor(code: number) {
		this.code = code
	}

	getMessage(): string {
		return messages[this.code]
	}
}

class FailureResponse extends ServerResponse {
	code: number
	error?: object | string | string[]

	constructor(code: number, error?: object | string | string[]) {
		super(code)

		this.success = false
		this.code = code
		this.message = this.getMessage()
		this.error = error
	}
}

class SuccessResponse extends ServerResponse {
	code: number
	total?: number | object
	count?: number
	pagination?: object
	data?: object | string | number

	constructor(code: number, data?: object | number | string) {
		super(code)

		this.success = true
		this.code = code
		this.message = this.getMessage()
		this.data = data
	}
}

class TokenResponse extends ServerResponse {
	code: number
	token: string

	constructor(code: number, token: string) {
		super(code)

		this.success = true
		this.code = code
		this.message = this.getMessage()
		this.token = token
	}
}

class ErrorResponse extends Error {
	success: boolean
	status: number
	error: string
	code: number

	constructor(message: string, status: number, constant: number) {
		super(message)
		this.success = false
		this.status = status
		this.error = message // Error message from the super class Error
		this.code = constant // Code from constants
	}
}
export { SuccessResponse, FailureResponse, ErrorResponse, TokenResponse }

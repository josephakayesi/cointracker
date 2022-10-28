import fastJSON from 'fast-json-stringify'
import maskJSON from 'mask-json'

const blacklist = ['password']
const mask = maskJSON(blacklist, { replacement: '****' })

export default mask

const stringify = fastJSON({
	title: 'Request Body',
	type: 'object',
	properties: {
		id: {
			type: 'string',
		},
		password: {
			type: 'string',
		},
		username: {
			type: 'string',
		},
	},
})

const log = (title: string, message: string, id: string): void => console.log(`${title} > ${message} -- Log ID: ${id}`)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
const inspectError = (error: any) => {
	const value = error

	return typeof value === 'string' ? value : stringify(value)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const inspectBody = (body: any) => {
	const value = body

	return typeof value === 'string' ? value : stringify(mask(value))
}

export { log, inspectError, inspectBody }

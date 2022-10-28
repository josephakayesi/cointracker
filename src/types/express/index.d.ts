/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUser, User } from '../../core/models/User'

// export {}

declare global {
	namespace Express {
		export interface Request {
			user?: IUser
		}
	}
}

// declare global {
// 	namespace Express {
// 		export interface Request {
// 			language?: Language
// 			user?: User
// 		}
// 	}
// }

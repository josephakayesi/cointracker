import { DocumentType } from '@typegoose/typegoose'
import { User, IUser } from '../models/User'

class UserRepository {
	public static async findOne(id: string): Promise<DocumentType<IUser> | null | undefined> {
		return await User.findById(id)
	}
}

export default UserRepository

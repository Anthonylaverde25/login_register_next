import { User } from '../domain/user'
import { userDTO } from '../domain/userDTO'

export interface userRepository {
    create(data: User): Promise<{ user: userDTO; message: string }>
}

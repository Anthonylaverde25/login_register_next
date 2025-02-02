import { UserType } from 'app/types'
import { User } from '../domain/user'
import { userRepository } from '../interfaces/repository'
import { UserRepositoryImpl } from '../interfaces/userRepositoryImpl'

export class UserUseCase {
    private userRepository: userRepository
    
    constructor(userRepository: userRepository = new UserRepositoryImpl()) {
        this.userRepository = userRepository
    }

    async create(data: UserType) {
        const user_to_created = new User(data)

        try {
            const { user, message } = await this.userRepository.create(
                user_to_created
            )
            return {
                user,
                message,
            }
        } catch (error) {
            throw error
        }
    }
}

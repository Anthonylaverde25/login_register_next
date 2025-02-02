import axiosInstance from 'utils/axiosConfig'
import { mapToUserDTO, userDTO } from '../domain/userDTO'
import { userRepository } from './repository'
import axios from 'axios'
import { User } from '../domain/user'

export class UserRepositoryImpl implements userRepository {
    async create(data: User): Promise<{ user: userDTO; message: string }> {
        try {
            const {
                data: { user, message },
            } = await axiosInstance.post(`users/`, data)
            
            return {
                user: mapToUserDTO(user),
                message: message,
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message_errors = error.response?.data?.errores
                throw message_errors
            } else {
                console.log(`Error inesperado: ${error}`)
                throw new Error('Error desconocido al obtener el user')
            }
        }
    }
}

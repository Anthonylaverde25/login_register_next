'use client'

import { loginUser, logoutUser } from 'app/lib/services/authServices'
import { AuthCredentials, UserType } from 'app/types'

export class AuthActions {
    static async loginServer(
        authCredentials: AuthCredentials
    ): Promise<{ user: UserType | null }> {
        const result = await loginUser(authCredentials)

        try {
            if ('auth' in result) {
                const { auth } = result
                const auth_user = auth ? auth.user : null

                return { user: auth_user }
            }
            return { user: null }
        } catch (error) {
            console.error('Error de autenticación:', error)
            return { user: null } // Retornamos null en caso de error
        }
    }

    static async logoutServer(): Promise<{ result: boolean }> {
        try {
            const { result } = await logoutUser()
            return {
                result: result,
            }
        } catch (error) {
            throw error
        }
    }
}

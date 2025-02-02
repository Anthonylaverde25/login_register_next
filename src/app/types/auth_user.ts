export type UserType = {
    id?: string | null | undefined
    email: string
    first_name: string
    last_name: string
    phone_number: string
    address?: string | null
    password?: string
}

export interface AuthUser {
    isAuthenticated: boolean
    user: UserType | null
}

export type AuthCredentials = {
    email: UserType['email']
    password: string
}

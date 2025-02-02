export interface userDTO {
    id?: string | null | undefined
    email: string
    first_name: string
    last_name: string
    number_phone: string
    password?: string
    address: string | null
}

export function mapToUserDTO(user: userDTO) {
    return {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        number_phone: user.number_phone,
        password: user.password,
        address: user.address,
    }
}

import { UserType } from 'app/types'

export class User implements UserType {
    id?: string | null | undefined
    email: string
    first_name: string
    last_name: string
    phone_number: string
    address?: string | null
    password?: string

    constructor(attr: UserType) {
        this.id = attr.id
        this.first_name = attr.first_name
        this.last_name = attr.last_name
        this.email = attr.email
        this.phone_number = attr.phone_number
        this.address = attr.address
        if (attr.password) this.password = attr.password
    }
}

'use client'

import { RootState } from '@redux/store'
import { UserType } from 'app/types'
import { useSelector } from 'react-redux'

export default function useAuthUser() {
    const { user }: { user: UserType | null } = useSelector(
        (state: RootState) => state.auth
    )
    return user
}

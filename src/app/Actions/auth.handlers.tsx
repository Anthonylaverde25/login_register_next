import { useDispatch } from 'react-redux'
import { persistor } from '@redux/store'
import { login_user, logout_user } from '@redux/auth/authSlice'
import { AuthActions } from './auth.actions'
import { AuthCredentials } from 'app/types'
//import { redirect } from 'next/navigation'

export const useAuthHandlers = () => {
    const dispatch = useDispatch()

    const onLogin = async (authCredentials: AuthCredentials) => {
        try {
            const { user } = await AuthActions.loginServer(authCredentials)
            if (user) {
                dispatch(login_user({ user }))
            }
        } catch (error) {
            console.log(error)
            // redirect('/login')
        }
    }

    const onLogout = async () => {
        try {
            const { result } = await AuthActions.logoutServer()
            if (result) {
                dispatch(logout_user())
                persistor.purge()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return { onLogin, onLogout }
}

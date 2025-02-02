import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthUser } from 'app/types'
import { succes_login } from 'app/types/global_types'

const initialState: AuthUser = {
    isAuthenticated: false,
    user: null,
}

export const auth_user_slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login_user: (
            state,
            { payload: { ...payload } }: PayloadAction<succes_login>
        ) => {
            state.isAuthenticated = true
            state.user = payload.user
        },
        // updateAccessToken: (state, action: PayloadAction<string>) => {
        //     state.accessToken = action.payload
        // },
        logout_user: (state) => {
            state.isAuthenticated = false
            state.user = null
        },
    },
})

// Action creators are generated for each case reducer function
export const { login_user, logout_user } = auth_user_slice.actions

export default auth_user_slice.reducer

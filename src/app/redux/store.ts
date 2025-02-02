import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // Usa localStorage para persistir el estado
import auth_reducer from '@redux/auth/authSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'isAuthenticated', 'user'],
}
const persist_auth_reducer = persistReducer(persistConfig, auth_reducer)

export const store = configureStore({
    reducer: {
        auth: persist_auth_reducer,
    },
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

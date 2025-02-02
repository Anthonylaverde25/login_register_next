import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { refreshAccessToken, verifyToken } from 'lib/auth'

interface AuthContextType {
    isAuthenticated: boolean
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                let accessToken = Cookies.get('accessToken')
                const refreshToken = Cookies.get('refreshToken')

                // Renovación silenciosa de token
                if (!accessToken && refreshToken) {
                    accessToken = await refreshAccessToken(refreshToken)
                    if (accessToken) {
                        Cookies.set('accessToken', accessToken, {
                            secure: true,
                            sameSite: 'strict',
                        })
                    }
                }

                const isValid = accessToken
                    ? await verifyToken(accessToken)
                    : false
                setIsAuthenticated(isValid)
            } catch (error) {
                console.error('Error de autenticación:', error)
            } finally {
                setLoading(false) // Siempre detiene la carga
            }
        }

        checkAuth()
    }, []) // ✅ `logout` ahora es estable y no causa re-renders infinitos.

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider')
    }
    return context
}

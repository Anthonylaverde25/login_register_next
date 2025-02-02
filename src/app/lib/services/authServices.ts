import Cookies from 'js-cookie'
import axios, { AxiosError } from 'axios'
import { axiosInstance } from 'utils/axiosConfig'
import { AuthCredentials, UserType } from 'app/types'
import { redirect } from 'next/navigation'

// Tipos
type AuthResponse = {
    refresh: string
    access: string
    user: UserType
}

type ErrorResponse = {
    detail: string
}

type LoginResult =
    | { auth: AuthResponse; error?: never }
    | { error: ErrorResponse; auth?: never }

// Constantes para nombres de cookies
const COOKIE_NAMES = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
} as const

// Configuración común de cookies
const COMMON_COOKIE_OPTIONS = {
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax' as const,
}

// Manejo global de errores
const handleAxiosError = (error: unknown): ErrorResponse => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ detail?: string }>
        const message =
            axiosError.response?.data?.detail ||
            axiosError.message ||
            'Error de conexión con el servidor'

        if (axiosError.response?.status === 401) {
            return { detail: 'Credenciales inválidas' }
        }

        return { detail: message }
    }

    return { detail: 'Error inesperado' }
}

// Login de usuario
export const loginUser = async (
    loginData: AuthCredentials
): Promise<LoginResult> => {
    try {
        const {
            data: { access, refresh, user },
        } = await axiosInstance.post<AuthResponse>('/token/', loginData)

        // Almacenamiento seguro de tokens
        Cookies.set(COOKIE_NAMES.ACCESS_TOKEN, access, COMMON_COOKIE_OPTIONS)
        Cookies.set(COOKIE_NAMES.REFRESH_TOKEN, refresh, COMMON_COOKIE_OPTIONS)

        return { auth: { access, refresh, user } }
    } catch (error) {
        console.error('Error en login:', error)
        return { error: handleAxiosError(error) }
    }
}

// Refrescar el token de acceso
export const refreshAccessToken = async (): Promise<LoginResult> => {
    try {
        const refreshToken = Cookies.get(COOKIE_NAMES.REFRESH_TOKEN)
        if (!refreshToken) {
            throw new Error('No hay refresh token disponible')
        }

        const { data } = await axiosInstance.post<AuthResponse>(
            '/token/refresh/',
            { refresh: refreshToken }
        )

        // Actualizar access token en cookies
        Cookies.set(
            COOKIE_NAMES.ACCESS_TOKEN,
            data.access,
            COMMON_COOKIE_OPTIONS
        )

        return { auth: data }
    } catch (error) {
        // Limpiar cookies si el refresh token es inválido
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            Cookies.remove(COOKIE_NAMES.ACCESS_TOKEN)
            Cookies.remove(COOKIE_NAMES.REFRESH_TOKEN)
        }

        return { error: handleAxiosError(error) }
    }
}

// Logout del usuario
export const logoutUser = async (): Promise<{
    result: boolean
    error?: string
}> => {
    try {
        const refreshToken = Cookies.get(COOKIE_NAMES.REFRESH_TOKEN)
        if (refreshToken) {
            const { status } = await axiosInstance.post(`/logout/`, {
                refresh: refreshToken,
            })

            // Verifica que la respuesta sea exitosa
            if (status === 200) {
                return { result: true }
            } else {
                return {
                    result: false,
                    error: 'Error inesperado al cerrar sesión',
                }
            }
        }
    } catch (error) {
        console.error('Error durante el logout:', error)

        return {
            result: false,
            error: axios.isAxiosError(error)
                ? error.message
                : 'Error desconocido',
        }
    } finally {
        // Limpieza de cookies
        Object.values(COOKIE_NAMES).forEach((name) => {
            Cookies.remove(name, {
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Lax',
            })
        })

        // Redirección segura
        if (typeof window !== 'undefined') {
            window.location.href = '/login'
        } else {
            try {
                redirect('/login')
            } catch (error) {
                console.error('Error al redirigir:', error)
            }
        }
    }

    // Si no entró en ninguno de los retornos previos, devuelve un resultado fallido
    return { result: false, error: 'No se pudo cerrar sesión correctamente' }
}

// Obtener un nuevo token de acceso
export const fetchNewAccessToken = async (
    refreshToken: string
): Promise<LoginResult> => {
    try {
        const { data } = await axiosInstance.post<AuthResponse>('/refresh/', {
            refresh: refreshToken,
        })
        return { auth: data }
    } catch (error) {
        return { error: handleAxiosError(error) }
    }
}

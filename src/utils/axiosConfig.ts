import { fetchNewAccessToken } from 'app/lib/services/authServices'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'sonner'

export const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: { 'Content-Type': 'application/json' },
})

// Interceptor de solicitudes: añade el token de acceso
axiosInstance.interceptors.request.use(
    (config) => {
        const access_token = Cookies.get('accessToken')
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`
            console.log('AccessToken desde cookies (Request):', access_token) // Imprimir acceso token
        }

        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response, // Responde correctamente si todo está bien
    async (error) => {
        const originalRequest = error.config

        // Si la respuesta es 401 (expiración del token) y no hemos reintentado
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const errorMessage = error.response.data.detail
                toast(errorMessage)
                // Obtener el refreshToken desde la cookie
                const refreshToken = Cookies.get('refreshToken')

                if (!refreshToken) {
                    throw new Error('No refresh token available')
                }

                // Intenta obtener un nuevo accessToken con el refreshToken
                const newTokens = await fetchNewAccessToken(refreshToken)

                // Guarda el nuevo accessToken en la cookie
                Cookies.set('accessToken', newTokens.access, {
                    expires: 7,
                    secure: true,
                    sameSite: 'Strict',
                })
                Cookies.set('refreshToken', newTokens.refresh, {
                    expires: 7,
                    secure: true,
                    sameSite: 'Strict',
                }) // Si también recibes un nuevo refreshToken

                // Reintenta la solicitud original con el nuevo accessToken
                originalRequest.headers.Authorization = `Bearer ${newTokens.access}`
                return axiosInstance(originalRequest)
            } catch (error) {
                //logoutUser() // Si falla la obtención del nuevo token, desconecta al usuario
                return Promise.reject(error)
            }
        }

        // Si no es una expiración de token, solo rechaza el error
        return Promise.reject(error)
    }
)

export default axiosInstance

export const Paths = {
    HOME: '/',
    PROFILE: '/profile',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
} as const

export const ProtectedRoutes = [Paths.HOME, Paths.PROFILE, Paths.DASHBOARD]
export const PublicRoutes = [Paths.LOGIN, Paths.REGISTER]

export const verifyToken = async (token: string): Promise<boolean> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}verify-token/`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )
        return response?.ok && (await response.json()).valid
    } catch (error) {
        console.error('Error verifying token:', error)
        return false
    }
}

export const refreshAccessToken = async (
    refreshToken: string
): Promise<string | null> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}token/refresh/`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: refreshToken }),
            }
        )
        if (!response.ok) return null
        const data = await response.json()
        return data.access
    } catch (error) {
        console.error('Error refreshing token:', error)
        return null
    }
}

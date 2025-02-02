import { NextRequest, NextResponse } from 'next/server'
import {
    ProtectedRoutes,
    PublicRoutes,
    Paths,
    refreshAccessToken,
    verifyToken,
} from './lib/auth'

export async function middleware(request: NextRequest) {
    const { value: accessToken } = request.cookies.get('accessToken') || {}
    const { value: refreshToken } = request.cookies.get('refreshToken') || {}
    const path = request.nextUrl.pathname

    let newAccessToken: string | null = null
    const response = NextResponse.next()

    // Intentar renovar token si es necesario
    if (!accessToken && refreshToken) {
        newAccessToken = await refreshAccessToken(refreshToken)
        if (newAccessToken) {
            response.cookies.set('accessToken', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 900,
            })
        }
    }

    // Verificar autenticación
    const currentToken = newAccessToken || accessToken
    const isAuthenticated = currentToken
        ? await verifyToken(currentToken)
        : false

    // Redirecciones basadas en autenticación
    if (isAuthenticated) {
        if (PublicRoutes.includes(path)) {
            return NextResponse.redirect(new URL(Paths.HOME, request.url))
        }
    } else {
        if (ProtectedRoutes.includes(path)) {
            return NextResponse.redirect(new URL(Paths.LOGIN, request.url))
        }
    }

    return response
}

export const config = {
    matcher: [...ProtectedRoutes, ...PublicRoutes],
}

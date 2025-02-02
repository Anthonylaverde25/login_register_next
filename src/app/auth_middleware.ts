// import { NextRequest, NextResponse } from 'next/server'

// export async function auth_middleware(request: NextRequest) {
//     const accessToken = request.cookies.get('accessToken')?.value
//     const refreshToken = request.cookies.get('refreshToken')?.value
//     const path = request.nextUrl.pathname

//     // Configuración de rutas
//     const protectedRoutes = ['/', '/profile']
//     const publicRoutes = ['/login', '/register']

//     // Función para verificar el token de acceso
//     const verifyToken = async (token: string): Promise<boolean> => {
//         try {
//             const response = await fetch(
//                 'http://localhost:8000/api/verify-token/',
//                 {
//                     method: 'POST',
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             )

//             if (!response.ok) return false
//             const data = await response.json()
//             return data.valid
//         } catch (error) {
//             console.error('Error verifying token:', error)
//             return false
//         }
//     }

//     // Función para renovar el token de acceso
//     const refreshAccessToken = async (
//         refreshToken: string
//     ): Promise<string | null> => {
//         try {
//             const response = await fetch(
//                 'http://localhost:8000/api/token/refresh/',
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ refresh: refreshToken }),
//                 }
//             )

//             if (!response.ok) return null
//             const data = await response.json()
//             return data.access || null
//         } catch (error) {
//             console.error('Error refreshing token:', error)
//             return null
//         }
//     }

//     // Intento de renovación de token si existe refreshToken
//     let newAccessToken: string | null = null
//     if (!accessToken && refreshToken) {
//         newAccessToken = await refreshAccessToken(refreshToken)
//     }

//     // Crear respuesta base
//     const response = NextResponse.next()

//     // Actualizar cookie si se obtuvo nuevo token
//     if (newAccessToken) {
//         response.cookies.set('accessToken', newAccessToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: 'strict',
//             path: '/',
//             maxAge: 900, // 15 minutos
//         })
//     }

//     // Determinar estado de autenticación
//     const isAuthenticated = !!(
//         (accessToken && (await verifyToken(accessToken))) ||
//         (newAccessToken && (await verifyToken(newAccessToken)))
//     )

//     // Redirecciones basadas en autenticación
//     if (isAuthenticated) {
//         if (publicRoutes.includes(path)) {
//             return NextResponse.redirect(new URL('/', request.url))
//         }
//     } else {
//         if (protectedRoutes.includes(path)) {
//             return NextResponse.redirect(new URL('/login', request.url))
//         }
//     }

//     return response
// }

// import { NextRequest, NextResponse } from 'next/server'

// export async function middleware(request: NextRequest) {
//     const accessToken = request.cookies.get('accessToken')?.value
//     const refreshToken = request.cookies.get('refreshToken')?.value
//     const path = request.nextUrl.pathname

//     // Configuración de rutas
//     const protectedRoutes = ['/', '/profile']
//     const publicRoutes = ['/login', '/register']

//     // Función para verificar el token de acceso
//     const verifyToken = async (token: string): Promise<boolean> => {
//         try {
//             const response = await fetch(
//                 'http://localhost:8000/api/verify-token/',
//                 {
//                     method: 'POST',
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             )

//             if (!response.ok) return false
//             const data = await response.json()
//             return data.valid
//         } catch (error) {
//             console.error('Error verifying token:', error)
//             return false
//         }
//     }

//     // Función para renovar el token de acceso
//     const refreshAccessToken = async (
//         refreshToken: string
//     ): Promise<string | null> => {
//         try {
//             const response = await fetch(
//                 'http://localhost:8000/api/token/refresh/',
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ refresh: refreshToken }),
//                 }
//             )

//             if (!response.ok) return null
//             const data = await response.json()
//             return data.access || null
//         } catch (error) {
//             console.error('Error refreshing token:', error)
//             return null
//         }
//     }

//     // Intento de renovación de token si existe refreshToken
//     let newAccessToken: string | null = null
//     if (!accessToken && refreshToken) {
//         newAccessToken = await refreshAccessToken(refreshToken)
//     }

//     // Crear respuesta base
//     const response = NextResponse.next()

//     // Actualizar cookie si se obtuvo nuevo token
//     if (newAccessToken) {
//         response.cookies.set('accessToken', newAccessToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: 'strict',
//             path: '/',
//             maxAge: 900, // 15 minutos
//         })
//     }

//     // Determinar estado de autenticación
//     const isAuthenticated = !!(
//         (accessToken && (await verifyToken(accessToken))) ||
//         (newAccessToken && (await verifyToken(newAccessToken)))
//     )

//     // Redirecciones basadas en autenticación
//     if (isAuthenticated) {
//         if (publicRoutes.includes(path)) {
//             return NextResponse.redirect(new URL('/', request.url))
//         }
//     } else {
//         if (protectedRoutes.includes(path)) {
//             return NextResponse.redirect(new URL('/login', request.url))
//         }
//     }

//     return response
// }

// // ✅ Aplicar middleware solo a rutas específicas
// export const config = {
//     matcher: ['/', '/profile', '/login', '/register'],
// }

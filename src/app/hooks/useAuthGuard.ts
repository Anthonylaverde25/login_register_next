import { useAuth } from 'context/AuthContext'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useAuthGuard() {
    const { isAuthenticated, loading } = useAuth()
    const pathname = usePathname()
    const router = useRouter()
    const [isRedirecting, setIsRedirecting] = useState(false)

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                setIsRedirecting(true)
                router.replace('/login')
                setIsRedirecting(false)
            }
        }
    }, [isAuthenticated, loading, router, pathname])

    return { loading: loading || isRedirecting, isAuthenticated }
}

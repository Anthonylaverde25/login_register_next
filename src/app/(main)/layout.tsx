'use client'
import { Header } from '@/components/Header'
import useAuthUser from 'app/hooks/useAuthUser'

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const auth_user = useAuthUser()
    return (
        <div className="border bg-slate-500">
            <Header {...auth_user} />
            {children}
        </div>
    )
}

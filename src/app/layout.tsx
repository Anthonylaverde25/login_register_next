'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Provider } from 'react-redux'
import { persistor, store } from '@redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'
import { AuthProvider } from 'context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from '@/components/Header'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

const queryClient = new QueryClient()

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <QueryClientProvider client={queryClient}>
                    {' '}
                    <Provider store={store}>
                        <AuthProvider>
                            <PersistGate persistor={persistor}>
                                {children}
                                <Toaster expand={true} richColors />
                            </PersistGate>
                        </AuthProvider>
                    </Provider>
                </QueryClientProvider>
            </body>
        </html>
    )
}

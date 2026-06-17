"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function RootLayoutClient({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [isAdminRoute, setIsAdminRoute] = useState(false)

    useEffect(() => {
        setIsAdminRoute(pathname?.includes("/admin") || false)
        setIsAdminRoute(pathname?.includes("/login") || false)
        setIsAdminRoute(pathname?.includes("/dashboard") || false)
    }, [pathname])

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            {!isAdminRoute && <Footer />}
        </div>
    )
}

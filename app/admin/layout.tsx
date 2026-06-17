"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    Users,
    BookOpen,
    Menu,
    X,
    LogOut,
    ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const userStr = localStorage.getItem("user")
        if (userStr) {
            try {
                const parsedUser = JSON.parse(userStr)
                setUser(parsedUser)
            } catch (error) {
                console.error("Error parsing user:", error)
            }
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem("moodle_token")
        router.push("/login")
    }

    const navigation = [
        {
            name: "Staff Management",
            href: "/admin/staff",
            icon: Users,
        },
        {
            name: "Course Management",
            href: "/admin/courses",
            icon: BookOpen,
        },
    ]

    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href)
    }

    const getUserInitials = () => {
        if (!user) return "A"
        if (user.first_name && user.last_name) {
            return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
        }
        return user.email?.[0]?.toUpperCase() || "A"
    }

    const getUserDisplayName = () => {
        if (!user) return "Admin"
        if (user.first_name && user.last_name) {
            return `${user.first_name} ${user.last_name}`
        }
        return user.email?.split('@')[0] || "Admin"
    }

    return (
        <>
            {/* Desktop Sidebar - Fixed positioning */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex flex-col flex-1 border-r h-full pt-16">
                    <div className="flex items-center h-16 px-6 border-b">
                        <Link href="/admin/staff" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">A</span>
                            </div>
                            <span className="font-bold text-lg">Admin</span>
                        </Link>
                    </div>

                    <div className="flex-1 flex flex-col overflow-y-auto">
                        <nav className="flex-1 px-4 py-4 space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`
                                            flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors
                                            ${isActive(item.href)
                                                ? "bg-primary text-primary-foreground"
                                                : "text-gray-700 hover:bg-gray-100"
                                            }
                                        `}
                                    >
                                        <Icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main Content - Pushed right to account for sidebar */}
            <div className="lg:pl-64">
                <div className="min-h-screen">
                    {children}
                </div>
            </div>
        </>
    )
}

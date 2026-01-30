"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LogOut, Menu, User } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { Skeleton } from "@/components/ui/skeleton"

const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Training Programs", href: "/programs" },
]

export default function Header() {
    const isMobile = useMobile()
    const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true)
    const menuRef = useRef<HTMLDivElement>(null);

    // Load token/user safely on client
    useEffect(() => {
        const t = localStorage.getItem("access");
        const u = localStorage.getItem("user");

        setToken(t)
        setUser(u ? JSON.parse(u) : null)
        setLoading(false) // finished loading
    }, []);

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("access");
        localStorage.removeItem("user");
        window.location.href = "/";
    }

    return (
        <header
            ref={menuRef}
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href={token ? "/dashboard" : "/"} className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full flex items-center justify-center">
                        <Image
                            src="/adita-logo.png"
                            alt="ADITA Logo"
                            width={40}
                            height={40}
                            className="object-contain rounded-full"
                            priority
                        />
                    </div>
                    <span className="hidden font-bold text-base sm:inline-block">Africa Digital & Innovation Technology Academy</span>
                </Link>

                {/* Navigation or loading */}
                {loading ? (
                    <Skeleton className="h-10 w-40" />
                ) : !token ? (
                    isMobile ? (
                        <Sheet open={isOpen} onOpenChange={setIsOpen} >
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <nav className="flex flex-col gap-4 mt-8">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-lg font-medium transition-colors hover:text-primary"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    ) : (
                        <nav className="hidden ml-auto items-center md:flex md:gap-6 lg:gap-10">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium transition-colors hover:text-secondary"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/login">Log in</Link>
                            </Button>
                        </nav>
                    )
                ) : (
                    <div className="relative ml-auto w-fit">
                        {/* User Icon / Button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center hover:bg-accent gap-2 px-3 py-2 rounded-md transition mr-8"
                        >
                            {loading ? <Skeleton className="h-4 w-24" /> : <p>{user?.email}</p>}
                            <User className="h-5 w-5" />
                        </button>

                        {/* Dropdown */}
                        {open && (
                            <div className="absolute bg-background right-0 mt-2 w-40 rounded-md shadow-lg border animate-fadeIn">
                                <ul className="text-sm">
                                    <li>
                                        <button
                                            onClick={onLogout}
                                            className="flex hover:bg-accent w-full items-center gap-2 px-4 py-2"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}

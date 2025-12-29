"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

const navigation = [
  { name: "Home", href: "/" },
  // { name: "Programs", href: "/programs" },
  // { name: "Courses", href: "/courses" },
  // { name: "Certifications", href: "/certifications" },
  // { name: "Incubator", href: "/incubator" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Traning Programs", href: "/programs" },
]

export default function Header() {
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3">
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
            <span className="hidden font-bold text-base sm:inline-block">African Digital & Innovation Technology Academy</span>
          </Link>
        </div>

        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                {/* <div className="mt-4 flex flex-col gap-2">
                  <Button asChild>
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/register">Register</Link>
                  </Button>
                </div> */}
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="hidden md:flex md:gap-6 lg:gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}

        {/* <div className="flex items-center gap-2">
          <div className="hidden md:flex md:gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/register">Register</Link>
            </Button>
          </div>
          <ModeToggle />
        </div> */}
      </div>
    </header>
  )
}

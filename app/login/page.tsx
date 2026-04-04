"use client"

import type React from "react"

import axios from "axios"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { login } from "@/services/authService"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    // Form state
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await login(email, password);
            console.log("Login response:", res.user)
            // Redirect after successful login
            if (res.status === null)
                return

            if (res.user.is_staff) {
                if (res.user.role === "finance")
                    window.location.href = "/finance/approvals/"
                else if (res.user.role === "manager")
                    window.location.href = "/management/approvals/"
                console.log("staff:", res.user.role)
            }
            else if (res.user.is_student) {
                window.location.href = "/student/dashboard"
                console.log("student:", res.user.is_student)
            }
            else if (res.user.is_instructor) {
                window.location.href = "/instructor/dashboard"
                console.log("instructor:", res.user.is_instructor)
            }
            else
                console.log("Login response:", res.user)
        } catch (error) {
            console.error("Login error:", error)
            setIsLoading(false)
        }
    }

    return (
        <div className="container flex h-screen items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                    <p className="text-sm text-muted-foreground">Sign in to your account to continue learning</p>
                </div>

                <Tabs defaultValue="email" className="w-full">
                    {/*<TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="email">Username</TabsTrigger>
                        <TabsTrigger value="phone">Phone</TabsTrigger>
                    </TabsList>*/}

                    <TabsContent value="email">
                        <Card>
                            <form onSubmit={handleSubmit}>
                                <CardHeader>
                                    <CardTitle>User Login</CardTitle>
                                    <CardDescription>Enter your User name and password to sign in</CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Email</Label>
                                        <Input
                                            id="username"
                                            placeholder="username"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Password</Label>
                                            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                                                Forgot password?
                                            </Link>
                                        </div>

                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </CardContent>

                                <CardFooter className="flex flex-col space-y-4">
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? "Signing in..." : "Sign in"}
                                    </Button>

                                    <div className="text-center text-sm">
                                        Don't have an account?{" "}
                                        <Link href="/register" className="text-primary hover:underline">
                                            Sign up
                                        </Link>
                                    </div>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>

                    <TabsContent value="phone">
                        <Card>
                            <form onSubmit={handleSubmit}>
                                <CardHeader>
                                    <CardTitle>Phone Login</CardTitle>
                                    <CardDescription>Enter your phone number to receive a verification code</CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" type="tel" placeholder="+123 456 7890" required />
                                    </div>
                                </CardContent>

                                <CardFooter className="flex flex-col space-y-4">
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? "Sending code..." : "Send verification code"}
                                    </Button>

                                    <div className="text-center text-sm">
                                        Don't have an account?{" "}
                                        <Link href="/register" className="text-primary hover:underline">
                                            Sign up
                                        </Link>
                                    </div>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

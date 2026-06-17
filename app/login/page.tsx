"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { login } from "@/services/authService"

// Simple Alert components if you don't have them
function Alert({ children, variant, className }) {
    const baseStyles = "rounded-lg border p-4"
    const variantStyles = variant === "destructive"
        ? "border-red-500 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300"
        : "border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300"

    return (
        <div className={`${baseStyles} ${variantStyles} ${className}`}>
            {children}
        </div>
    )
}

function AlertDescription({ children }) {
    return <div className="text-sm">{children}</div>
}

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    // Form state
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccessMessage("")

        // Basic validation
        if (!email.trim()) {
            setError("Please enter your email address")
            setIsLoading(false)
            return
        }

        if (!password) {
            setError("Please enter your password")
            setIsLoading(false)
            return
        }

        try {
            setSuccessMessage("Authenticating...")
            const response = await login(email, password);

            console.log("Login response:", response)

            // Check if the response is a Response object (error case)
            // The login function returns the fetch Response object when !res.ok
            if (response && typeof response === 'object' && response.status && !response.ok) {
                // This is an error response from the server
                const errorData = await response.json()
                console.log("Error data:", errorData)

                // Handle array response like ["Invalid Credentials"]
                if (Array.isArray(errorData) && errorData.length > 0) {
                    setError(errorData[0])
                }
                // Handle string response
                else if (typeof errorData === 'string') {
                    setError(errorData)
                }
                // Handle object with error or message
                else if (errorData && typeof errorData === 'object') {
                    if (errorData.error) setError(errorData.error)
                    else if (errorData.message) setError(errorData.message)
                    else setError("Login failed. Please try again.")
                }
                else {
                    setError("Login failed. Please try again.")
                }

                setIsLoading(false)
                setSuccessMessage("")
                return
            }

            // Check if the response has the user object (successful login)
            if (!response || !response.user) {
                setError("Login failed. Please try again.")
                setIsLoading(false)
                setSuccessMessage("")
                return
            }

            // Successful login
            setSuccessMessage("Login successful! Redirecting...")

            // Small delay to show success message
            setTimeout(() => {
                // Redirect based on user role
                if (response.user.is_instructor) {
                    window.location.href = "/instructor/dashboard"
                }
                else if (response.user.is_staff) {
                    if (response.user.role === "finance") {
                        window.location.href = "/finance/approvals/"
                    } else if (response.user.role === "manager") {
                        window.location.href = "/management/approvals/"
                    } else {
                        window.location.href = "/admin/"
                    }
                }
                else if (response.user.is_student) {
                    window.location.href = "/student/dashboard"
                }
                else {
                    // Default redirect for other roles
                    window.location.href = "/dashboard/"
                }
            }, 1000)

        } catch (error: any) {
            console.error("Login error:", error)

            // Handle network errors or unexpected errors
            if (error.message === "Failed to fetch") {
                setError("Unable to connect to the server. Please check your internet connection.")
            } else {
                setError(error.message || "An unexpected error occurred. Please try again.")
            }

            setIsLoading(false)
            setSuccessMessage("")
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
                    <TabsContent value="email">
                        <Card>
                            <form onSubmit={handleSubmit}>
                                <CardHeader>
                                    <CardTitle>User Login</CardTitle>
                                    <CardDescription>Enter your email and password to sign in</CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Error Alert */}
                                    {error && (
                                        <Alert variant="destructive" className="mb-4">
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}

                                    {/* Success Alert */}
                                    {successMessage && !error && (
                                        <Alert className="mb-4">
                                            <AlertDescription>{successMessage}</AlertDescription>
                                        </Alert>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="username">Email</Label>
                                        <Input
                                            id="username"
                                            type="email"
                                            placeholder="you@example.com"
                                            required
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                setError("") // Clear error when user starts typing
                                            }}
                                            disabled={isLoading}
                                            className={error ? "border-red-500" : ""}
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
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                                setError("") // Clear error when user starts typing
                                            }}
                                            disabled={isLoading}
                                            className={error ? "border-red-500" : ""}
                                        />
                                    </div>
                                </CardContent>

                                <CardFooter className="flex flex-col space-y-4">
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                                <span>Signing in...</span>
                                            </div>
                                        ) : (
                                            "Sign in"
                                        )}
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

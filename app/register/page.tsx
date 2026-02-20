"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card, CardContent, CardDescription,
    CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { signupUser } from "@/services/authService"

const USERNAME_REGEX = /^[a-z0-9._]{3,100}$/
const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const [form, setForm] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        confirmPassword: "",
        country: "",
        professional_background: "",
        terms: false,
    })

    const handleChange = (key: string, value: any) => {
        setForm({ ...form, [key]: value })
    }

    const validate = () => {
        if (!USERNAME_REGEX.test(form.username)) {
            return "Username must be lowercase, 3–100 chars, letters/numbers/dot/underscore only."
        }

        if (!PASSWORD_REGEX.test(form.password)) {
            return "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
        }

        if (form.password !== form.confirmPassword) {
            return "Passwords do not match."
        }

        if (!form.terms) {
            return "You must accept the terms."
        }

        return ""
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        const validationError = validate()
        if (validationError) {
            setError(validationError)
            return
        }

        setIsLoading(true)

        try {
            const res = await signupUser({
                username: form.username,
                first_name: form.first_name,
                last_name: form.last_name,
                email: form.email,
                phone_number: form.phone_number,
                password: form.password,
                country: form.country,
                professional_background: form.professional_background,
            })

            console.log(res);
            console.log(res.status);
            if (res.status == 201) {
                window.location.href = "/dashboard"
            }
        } catch (err: any) {
            setError("Registration failed. Email or username may already exist.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container py-12">
            <div className="mx-auto max-w-md space-y-6">
                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Create an Account</CardTitle>
                            <CardDescription>Register to access ADITA</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">

                            {error && (
                                <p className="text-sm text-red-500">{error}</p>
                            )}

                            <div className="space-y-2">
                                <Label>Username</Label>
                                <Input
                                    value={form.username}
                                    onChange={(e) => handleChange("username", e.target.value)}
                                    placeholder="john_doe"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>First Name</Label>
                                    <Input
                                        value={form.first_name}
                                        onChange={(e) => handleChange("first_name", e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label>Last Name</Label>
                                    <Input
                                        value={form.last_name}
                                        onChange={(e) => handleChange("last_name", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <Label>Phone</Label>
                                <Input
                                    value={form.phone_number}
                                    onChange={(e) => handleChange("phone_number", e.target.value)}
                                />
                            </div>

                            <div>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <Label>Confirm Password</Label>
                                <Input
                                    type="password"
                                    value={form.confirmPassword}
                                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Select
                                    onValueChange={(v) => handleChange("country", v)}
                                >
                                    <SelectTrigger id="country">
                                        <SelectValue placeholder="Select your country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ghana">Ghana</SelectItem>
                                        <SelectItem value="kenya">Kenya</SelectItem>
                                        <SelectItem value="nigeria">Nigeria</SelectItem>
                                        <SelectItem value="south-africa">South Africa</SelectItem>
                                        <SelectItem value="ethiopia">Ethiopia</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="background">Professional Background</Label>
                                <Select
                                    onValueChange={(v) => handleChange("professional_background", v)}
                                >
                                    <SelectTrigger id="background">
                                        <SelectValue placeholder="Select your background" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="student">Student</SelectItem>
                                        <SelectItem value="educator">Educator</SelectItem>
                                        <SelectItem value="healthcare">Healthcare Professional</SelectItem>
                                        <SelectItem value="finance">Finance/Banking</SelectItem>
                                        <SelectItem value="it">IT Professional</SelectItem>
                                        <SelectItem value="government">Government</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms"
                                    checked={form.terms}
                                    onCheckedChange={(checked) => handleChange("terms", checked === true)}
                                    required />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    I agree to the{" "}
                                    <Link href="/terms" className="text-primary hover:underline">
                                        terms of service
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-primary hover:underline">
                                        privacy policy
                                    </Link>
                                </label>
                            </div>

                        </CardContent>

                        <CardFooter>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Creating..." : "Create account"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}

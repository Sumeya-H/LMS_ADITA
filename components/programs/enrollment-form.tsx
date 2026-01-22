"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

/* -------------------- Phone Validation Helper -------------------- */
const validateEthiopianPhone = (phone) => {
    const cleaned = phone.replace(/\s+/g, "")

    const regex = /^(?:\+251|0)(9|7)\d{8}$/

    if (!regex.test(cleaned)) {
        return { valid: false, value: phone }
    }

    if (cleaned.startsWith("09")) {
        return { valid: true, value: "+2519" + cleaned.slice(2) }
    }

    if (cleaned.startsWith("07")) {
        return { valid: true, value: "+2517" + cleaned.slice(2) }
    }

    return { valid: true, value: cleaned }
}

export default function EnrollmentForm({ onSubmit, program }) {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        background: "",
        experience: "",
        goals: "",
        referral: "",
        agreed_terms: false,
    })

    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const fieldRefs = {
        email: emailRef,
        phone: phoneRef,
    }

    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const firstErrorField = Object.keys(errors)[0]
        const ref = fieldRefs[firstErrorField]

        if (ref?.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "center" })
            ref.current.focus()
        }
    }, [errors])


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setFormError("")
        setErrors({})

        const phoneValidation = validateEthiopianPhone(formData.phone)

        if (!phoneValidation.valid) {
            setErrors({
                phone:
                    "Invalid Ethiopian phone number. Use +2519XXXXXXXX, +2517XXXXXXXX, 09XXXXXXXX, or 07XXXXXXXX.",
            })
            return
        }

        try {
            await onSubmit({
                ...formData,
                phone: phoneValidation.value,
            })
        } catch (err) {
            const response = err?.response?.data || err;

            const fieldErrors = {}

            console.log("response", response);
            if (response?.email) {
                fieldErrors.email = response.email.message
            }

            if (response?.phone) {
                fieldErrors.phone = response.phone.message
            }

            if (Object.keys(fieldErrors).length > 0) {
                setErrors(fieldErrors)
            } else {
                setFormError("Something went wrong. Please try again.")
            }
        } finally {
            setIsSubmitting(false)
            console.log(errors);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* -------------------- Personal Information -------------------- */}
            <div>
                <h3 className="text-lg font-medium">Personal Information</h3>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            ref={emailRef}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            ref={phoneRef}
                            placeholder="+2519XXXXXXXX or 09XXXXXXXX"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        {errors.phone && (
                            <p className="text-sm text-red-500">{errors.phone}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select
                            value={formData.country}
                            onValueChange={(value) =>
                                handleSelectChange("country", value)
                            }
                        >
                            <SelectTrigger id="country">
                                <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ethiopia">Ethiopia</SelectItem>
                                <SelectItem value="ghana">Ghana</SelectItem>
                                <SelectItem value="kenya">Kenya</SelectItem>
                                <SelectItem value="nigeria">Nigeria</SelectItem>
                                <SelectItem value="south-africa">South Africa</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* -------------------- Professional Background -------------------- */}
            <div>
                <h3 className="text-lg font-medium">Professional Background</h3>

                <div className="mt-4 grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="background">Professional Background</Label>
                        <Select
                            value={formData.background}
                            onValueChange={(value) =>
                                handleSelectChange("background", value)
                            }
                        >
                            <SelectTrigger id="background">
                                <SelectValue placeholder="Select your background" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="engineer">Engineer</SelectItem>
                                <SelectItem value="educator">Educator</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="finance">Finance/Banking</SelectItem>
                                <SelectItem value="it">IT Professional</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="experience">Experience with AI/ML</Label>
                        <Select
                            value={formData.experience}
                            onValueChange={(value) =>
                                handleSelectChange("experience", value)
                            }
                        >
                            <SelectTrigger id="experience">
                                <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">No experience</SelectItem>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* -------------------- Goals & Referral -------------------- */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="goals">Learning Goals</Label>
                    <Textarea
                        id="goals"
                        name="goals"
                        rows={3}
                        value={formData.goals}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="referral">How did you hear about us?</Label>
                    <Select
                        value={formData.referral}
                        onValueChange={(value) =>
                            handleSelectChange("referral", value)
                        }
                    >
                        <SelectTrigger id="referral">
                            <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="social-media">Social Media</SelectItem>
                            <SelectItem value="friend">Friend</SelectItem>
                            <SelectItem value="search">Search Engine</SelectItem>
                            <SelectItem value="event">Event</SelectItem>
                            <SelectItem value="advertisement">Advertisement</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* -------------------- Terms -------------------- */}
            <div className="flex items-start space-x-2">
                <Checkbox
                    id="agreed_terms"
                    checked={formData.agreed_terms}
                    onCheckedChange={(checked) =>
                        handleSelectChange("agreed_terms", checked)
                    }
                    required
                />
                <Label htmlFor="agreed_terms" className="text-sm">
                    I agree to the terms and conditions.{" "}
                    <Link href="/terms-and-conditions" className="text-primary underline">
                        Terms and Conditions
                    </Link>
                </Label>
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !formData.agreed_terms}>
                {isSubmitting ? "Submitting..." : "Continue"}
            </Button>
        </form>
    )
}

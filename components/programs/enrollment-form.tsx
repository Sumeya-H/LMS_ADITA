"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function EnrollmentForm({ onSubmit, program }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        background: "",
        experience: "",
        startDate: "",
        format: "",
        goals: "",
        referral: "",
        agreeTerms: false,
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
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
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium">Professional Background</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="background">Professional Background</Label>
                        <Select value={formData.background} onValueChange={(value) => handleSelectChange("background", value)}>
                            <SelectTrigger id="background">
                                <SelectValue placeholder="Select your background" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="engineer">Engineer</SelectItem>
                                <SelectItem value="educator">Educator</SelectItem>
                                <SelectItem value="healthcare">Healthcare Professional</SelectItem>
                                <SelectItem value="finance">Finance/Banking</SelectItem>
                                <SelectItem value="it">IT Professional</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="experience">Experience with AI/ML</Label>
                        <Select value={formData.experience} onValueChange={(value) => handleSelectChange("experience", value)}>
                            <SelectTrigger id="experience">
                                <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">No experience</SelectItem>
                                <SelectItem value="beginner">Beginner (some exposure)</SelectItem>
                                <SelectItem value="intermediate">Intermediate (worked on projects)</SelectItem>
                                <SelectItem value="advanced">Advanced (professional experience)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium">Program Preferences</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="startDate">Preferred Start Date</Label>
                        <Select
                            value={formData.startDate}
                            onValueChange={(value) => handleSelectChange("startDate", value)}
                            required
                        >
                            <SelectTrigger id="startDate">
                                <SelectValue placeholder="Select a start date" />
                            </SelectTrigger>
                            <SelectContent>
                                {program.startDates.map((date) => (
                                    <SelectItem key={date} value={date}>
                                        {date}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <Label>Preferred Format</Label>
                        <RadioGroup
                            value={formData.format}
                            onValueChange={(value) => handleSelectChange("format", value)}
                            className="mt-2"
                            required
                        >
                            {program.format.includes("Online") && (
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="online" id="format-online" />
                                    <Label htmlFor="format-online">Online</Label>
                                </div>
                            )}
                            {program.format.includes("In-person") && (
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="in-person" id="format-in-person" />
                                    <Label htmlFor="format-in-person">In-person</Label>
                                </div>
                            )}
                            {program.format.includes("Blended") && (
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="blended" id="format-blended" />
                                    <Label htmlFor="format-blended">Blended (Online & In-person)</Label>
                                </div>
                            )}
                        </RadioGroup>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="goals">Learning Goals</Label>
                        <Textarea
                            id="goals"
                            name="goals"
                            placeholder="What do you hope to achieve through this program?"
                            value={formData.goals}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="referral">How did you hear about us?</Label>
                        <Select value={formData.referral} onValueChange={(value) => handleSelectChange("referral", value)}>
                            <SelectTrigger id="referral">
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="social-media">Social Media</SelectItem>
                                <SelectItem value="friend">Friend or Colleague</SelectItem>
                                <SelectItem value="search">Search Engine</SelectItem>
                                <SelectItem value="event">Event or Conference</SelectItem>
                                <SelectItem value="advertisement">Advertisement</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-start space-x-2">
                    <Checkbox
                        id="agreeTerms"
                        name="agreeTerms"
                        className="my-auto"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => handleSelectChange("agreeTerms", checked)}
                        required
                    />
                    <Label htmlFor="agreeTerms" className="text-sm">
                        I agree to the terms and conditions, including the privacy policy and student code of conduct.
                        &nbsp;
                        <Link href="/" className="text-primary hover:underline">
                            <strong>Terms and Conditions</strong>
                        </Link>
                    </Label>
                </div>
            </div>

            {formData.agreeTerms ?
                <Button type="submit" className="w-full">
                    Continue
                </Button> :
                <Button disabled type="submit" className="w-full">
                    Continue
                </Button>
            }
        </form>
    )
}

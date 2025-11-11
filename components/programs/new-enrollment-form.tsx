"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function EnrollmentForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        event: "7f9e54a8-5be1-4de3-9e28-9db71e687f23",
        full_name: "",
        email: "",
        phone: "",
        city: "",
        sub_city: "",
        university: "",
        graduation_year: "",
        field_of_study: "",
        selected_course: "none", // "marketing" | "ai"
        // course-specific
        marketing_experience: "",
        programming_experience: "none", // none | basic | intermediate | advanced
        data_tools: "none", // none | excel | python | r | powerbi
        math_background: "none", // none | basic | intermediate | advanced
        familiarity: { ml: "1", visualization: "1", sql: "1" }, // 1-5
        // common
        motivation: "",
        referral: "",
        agreeTerms: false,
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFamiliarityChange = (skill, value) => {
        setFormData((prev) => ({
            ...prev,
            familiarity: { ...prev.familiarity, [skill]: value },
        }))
    }

    // Simple eligibility check for AI: require at least SOME background in either programming, data tools or math.
    const aiEligibility = useMemo(() => {
        if (formData.selected_course !== "ai") return true // not applicable
        const hasProg = formData.programming_experience && formData.programming_experience !== "none"
        const hasData = formData.data_tools && formData.data_tools !== "none"
        const hasMath = formData.math_background && formData.math_background !== "none"
        return hasProg || hasData || hasMath
    }, [
        formData.selected_course,
        formData.programming_experience,
        formData.data_tools,
        formData.math_background,
    ])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">


            {/* Personal Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="sub_city">Sub City</Label>
                        <Input id="sub_city" name="sub_city" value={formData.sub_city} onChange={handleChange} required />
                    </div>
                </CardContent>
            </Card>

            {/* Education */}
            <Card>
                <CardHeader>
                    <CardTitle>Educational Background</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="university">University / College / TVET</Label>
                        <Input id="university" name="university" value={formData.university} onChange={handleChange} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="field_of_study">Field of Study / Major</Label>
                        <Input id="field_of_study" name="field_of_study" value={formData.field_of_study} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="graduation_year">Year of Completion</Label>
                        <Input
                            id="graduation_year"
                            name="graduation_year"
                            type="number"
                            min="1900"
                            max={new Date().getFullYear()}
                            placeholder="e.g. 2023"
                            value={formData.graduation_year}
                            onChange={handleChange}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Course Selection */}
            <Card>
                <CardHeader>
                    <CardTitle>Choose Course</CardTitle>
                </CardHeader>
                <CardContent>
                    <Label>Select the accelerated program you want to apply for</Label>
                    <div className="mt-3 space-y-3">
                        <RadioGroup
                            value={formData.selected_course}
                            onValueChange={(value) => handleSelectChange("selected_course", value)}
                            className="space-y-2"
                            required
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="marketing" id="course-marketing" />
                                <Label htmlFor="course-marketing">Digital Marketing</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="ai" id="course-ai" />
                                <Label htmlFor="course-ai">AI & Data Analytics</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>
            {/* Conditional: AI fields (only when AI is selected) */}
            {formData.selected_course === "ai" && (
                <>
                    <Card>
                        <CardHeader>
                            <CardTitle>Experience & Technical Skills (AI)</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <Label htmlFor="programming_experience">Programming Experience</Label>
                                <Select
                                    value={formData.programming_experience}
                                    onValueChange={(v) => handleSelectChange("programming_experience", v)}
                                >
                                    <SelectTrigger id="programming_experience">
                                        <SelectValue placeholder="Select experience level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">No experience</SelectItem>
                                        <SelectItem value="basic">Basic (some exposure)</SelectItem>
                                        <SelectItem value="intermediate">Intermediate (project experience)</SelectItem>
                                        <SelectItem value="advanced">Advanced (professional)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="sm:col-span-2">
                                <Label htmlFor="data_tools">Data Tools Familiarity</Label>
                                <Select value={formData.data_tools} onValueChange={(v) => handleSelectChange("data_tools", v)}>
                                    <SelectTrigger id="data_tools">
                                        <SelectValue placeholder="Select familiarity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        <SelectItem value="excel">Excel / Google Sheets</SelectItem>
                                        <SelectItem value="python">Python (Pandas / NumPy)</SelectItem>
                                        <SelectItem value="r">R</SelectItem>
                                        <SelectItem value="powerbi">Power BI / Tableau</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="sm:col-span-2">
                                <Label htmlFor="math_background">Maths & Statistics Background</Label>
                                <Select value={formData.math_background} onValueChange={(v) => handleSelectChange("math_background", v)}>
                                    <SelectTrigger id="math_background">
                                        <SelectValue placeholder="Select your background" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        <SelectItem value="basic">Basic (intro)</SelectItem>
                                        <SelectItem value="intermediate">Intermediate (college)</SelectItem>
                                        <SelectItem value="advanced">Advanced (applied / professional)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Familiarity with Core Topics</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { key: "ml", label: "Machine Learning" },
                                { key: "visualization", label: "Data Visualization" },
                                { key: "sql", label: "Databases / SQL" },
                            ].map(({ key, label }) => (
                                <div key={key}>
                                    <Label>{label}</Label>
                                    <Select
                                        value={formData.familiarity[key]}
                                        onValueChange={(value) => handleFamiliarityChange(key, value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select familiarity level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 - Not Familiar</SelectItem>
                                            <SelectItem value="2">2 - Beginner</SelectItem>
                                            <SelectItem value="3">3 - Moderate</SelectItem>
                                            <SelectItem value="4">4 - Expert</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </>
            )}

            {/* Marketing-specific brief field (optional) */}
            {formData.selected_course === "marketing" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Digital Marketing Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Label>Briefly describe any marketing or business experience (optional)</Label>
                        <Textarea
                            name="marketing_experience"
                            value={formData.marketing_experience}
                            onChange={handleChange}
                            placeholder="Internships, projects, courses, tools (Google Ads, Meta, Canva), etc."
                            rows={3}
                        />
                    </CardContent>
                </Card>
            )}

            {/* Program Preferences */}
            <Card>
                <CardHeader>
                    <CardTitle>Motivation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Label>Why are you interested in this course?</Label>
                    <Textarea
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        placeholder="Write a short answer"
                    />
                    <div className="sm:col-span-2">
                        <Label htmlFor="referral">How did you hear about us?</Label>
                        <Select value={formData.referral} onValueChange={(v) => handleSelectChange("referral", v)}>
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
                                <Link href="/terms-and-conditions" className="text-primary hover:underline">
                                    <strong>Terms and Conditions</strong>
                                </Link>
                            </Label>
                        </div>
                    </div>

                    {formData.agreeTerms ?
                        <Button type="submit" className="w-full">
                            Submit
                        </Button> :
                        <Button disabled type="submit" className="w-full">
                            Submit
                        </Button>
                    }
                </CardContent>
            </Card>

            {/* Terms */}
        </form>
    )
}


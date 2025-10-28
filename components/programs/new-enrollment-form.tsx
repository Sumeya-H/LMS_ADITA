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
        fullName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        subCity: "",
        university: "",
        graduationYear: "",
        background: "",
        selectedCourse: "none", // "marketing" | "ai"
        // course-specific
        marketingExperience: "",
        programmingExperience: "none", // none | basic | intermediate | advanced
        dataTools: "none", // none | excel | python | r | powerbi
        mathBackground: "none", // none | basic | intermediate | advanced
        familiarity: { ml: "1", visualization: "1", sql: "1" }, // 1-5
        // common
        motivation: "",
        goals: "",
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
        if (formData.selectedCourse !== "ai") return true // not applicable
        const hasProg = formData.programmingExperience && formData.programmingExperience !== "none"
        const hasData = formData.dataTools && formData.dataTools !== "none"
        const hasMath = formData.mathBackground && formData.mathBackground !== "none"
        return hasProg || hasData || hasMath
    }, [
        formData.selectedCourse,
        formData.programmingExperience,
        formData.dataTools,
        formData.mathBackground,
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
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
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
                        <Label htmlFor="subCity">Sub City</Label>
                        <Input id="subCity" name="subCity" value={formData.subCity} onChange={handleChange} required />
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
                    <div>
                        <Label htmlFor="graduationYear">Year of Completion</Label>
                        <Input
                            id="graduationYear"
                            name="graduationYear"
                            type="number"
                            min="1900"
                            max={new Date().getFullYear()}
                            placeholder="e.g. 2023"
                            value={formData.graduationYear}
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
                            value={formData.selectedCourse}
                            onValueChange={(value) => handleSelectChange("selectedCourse", value)}
                            className="space-y-2"
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
            {formData.selectedCourse === "ai" && (
                <>
                    <Card>
                        <CardHeader>
                            <CardTitle>Experience & Technical Skills (AI)</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <Label htmlFor="programmingExperience">Programming Experience</Label>
                                <Select
                                    value={formData.programmingExperience}
                                    onValueChange={(v) => handleSelectChange("programmingExperience", v)}
                                >
                                    <SelectTrigger id="programmingExperience">
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
                                <Label htmlFor="dataTools">Data Tools Familiarity</Label>
                                <Select value={formData.dataTools} onValueChange={(v) => handleSelectChange("dataTools", v)}>
                                    <SelectTrigger id="dataTools">
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
                                <Label htmlFor="mathBackground">Maths & Statistics Background</Label>
                                <Select value={formData.mathBackground} onValueChange={(v) => handleSelectChange("mathBackground", v)}>
                                    <SelectTrigger id="mathBackground">
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
            {formData.selectedCourse === "marketing" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Digital Marketing Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Label>Briefly describe any marketing or business experience (optional)</Label>
                        <Textarea
                            name="marketingExperience"
                            value={formData.marketingExperience}
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


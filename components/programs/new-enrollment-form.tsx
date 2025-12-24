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
import PhoneNumberInput from "@/components/ui/phoneNumberInput"

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
        selected_course: "none",
        marketing_experience: "",
        programming_experience: "none",
        data_tools: "none",
        math_background: "none",
        familiarity: { ml: "1", visualization: "1", sql: "1" },
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
    const setPhoneNumber = (value) => {
        setFormData((prev) => ({
            ...prev,
            phone: "+251" + value,
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

    /* ---------------- VALIDATION LOGIC ---------------- */

    const aiEligibility = useMemo(() => {
        if (formData.selected_course !== "ai") return true
        return (
            formData.programming_experience !== "none" ||
            formData.data_tools !== "none" ||
            formData.math_background !== "none"
        )
    }, [
        formData.selected_course,
        formData.programming_experience,
        formData.data_tools,
        formData.math_background,
    ])

    const isFormValid = useMemo(() => {
        // Basic required fields
        const basicValid =
            formData.full_name.trim() &&
            formData.email.trim() &&
            formData.phone.trim() &&
            formData.city.trim() &&
            formData.sub_city.trim() &&
            formData.field_of_study.trim() &&
            formData.university.trim() &&
            formData.graduation_year.trim() &&
            formData.selected_course !== "none" &&
            (
                (formData.selected_course === "ai" &&
                    formData.programming_experience !== "No experience" &&
                    formData.math_background !== "none" &&
                    formData.data_tools !== "none"
                )
                ||
                (formData.selected_course === "marketing" &&
                    formData.marketing_experience.trim())
            ) &&

            formData.motivation.trim() &&
            formData.agreeTerms

        if (!basicValid) return false

        // AI-specific validation
        if (formData.selected_course === "ai" && !aiEligibility) {
            return false
        }

        return true
    }, [formData, aiEligibility])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isFormValid) return
        onSubmit(formData)
    }

    const [isValid, setIsValid] = useState(false);
    /* ---------------- UI ---------------- */

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {/* Personal Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label>Full Name</Label>
                        <Input name="full_name" value={formData.full_name} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Phone</Label>
                        <PhoneNumberInput setNumber={setPhoneNumber} valid={setIsValid} />
                    </div>
                    <div>
                        <Label>City</Label>
                        <Input name="city" value={formData.city} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Sub City</Label>
                        <Input name="sub_city" value={formData.sub_city} onChange={handleChange} />
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
                        <Label>University / College</Label>
                        <Input name="university" value={formData.university} onChange={handleChange} />
                    </div>
                    <div className="sm:col-span-2">
                        <Label>Field of Study</Label>
                        <Input name="field_of_study" value={formData.field_of_study} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Graduation Year</Label>
                        <Input name="graduation_year" type="number" value={formData.graduation_year} onChange={handleChange} />
                    </div>
                </CardContent>
            </Card>

            {/* Course Selection */}
            <Card>
                <CardHeader>
                    <CardTitle>Choose Course</CardTitle>
                </CardHeader>
                <CardContent>
                    <RadioGroup
                        value={formData.selected_course}
                        onValueChange={(v) => handleSelectChange("selected_course", v)}
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="marketing" />
                            <Label>Digital Marketing</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="ai" />
                            <Label>AI & Data Analytics</Label>
                        </div>
                    </RadioGroup>
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


            {/* Terms */}
            <Card>
                <CardHeader>
                    <CardTitle>Motivation</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        placeholder="Why are you interested?"
                    />
                    <div className="flex items-start mt-4 gap-2">
                        <Checkbox
                            checked={formData.agreeTerms}
                            onCheckedChange={(v) => handleSelectChange("agreeTerms", v)}
                            required
                        />
                        <Label className="text-sm">
                            I agree to the{" "}
                            <Link href="/terms-and-conditions" className="text-primary underline">
                                Terms and Conditions
                            </Link>
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-4"
                        disabled={!isFormValid || !isValid}
                    >
                        Submit
                    </Button>
                </CardContent>
            </Card>

        </form>
    )
}

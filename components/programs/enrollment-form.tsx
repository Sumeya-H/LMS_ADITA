"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

export default function EnrollmentForm({ onSubmit, program }) {
    const [formData, setFormData] = useState({
        course: program.reg_id,
        startDate: "",
        goals: "",
        mode: "",
        location: "",
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
        if (name === "mode" && value === "online") {
            setFormData(prev => ({ ...prev, location: "" }))
        }
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


        // Validate learning mode
        if (!formData.mode) {
            setFormError("Please select your preferred learning mode.")
            setIsSubmitting(false)
            return
        }

        // Validate location if needed
        if (
            (formData.mode === "hybrid" || formData.mode === "in-person") &&
            !formData.location
        ) {
            setFormError("Please select your preferred training location.")
            setIsSubmitting(false)
            return
        }

        try {
            const res = await onSubmit({
                ...formData
            })
            print(res.data)
        } catch (err) {
            const response = err?.response?.data || err;

            const fieldErrors = {}

            console.log("response", err);

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
            {/* -------------------- Learning Preference -------------------- */}
            <div>
                <h3 className="text-lg font-medium">Learning Preference</h3>
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
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4">
                    {/* Mode Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="mode">Preferred Learning Mode</Label>
                        <Select
                            value={formData.mode}
                            onValueChange={(value) =>
                                handleSelectChange("mode", value)
                            }
                        >
                            <SelectTrigger id="mode">
                                <SelectValue placeholder="Select learning mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="online">Online</SelectItem>
                                <SelectItem value="hybrid">Hybrid (Online + In-Person)</SelectItem>
                                <SelectItem value="in-person">In-Person</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Location Selection (Conditional) */}
                    {(formData.mode === "hybrid" || formData.mode === "in-person") && (
                        <div className="space-y-2">
                            <Label htmlFor="location">Preferred Training Location</Label>
                            <Select
                                value={formData.location}
                                onValueChange={(value) =>
                                    handleSelectChange("location", value)
                                }
                            >
                                <SelectTrigger id="location">
                                    <SelectValue placeholder="Select training location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="aastu">
                                        Addis Ababa Science and Technology University
                                    </SelectItem>
                                    <SelectItem value="ict-park">
                                        ICT Park
                                    </SelectItem>
                                    <SelectItem value="fdre-tvt">
                                        FDRE TVT Institute
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
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

            {/* -------------------- Terms -------------------- */}
            < div className="flex items-start space-x-2" >
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
            {formError && (
                <p className="text-sm text-red-500">{formError}</p>
            )}
            <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !formData.agreed_terms}>
                {isSubmitting ? "Submitting..." : "Continue"}
            </Button>
        </form >
    )
}

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
        course: program.reg_id,
        startDate: "",
        format: "",
        goals: "",
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
                        </RadioGroup>
                    </div>
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
                    Continue
                </Button> :
                <Button disabled type="submit" className="w-full">
                    Continue
                </Button>
            }
        </form>
    )
}

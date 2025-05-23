"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function CorporateContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Thank you for your inquiry. Our team will contact you shortly.")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company/Organization</Label>
        <Input id="company" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input id="jobTitle" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select>
          <SelectTrigger id="industry">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="banking">Banking & Finance</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="government">Government</SelectItem>
            <SelectItem value="agriculture">Agriculture</SelectItem>
            <SelectItem value="telecom">Telecommunications</SelectItem>
            <SelectItem value="retail">Retail & E-commerce</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="energy">Energy & Utilities</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="teamSize">Team Size (to be trained)</Label>
        <Select>
          <SelectTrigger id="teamSize">
            <SelectValue placeholder="Select team size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-10">1-10 employees</SelectItem>
            <SelectItem value="11-50">11-50 employees</SelectItem>
            <SelectItem value="51-100">51-100 employees</SelectItem>
            <SelectItem value="101-500">101-500 employees</SelectItem>
            <SelectItem value="500+">500+ employees</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="trainingType">Training Type</Label>
        <Select>
          <SelectTrigger id="trainingType">
            <SelectValue placeholder="Select training type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="executive">Executive Briefing</SelectItem>
            <SelectItem value="technical">Technical Training</SelectItem>
            <SelectItem value="department">Department-Specific</SelectItem>
            <SelectItem value="certification">Certification Program</SelectItem>
            <SelectItem value="custom">Custom Solution</SelectItem>
            <SelectItem value="unsure">Not Sure Yet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional Information</Label>
        <Textarea
          id="message"
          placeholder="Please share any specific requirements or questions you have about our corporate training programs."
          rows={4}
        />
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="consent" required />
        <Label htmlFor="consent" className="text-sm">
          I agree to receive communications from ADITA regarding my inquiry. ADITA will process my data in accordance
          with the Privacy Policy.
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
      </Button>
    </form>
  )
}

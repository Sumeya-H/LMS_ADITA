"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MapPin, Mail, Phone, Clock } from "lucide-react"

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
          <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Message Sent!</h3>
              <p className="mt-2 text-muted-foreground">
                Thank you for reaching out. Our team will contact you shortly.
              </p>
              <Button className="mt-6" variant="outline" onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={4} required />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Find us at our locations or reach out through our contact channels.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Main Campus</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Innovation Hub, 123 Tech Avenue
                <br />
                Accra, Ghana
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Satellite Campuses</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Nairobi, Kenya
                <br />
                Lagos, Nigeria
                <br />
                Cape Town, South Africa
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-sm text-muted-foreground mt-1">
                General Inquiries: info@adita.africa
                <br />
                Admissions: admissions@adita.africa
                <br />
                Partnerships: partners@adita.africa
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Phone</h3>
              <p className="text-sm text-muted-foreground mt-1">
                +233 123 456 7890 (Ghana)
                <br />
                +254 123 456 7890 (Kenya)
                <br />
                +234 123 456 7890 (Nigeria)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Hours</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Monday - Friday: 8:00 AM - 6:00 PM
                <br />
                Saturday: 9:00 AM - 1:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

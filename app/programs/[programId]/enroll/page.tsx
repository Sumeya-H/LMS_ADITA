"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Award, CheckCircle } from "lucide-react"
import EnrollmentForm from "@/components/programs/enrollment-form"
import PaymentForm from "@/components/programs/payment-form"

export default function ProgramEnrollmentPage({ params }) {
  const [enrollmentStep, setEnrollmentStep] = useState("details")
  const [enrollmentData, setEnrollmentData] = useState({})

  // In a real application, you would fetch this data from an API
  const program = {
    id: params.programId,
    title: "AI Fundamentals",
    description: "A comprehensive introduction to AI concepts, machine learning basics, and data science fundamentals.",
    type: "certification",
    duration: "8 weeks",
    level: "Beginner",
    format: "Online & In-person",
    startDates: ["June 15, 2025", "September 1, 2025", "January 10, 2026"],
    price: "$199",
    image: "/ai-basics-classroom.png",
  }

  const handleEnrollmentSubmit = (data) => {
    setEnrollmentData(data)
    setEnrollmentStep("payment")
  }

  const handlePaymentSubmit = (paymentData) => {
    // In a real application, you would process the payment here
    console.log("Processing payment", { ...enrollmentData, ...paymentData })
    setEnrollmentStep("confirmation")
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href={`/programs/${params.programId}`}>
          <Button variant="outline" size="sm" className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Program
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Enroll in {program.title}</h1>
        <p className="mt-2 text-muted-foreground">Complete your enrollment to secure your spot in this program.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Enrollment Process</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={enrollmentStep === "details" ? "default" : "outline"}>Details</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant={enrollmentStep === "payment" ? "default" : "outline"}>Payment</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant={enrollmentStep === "confirmation" ? "default" : "outline"}>Confirmation</Badge>
                </div>
              </div>
              <CardDescription>Please complete all required information to enroll in this program.</CardDescription>
            </CardHeader>
            <CardContent>
              {enrollmentStep === "details" && <EnrollmentForm onSubmit={handleEnrollmentSubmit} program={program} />}
              {enrollmentStep === "payment" && (
                <PaymentForm onSubmit={handlePaymentSubmit} program={program} enrollmentData={enrollmentData} />
              )}
              {enrollmentStep === "confirmation" && (
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Enrollment Successful!</h2>
                  <p className="mt-2 text-muted-foreground">
                    Thank you for enrolling in {program.title}. Your enrollment has been confirmed.
                  </p>
                  <div className="mt-6 rounded-lg bg-muted p-4 text-left">
                    <h3 className="font-medium">Next Steps:</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>Check your email for enrollment confirmation and details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>Complete your student profile in the dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>Review pre-course materials before your start date</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>Join the orientation session (details will be emailed)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-8 flex justify-center gap-4">
                    <Button asChild>
                      <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/programs">Browse More Programs</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Program Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={program.image || "/placeholder.svg"}
                  alt={program.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">{program.title}</h3>
              <p className="text-sm text-muted-foreground">{program.description}</p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{program.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Level</p>
                    <p className="font-medium">{program.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Format</p>
                    <p className="font-medium">{program.format}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Certification</p>
                    <p className="font-medium">Yes, upon completion</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Program Fee:</span>
                  <span className="text-xl font-bold text-primary">{program.price}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full text-center text-sm text-muted-foreground">
                Need help?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact our support team
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

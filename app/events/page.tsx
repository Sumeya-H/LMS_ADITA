"use client"

import NewEnrollmentForm from "@/components/programs/new-enrollment-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { useState } from "react";
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Award, CheckCircle } from "lucide-react"
import { Button } from "react-day-picker";

export default function Events() {
    const [enrollmentStep, setEnrollmentStep] = useState("details")
    return (
        <div className="container py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Enroll</h1>
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
                                    <span className="text-muted-foreground my-auto">→</span>
                                    {/*<Badge variant={enrollmentStep === "payment" ? "default" : "outline"}>Payment</Badge>
                                    <span className="text-muted-foreground my-auto">→</span>*/}
                                    <Badge variant={enrollmentStep === "confirmation" ? "default" : "outline"}>Confirmation</Badge>
                                </div>
                            </div>
                            <CardDescription>Please complete all required information to enroll in this program.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {enrollmentStep === "details" && <NewEnrollmentForm />}
                            {enrollmentStep === "confirmation" && (
                                <div className="text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                        <CheckCircle className="h-8 w-8 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Enrollment Successful!</h2>
                                    <p className="mt-2 text-muted-foreground">
                                        Thank you for enrolling in Digital Skills & Emerging Technologies Training Program. Your enrollment has been confirmed.
                                    </p>
                                    <div className="mt-6 rounded-lg bg-muted p-4 text-left">
                                        <h3 className="font-medium">Next Steps:</h3>
                                        <ul className="mt-2 space-y-2">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                                                <span>Check your email for enrollment confirmation and details</span>
                                            </li>
                                            {/*<li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                                                <span>Complete your student profile in the dashboard</span>
                                            </li>*/}
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                                                <span>Join the orientation session (details will be emailed)</span>
                                            </li>
                                        </ul>
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
                                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
                                    alt="Digital Skills & Emerging Technologies Training Program"
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <h3 className="text-xl font-bold">
                                Digital Skills & Emerging Technologies Training Program
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                A comprehensive 2-part training designed to equip participants with essential
                                digital literacy, productivity, and career readiness skills, followed by a
                                specialization track in either <strong>Artificial Intelligence & Data Analytics</strong> or
                                <strong> Digital Marketing & E-commerce</strong>.
                            </p>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Duration</p>
                                        <p className="font-medium">2 Weeks Foundation + Specialization Track</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Badge className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Level</p>
                                        <p className="font-medium">Beginner to Intermediate</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Format</p>
                                        <p className="font-medium">In-person / Hybrid</p>
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

                            {/*<div className="pt-4 space-y-4 border-t">
                                <h4 className="font-semibold text-lg">A. Foundation Module (2 Weeks - Mandatory)</h4>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    <li>Digital Literacy & Productivity Tools</li>
                                    <li>Introduction to Emerging Technologies (AI, IoT, Cloud Computing)</li>
                                    <li>Professional Soft Skills (Communication, Problem-Solving, Teamwork)</li>
                                    <li>Career Readiness (CV Writing, Interview Skills, LinkedIn Optimization)</li>
                                </ul>

                                <h4 className="font-semibold text-lg pt-2">B. Specialization Tracks (Choose One)</h4>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    <li>
                                        <strong>1. Artificial Intelligence & Data Analytics:</strong> Python, Data Wrangling,
                                        Visualization (Excel, Power BI, Tableau), Machine Learning Basics, and Statistical Analysis.
                                    </li>
                                    <li>
                                        <strong>2. Digital Marketing & E-commerce:</strong> Social Media Marketing (Facebook, Instagram, TikTok),
                                        SEO & SEM, Content Strategy, E-commerce Management (Shopify, WooCommerce), and Google Analytics.
                                    </li>
                                </ul>
                            </div>*/}
                        </CardContent>

                        <CardFooter>
                            <div className="w-full text-center text-sm text-muted-foreground">
                                Need help?{" "}
                                <Link
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=support@aditacademy.co&su=Training%20Program%20Inquiry&body=Hello%20ADITA%20Team%2C%0A%0AI%20would%20like%20to%20ask%20about%20the%20Digital%20Skills%20%26%20Emerging%20Technologies%20Training%20Program..."
                                    className="text-primary hover:underline"
                                >
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

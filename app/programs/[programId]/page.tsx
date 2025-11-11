"use client"
import React from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users, GraduationCap, BookOpen, CheckCircle, Award, Building, Briefcase } from "lucide-react"
import RelatedPrograms from "@/components/programs/related-programs"
import ProgramReviews from "@/components/programs/program-reviews"
import { programs } from "@/helpers/programs"

export default function ProgramDetailPage({ params }) {
    // In a real application, you would fetch this data from an API
    // For this example, we'll use a mock program
    const resolvedParmam = React.use(params);
    const { programId } = resolvedParmam;
    const program = programs.find((p) => p.id === programId);
    if (!program) {
        return <div>Program not found</div>;
    }
    return (
        <div className="container py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                    <div className="mb-6 flex flex-wrap items-center gap-2">
                        <Link href="/programs">
                            <Button variant="outline" size="sm">
                                Back to Programs
                            </Button>
                        </Link>
                        <Badge variant="outline">{program.level}</Badge>
                        <Badge variant="outline">{program.duration}</Badge>
                        <Badge variant="secondary">{program.format}</Badge>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight">{program.title}</h1>
                    <p className="mt-4 text-xl text-muted-foreground">{program.description}</p>

                    <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg">
                        <img src={program.image || "/placeholder.svg"} alt={program.title} className="h-full w-full object-cover" />
                    </div>

                    <div className="mt-8">
                        <Tabs defaultValue="overview">
                            <TabsList className="w-full">
                                <TabsTrigger value="overview" className="flex-1">
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="curriculum" className="flex-1">
                                    Curriculum
                                </TabsTrigger>
                                {/*<TabsTrigger value="instructors" className="flex-1">
                                    Instructors
                                </TabsTrigger>
                                <TabsTrigger value="reviews" className="flex-1">
                                    Reviews
                                </TabsTrigger>
                                <TabsTrigger value="dates" className="flex-1">
                                    Dates & Registration
                                </TabsTrigger>*/}
                            </TabsList>

                            <TabsContent value="overview" className="mt-6">
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold">About This Program</h2>
                                        <p className="mt-2">{program.longDescription}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold">Who Should Attend</h3>
                                        <p className="mt-2">This program is designed for:</p>
                                        <ul className="mt-2 list-inside list-disc space-y-1">
                                            {program.audience.map((audience) => (
                                                <li key={audience}>{audience}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold">Learning Outcomes</h3>
                                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {program.outcomes.map((outcome, index) => (
                                                <div key={index} className="flex items-start gap-2">
                                                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                                                    <span>{outcome}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold">Requirements</h3>
                                        <ul className="mt-2 list-inside list-disc space-y-1">
                                            {program.requirements.map((requirement, index) => (
                                                <li key={index}>{requirement}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold">Certification</h3>
                                        <div className="mt-4 flex items-center gap-4">
                                            <Award className="h-12 w-12 text-primary" />
                                            <div>
                                                <p className="font-medium">{program.certification}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Upon successful completion of the program and all required assessments
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="curriculum" className="mt-6">
                                <h2 className="text-2xl font-bold">Program Curriculum</h2>
                                <p className="mt-2 text-muted-foreground">
                                    This curriculum is designed to build your skills progressively, from foundational concepts to
                                    practical application.
                                </p>

                                <div className="mt-6 space-y-6">
                                    {program.modules.map((module, index) => (
                                        <Card key={index}>
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <CardTitle>
                                                        Module {index + 1}: {module.title}
                                                    </CardTitle>
                                                    <Badge variant="outline">{module.duration}</Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <h4 className="font-medium">Topics covered:</h4>
                                                <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                    {module.topics.map((topic, topicIndex) => (
                                                        <li key={topicIndex} className="flex items-center gap-2">
                                                            <BookOpen className="h-4 w-4 text-primary" />
                                                            <span>{topic}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="instructors" className="mt-6">
                                <h2 className="text-2xl font-bold">Meet Your Instructors</h2>
                                <p className="mt-2 text-muted-foreground">
                                    Learn from industry experts and experienced educators in the field of AI.
                                </p>

                                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    {program.instructors.map((instructor) => (
                                        <Card key={instructor.name}>
                                            <CardContent className="p-6">
                                                <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-4">
                                                    <div className="h-24 w-24 overflow-hidden rounded-full">
                                                        <img
                                                            src={instructor.image || "/placeholder.svg"}
                                                            alt={instructor.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="mt-4 text-center sm:mt-0 sm:text-left">
                                                        <h3 className="text-lg font-bold">{instructor.name}</h3>
                                                        <p className="text-sm text-primary">{instructor.title}</p>
                                                        <p className="mt-2 text-sm">{instructor.bio}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="reviews" className="mt-6">
                                <ProgramReviews programId={programId} />
                            </TabsContent>

                            <TabsContent value="dates" className="mt-6">
                                <h2 className="text-2xl font-bold">Upcoming Program Dates</h2>
                                <p className="mt-2 text-muted-foreground">Choose from multiple start dates to fit your schedule.</p>

                                <div className="mt-6 space-y-4">
                                    {program.startDates.map((date, index) => (
                                        <Card key={index}>
                                            <CardContent className="flex flex-col items-start justify-between p-6 sm:flex-row sm:items-center">
                                                <div className="flex items-center gap-4">
                                                    <Calendar className="h-10 w-10 text-primary" />
                                                    <div>
                                                        <p className="font-medium">Cohort {index + 1}</p>
                                                        <p className="text-lg font-bold">{date}</p>
                                                    </div>
                                                </div>
                                                <Button asChild className="mt-4 sm:mt-0">
                                                    <Link href={`/programs/${programId}/enroll`}>Enroll Now</Link>
                                                    {/* <Link href={`/programs/${programId}`}>Enroll Now</Link>*/}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                <div className="mt-8 rounded-lg bg-muted p-6">
                                    <h3 className="text-xl font-bold">Group Enrollment</h3>
                                    <p className="mt-2">
                                        Looking to enroll multiple team members? Contact us for special group rates and customized
                                        scheduling.
                                    </p>
                                    <Button className="mt-4" variant="outline">
                                        Contact for Group Enrollment
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                <div>
                    <div className="sticky top-20">
                        <Card>
                            <CardHeader>
                                <CardTitle>Program Details</CardTitle>
                                <CardDescription>Key information about this program</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Duration</p>
                                        <p className="font-medium">{program.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Level</p>
                                        <p className="font-medium">{program.level}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Building className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Format</p>
                                        <p className="font-medium">{program.format}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Target Audience</p>
                                        <p className="font-medium">{program.audience.join(", ")}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Award className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Certification</p>
                                        <p className="font-medium">Yes, upon completion</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Briefcase className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Job Placement</p>
                                        <p className="font-medium">Career support included</p>
                                    </div>
                                </div>

                                <div className="mt-6 border-t pt-6">
                                    {/*<p className="text-center text-2xl font-bold text-primary">{program.price}</p>*/}
                                    <Button asChild className="mt-4 w-full">
                                        <Link href={`/programs/${programId}/enroll`}>Enroll Now</Link>
                                        {/*<Link href={`/programs/${programId}`}>Enroll Now</Link>*/}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">Need Help?</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Have questions about this program or need assistance with enrollment?
                            </p>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support@aditacademy.co&su=Course%20Inquiry&body=Hello%20ADITA%20Team%2C%0A%0AI%20would%20like%20to%20ask%20about...">
                                <Button variant="outline" className="mt-4 w-full">
                                    Contact us
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <RelatedPrograms currentProgramId={program.type} />
            </div>
        </div>
    )
}

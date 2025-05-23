import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, FileText, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Application Submitted - ADITA AI Incubator",
  description: "Your application to the ADITA AI Incubator & Accelerator program has been successfully submitted.",
}

export default function ApplicationConfirmationPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <Card className="border-primary/20">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl">Application Submitted!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for applying to the ADITA AI Incubator & Accelerator program
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-muted p-6">
              <h3 className="text-xl font-medium">What happens next?</h3>
              <ol className="mt-4 space-y-4">
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Application Review</h4>
                    <p className="text-muted-foreground">
                      Our team will review your application within the next 2-3 weeks.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Initial Feedback</h4>
                    <p className="text-muted-foreground">
                      You'll receive an email with initial feedback and next steps if your application is shortlisted.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Interview & Assessment</h4>
                    <p className="text-muted-foreground">
                      Shortlisted applicants will be invited for an interview and technical assessment.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium">Final Decision</h4>
                    <p className="text-muted-foreground">
                      Final decisions will be communicated approximately 4-6 weeks after your application submission.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  <CardTitle className="text-base">Important Dates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Next cohort begins: <strong>September 15, 2023</strong>
                    <br />
                    Application deadline: <strong>August 1, 2023</strong>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <FileText className="h-6 w-6 text-primary" />
                  <CardTitle className="text-base">Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Prepare additional documents that may be requested during the next stages of the selection process.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Users className="h-6 w-6 text-primary" />
                  <CardTitle className="text-base">Connect</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Join our community events and webinars to network with other applicants and alumni.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-center text-muted-foreground">
              Have questions about your application? Contact us at{" "}
              <a href="mailto:incubator@adita.edu" className="text-primary underline">
                incubator@adita.edu
              </a>
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild variant="outline">
                <Link href="/incubator">Return to Incubator</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

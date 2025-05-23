import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function EnrollmentConfirmationPage({ params }: { params: { courseId: string } }) {
  // In a real application, you would fetch this data from an API
  const course = {
    id: Number.parseInt(params.courseId),
    title: "Introduction to AI and Machine Learning",
    startDate: "June 15, 2023",
    instructor: "Dr. Amara Okafor",
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Enrollment Successful!</h1>
        <p className="mt-4 text-muted-foreground">
          You have successfully enrolled in {course.title}. We're excited to have you join us!
        </p>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Enrollment Details</CardTitle>
            <CardDescription>Your course information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-left font-medium">Course:</div>
              <div className="text-right">{course.title}</div>

              <div className="text-left font-medium">Start Date:</div>
              <div className="text-right">{course.startDate}</div>

              <div className="text-left font-medium">Instructor:</div>
              <div className="text-right">{course.instructor}</div>

              <div className="text-left font-medium">Enrollment ID:</div>
              <div className="text-right">
                ADITA-{course.id}-{Math.floor(Math.random() * 10000)}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground mb-2">
              A confirmation email has been sent to your registered email address with additional details.
            </p>
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

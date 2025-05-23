import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  BookOpen,
  Calendar,
  BadgeIcon as Certificate,
  Clock,
  FileText,
  GraduationCap,
  BarChart,
  Users,
} from "lucide-react"
import ProgramRecommendations from "@/components/programs/program-recommendations"

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Kwame! Track your learning progress and upcoming events.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/courses">Continue Learning</Link>
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 in progress, 1 completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Next: Project submission in 3 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
            <Certificate className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">AI Fundamentals completed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="mt-8">
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Introduction to AI</CardTitle>
                <CardDescription>Fundamentals of AI and Machine Learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Week 6 of 8</span>
                  </div>
                  <div className="text-sm font-medium">75% Complete</div>
                </div>
                <Progress value={75} className="mb-2" />
                <Button asChild className="mt-4 w-full">
                  <Link href="/dashboard/courses/intro-to-ai">Continue</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Data Science Essentials</CardTitle>
                <CardDescription>Statistical methods and data analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Week 4 of 8</span>
                  </div>
                  <div className="text-sm font-medium">50% Complete</div>
                </div>
                <Progress value={50} className="mb-2" />
                <Button asChild className="mt-4 w-full">
                  <Link href="/dashboard/courses/data-science">Continue</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Python Programming</CardTitle>
                <CardDescription>Programming fundamentals for AI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Completed</span>
                  </div>
                  <div className="text-sm font-medium">100% Complete</div>
                </div>
                <Progress value={100} className="mb-2" />
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href="/dashboard/certificates/python">View Certificate</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your scheduled classes and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <Calendar className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Neural Networks Live Workshop</h4>
                    <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM - 4:00 PM</p>
                    <Button variant="link" className="mt-1 h-auto p-0 text-primary">
                      Join Meeting
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <FileText className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Data Analysis Project Submission</h4>
                    <p className="text-sm text-muted-foreground">Due in 3 days</p>
                    <Button variant="link" className="mt-1 h-auto p-0 text-primary">
                      View Assignment
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <Users className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">AI Ethics Discussion Group</h4>
                    <p className="text-sm text-muted-foreground">Friday, 3:00 PM - 4:30 PM</p>
                    <Button variant="link" className="mt-1 h-auto p-0 text-primary">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>Additional materials to support your learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <BookOpen className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">AI Fundamentals E-Book</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive guide to AI concepts and applications</p>
                    <Button variant="link" className="mt-1 h-auto p-0 text-primary">
                      Download PDF
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <FileText className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Python Code Examples</h4>
                    <p className="text-sm text-muted-foreground">Sample code for common AI algorithms</p>
                    <Button variant="link" className="mt-1 h-auto p-0 text-primary">
                      View Repository
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <Users className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">AI Practitioner Community</h4>
                    <p className="text-sm text-muted-foreground">Connect with fellow students and mentors</p>
                    <Button variant="link" className="mt-1 h-auto p-0 text-primary">
                      Join Forum
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <ProgramRecommendations userProfile={{ role: "educator", level: "beginner" }} />
      </div>
    </div>
  )
}

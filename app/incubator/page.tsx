import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Lightbulb, Users, Calendar, ArrowRight, Rocket, Award, Building } from "lucide-react"

export default function IncubatorPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">AI Incubator & Accelerator</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Launch and grow your AI-powered startup with expert mentorship, funding opportunities, and resources.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/incubator/apply">Apply Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/incubator/schedule-tour">Schedule a Tour</Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="flex flex-col items-center text-center">
          <CardHeader>
            <Lightbulb className="h-12 w-12 text-primary" />
            <CardTitle className="mt-4">Idea Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              For entrepreneurs with innovative AI concepts seeking validation, mentorship, and initial development
              support.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button asChild variant="link">
              <Link href="/incubator/idea-stage" className="flex items-center gap-2">
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col items-center text-center">
          <CardHeader>
            <Rocket className="h-12 w-12 text-primary" />
            <CardTitle className="mt-4">Growth Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              For startups with MVP or early traction seeking market expansion, technical expertise, and funding
              connections.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button asChild variant="link">
              <Link href="/incubator/growth-stage" className="flex items-center gap-2">
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col items-center text-center">
          <CardHeader>
            <Building className="h-12 w-12 text-primary" />
            <CardTitle className="mt-4">Scale Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              For established AI companies looking to scale operations, enter new markets, and secure larger investment
              rounds.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button asChild variant="link">
              <Link href="/incubator/scale-stage" className="flex items-center gap-2">
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="programs">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="success">Success Stories</TabsTrigger>
          </TabsList>
          <TabsContent value="programs" className="mt-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>6-Month Incubation Program</CardTitle>
                  <CardDescription>Comprehensive support for early-stage AI startups</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Users className="mt-1 h-5 w-5 text-primary" />
                      <span>Expert mentorship from AI industry leaders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Building className="mt-1 h-5 w-5 text-primary" />
                      <span>Co-working space and technical infrastructure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Award className="mt-1 h-5 w-5 text-primary" />
                      <span>Seed funding opportunities up to $50,000</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Calendar className="mt-1 h-5 w-5 text-primary" />
                      <span>Weekly workshops and networking events</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/incubator/apply">Apply Now</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>3-Month Accelerator Program</CardTitle>
                  <CardDescription>Intensive growth program for AI startups with traction</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Users className="mt-1 h-5 w-5 text-primary" />
                      <span>Personalized coaching from successful founders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Building className="mt-1 h-5 w-5 text-primary" />
                      <span>Access to cloud computing credits and AI tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Award className="mt-1 h-5 w-5 text-primary" />
                      <span>Investor demo day with potential funders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Calendar className="mt-1 h-5 w-5 text-primary" />
                      <span>Market expansion and customer acquisition support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/incubator/apply">Apply Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="mentors" className="mt-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardHeader className="text-center">
                    <div className="mx-auto h-24 w-24 overflow-hidden rounded-full">
                      <img
                        src={`/images/incubator/mentor-${i}.png`}
                        alt={`Mentor ${i}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardTitle className="mt-4">Dr. Ade Johnson</CardTitle>
                    <CardDescription>AI Entrepreneur & Investor</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Former CTO at TechAfrica, founded 3 successful AI startups, and angel investor in 12+ companies.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/incubator/mentors/${i}`}>View Profile</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="success" className="mt-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {[1, 2].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video w-full">
                    <img
                      src={`/images/incubator/success-story-${i}.png`}
                      alt={`Success story ${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>HealthAI Africa</CardTitle>
                    <CardDescription>AI-powered diagnostic tool for rural healthcare</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Started in our incubator in 2022, HealthAI has now raised $2M in funding and serves over 200 rural
                      clinics across East Africa, improving diagnostic accuracy by 60%.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="link" className="px-0">
                      <Link href="/incubator/success-stories/health-ai" className="flex items-center gap-2">
                        Read Their Story <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16 rounded-xl bg-primary p-8 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold">Ready to Transform Your AI Idea into Reality?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
          Join our community of innovators and entrepreneurs building the future of AI in Africa. Applications for our
          next cohort are now open.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/incubator/apply">Apply Now</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link href="/incubator/faq">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

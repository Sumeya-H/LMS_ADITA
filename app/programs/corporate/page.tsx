import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Users, Briefcase, CheckCircle, Calendar, Clock } from "lucide-react"
import CorporateContactForm from "@/components/programs/corporate-contact-form"

export default function CorporateTrainingPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">Corporate AI Training</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Customized AI training solutions to upskill your workforce and drive digital transformation
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg?height=600&width=800&query=corporate%20training%20session%20in%20africa"
              alt="Corporate AI Training"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Why Choose ADITA for Corporate Training?</h2>
              <p className="mt-2">
                Our corporate training programs are designed to meet the specific needs of your organization, providing
                your team with the AI skills and knowledge needed to drive innovation and growth.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Users className="mt-1 h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-bold">Expert Instructors</h3>
                      <p className="mt-1 text-sm">
                        Learn from industry professionals with extensive experience in AI implementation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Briefcase className="mt-1 h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-bold">Customized Content</h3>
                      <p className="mt-1 text-sm">
                        Training materials tailored to your industry and specific business challenges
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="mt-1 h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-bold">Flexible Scheduling</h3>
                      <p className="mt-1 text-sm">
                        Programs designed to fit your team's availability and work commitments
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Building className="mt-1 h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-bold">On-site Options</h3>
                      <p className="mt-1 text-sm">
                        Training delivered at your location or our state-of-the-art facilities
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Request Corporate Training</CardTitle>
              <CardDescription>Fill out the form below to discuss your organization's training needs</CardDescription>
            </CardHeader>
            <CardContent>
              <CorporateContactForm />
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">Our Corporate Clients</h2>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center justify-center rounded-lg border bg-background p-4">
                  <img
                    src={`/placeholder.svg?height=80&width=160&query=african%20company%20logo%20${i}`}
                    alt={`Corporate Client ${i}`}
                    className="h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">Corporate Training Options</h2>
        <p className="mt-2 text-muted-foreground">
          Choose from our range of corporate training formats or contact us for a fully customized solution
        </p>

        <Tabs defaultValue="executive" className="mt-6">
          <TabsList className="w-full">
            <TabsTrigger value="executive" className="flex-1">
              Executive Briefings
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex-1">
              Technical Training
            </TabsTrigger>
            <TabsTrigger value="department" className="flex-1">
              Department-Specific
            </TabsTrigger>
            <TabsTrigger value="certification" className="flex-1">
              Certification Programs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="executive" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI for Executive Leadership</CardTitle>
                <CardDescription>
                  Strategic overview of AI capabilities, opportunities, and implementation considerations for
                  decision-makers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Duration: 1-2 days</p>
                      <p className="text-sm text-muted-foreground">Intensive sessions designed for busy executives</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Ideal for: C-Suite, Directors, Senior Managers</p>
                      <p className="text-sm text-muted-foreground">Decision-makers responsible for digital strategy</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Key Topics:</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>AI strategic implementation and ROI</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>Digital transformation roadmaps</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>AI governance and ethical considerations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>Competitive landscape and industry trends</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Request Executive Briefing</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical AI Implementation</CardTitle>
                <CardDescription>
                  Hands-on training for technical teams to develop and deploy AI solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Duration: 1-4 weeks</p>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive technical training with practical exercises
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Ideal for: IT Teams, Developers, Data Scientists</p>
                      <p className="text-sm text-muted-foreground">
                        Technical staff responsible for implementing AI solutions
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Key Topics:</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>Machine learning model development</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>Data pipeline construction and management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>AI system integration with existing infrastructure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>Performance optimization and scaling</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Request Technical Training</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="department" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Department-Specific AI Training</CardTitle>
                <CardDescription>
                  Specialized training focused on AI applications for specific business functions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Duration: 2-5 days</p>
                      <p className="text-sm text-muted-foreground">Focused training on relevant AI applications</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Available for: Marketing, HR, Finance, Operations, Customer Service</p>
                      <p className="text-sm text-muted-foreground">Tailored for specific departmental needs</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Example Programs:</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>AI for Marketing: Customer segmentation and personalization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>AI for HR: Talent acquisition and employee engagement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>AI for Finance: Fraud detection and risk assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>AI for Operations: Process optimization and predictive maintenance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Request Department Training</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="certification" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Corporate Certification Programs</CardTitle>
                <CardDescription>
                  Comprehensive certification programs for organizations looking to build internal AI expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Duration: 8-12 weeks</p>
                      <p className="text-sm text-muted-foreground">In-depth training with formal certification</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Ideal for: Organizations building internal AI capabilities</p>
                      <p className="text-sm text-muted-foreground">Employees selected for AI specialization</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Certification Options:</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>ADITA Certified AI Practitioner</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>ADITA Certified Data Scientist</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>ADITA Certified AI Solution Architect</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span>ADITA Certified AI Project Manager</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Request Certification Program</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">Success Stories</h2>
        <p className="mt-2 text-muted-foreground">
          See how our corporate training programs have helped organizations across Africa
        </p>

        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <img
                      src={`/placeholder.svg?height=100&width=100&query=african%20company%20logo%20${i}`}
                      alt={`Company ${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle>National Bank of Ghana</CardTitle>
                    <CardDescription>Financial Services</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  "ADITA's corporate training program helped us implement AI-powered fraud detection systems that
                  reduced fraudulent transactions by 60% and saved us millions in potential losses."
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <img
                    src="/placeholder.svg?height=50&width=50&query=african%20executive"
                    alt="Executive"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <p className="text-sm font-medium">Kofi Mensah, CTO</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/case-studies/national-bank">Read Case Study</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-xl bg-primary p-8 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold">Ready to Transform Your Organization?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
          Contact us today to discuss how our corporate AI training programs can help your organization leverage AI for
          innovation, efficiency, and competitive advantage.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="#corporate-contact">Request Consultation</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link href="/programs/corporate/brochure">Download Brochure</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

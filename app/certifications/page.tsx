import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Award, Briefcase, ChevronRight, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Professional Certifications | Africa Digital Innovation Academy",
  description:
    "Explore industry-recognized AI and digital technology certifications offered by the Africa Digital Innovation Academy.",
}

export default function CertificationsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Professional Certifications</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Earn industry-recognized certifications that validate your skills and boost your career prospects in AI and
          digital technologies across Africa.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="sticky top-24 bg-background p-6 rounded-lg border shadow-sm">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search certifications..."
                  className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Certification Level</h3>
                <div className="space-y-2">
                  {["Foundation", "Associate", "Professional", "Expert"].map((level) => (
                    <div key={level} className="flex items-center">
                      <input type="checkbox" id={level} className="mr-2" />
                      <label htmlFor={level} className="text-sm">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Technology Area</h3>
                <div className="space-y-2">
                  {[
                    "AI & Machine Learning",
                    "Data Science",
                    "Cloud Computing",
                    "Cybersecurity",
                    "Blockchain",
                    "IoT",
                  ].map((area) => (
                    <div key={area} className="flex items-center">
                      <input type="checkbox" id={area.replace(/\s+/g, "-").toLowerCase()} className="mr-2" />
                      <label htmlFor={area.replace(/\s+/g, "-").toLowerCase()} className="text-sm">
                        {area}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Duration</h3>
                <div className="space-y-2">
                  {["Under 1 month", "1-3 months", "3-6 months", "6+ months"].map((duration) => (
                    <div key={duration} className="flex items-center">
                      <input type="checkbox" id={duration.replace(/\s+/g, "-").toLowerCase()} className="mr-2" />
                      <label htmlFor={duration.replace(/\s+/g, "-").toLowerCase()} className="text-sm">
                        {duration}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4">
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid w-full md:w-auto grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="industry">Industry</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert) => (
                  <CertificationCard key={cert.id} certification={cert} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications
                  .filter((c) => c.popular)
                  .map((cert) => (
                    <CertificationCard key={cert.id} certification={cert} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications
                  .filter((c) => c.new)
                  .map((cert) => (
                    <CertificationCard key={cert.id} certification={cert} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="industry" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications
                  .filter((c) => c.industry)
                  .map((cert) => (
                    <CertificationCard key={cert.id} certification={cert} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-950/30 dark:to-blue-950/30 rounded-xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h2 className="text-2xl font-bold mb-3">Verify a Certification</h2>
            <p className="text-muted-foreground mb-4">
              Employers and organizations can verify the authenticity of ADITA certifications using our secure
              verification system.
            </p>
            <Link href="/certifications/verify">
              <Button>
                Verify Certificate
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="w-full md:w-1/3">
            <Image
              src="/certificate-verification.png"
              alt="Certificate Verification"
              width={300}
              height={200}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose ADITA Certifications?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <Award className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Industry Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our certifications are recognized by leading tech companies and organizations across Africa and
                globally.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <Briefcase className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Career Advancement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                ADITA certified professionals report a 40% average increase in job opportunities and salary potential.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CheckCircle className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Practical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our certifications focus on practical, hands-on skills that are immediately applicable in the workplace.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <Clock className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Lifetime Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Receive lifetime access to certification materials and updates to keep your skills current.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Certified?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Take the next step in your professional journey with an ADITA certification. Browse our offerings and find the
          right certification path for your career goals.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg">Explore Certification Paths</Button>
          <Button size="lg" variant="outline">
            Contact Certification Advisor
          </Button>
        </div>
      </div>
    </div>
  )
}

interface Certification {
  id: string
  title: string
  level: string
  duration: string
  image: string
  description: string
  popular?: boolean
  new?: boolean
  industry?: boolean
}

function CertificationCard({ certification }: { certification: Certification }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48">
        <Image
          src={certification.image || "/placeholder.svg"}
          alt={certification.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {certification.popular && <Badge className="bg-yellow-500">Popular</Badge>}
          {certification.new && <Badge className="bg-green-500">New</Badge>}
          {certification.industry && <Badge className="bg-blue-500">Industry</Badge>}
        </div>
      </div>
      <CardHeader>
        <CardTitle>{certification.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{certification.level}</Badge>
            <span className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" /> {certification.duration}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{certification.description}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/certifications/${certification.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

const certifications: Certification[] = [
  {
    id: "ai-ml-foundation",
    title: "AI & Machine Learning Foundation",
    level: "Foundation",
    duration: "2 months",
    image: "/placeholder.svg?height=200&width=300&query=AI and Machine Learning certification",
    description: "Build a solid foundation in AI and machine learning concepts, algorithms, and applications.",
    popular: true,
  },
  {
    id: "data-science-professional",
    title: "Data Science Professional",
    level: "Professional",
    duration: "4 months",
    image: "/placeholder.svg?height=200&width=300&query=Data Science certification",
    description: "Master data analysis, visualization, and predictive modeling techniques for real-world applications.",
    popular: true,
    industry: true,
  },
  {
    id: "ai-ethics-governance",
    title: "AI Ethics & Governance",
    level: "Associate",
    duration: "6 weeks",
    image: "/placeholder.svg?height=200&width=300&query=AI Ethics certification",
    description: "Learn to navigate ethical considerations and governance frameworks in AI development and deployment.",
    new: true,
  },
  {
    id: "nlp-specialist",
    title: "Natural Language Processing Specialist",
    level: "Expert",
    duration: "3 months",
    image: "/placeholder.svg?height=200&width=300&query=NLP certification",
    description:
      "Specialize in natural language processing techniques for text analysis, sentiment analysis, and language generation.",
    industry: true,
  },
  {
    id: "computer-vision-expert",
    title: "Computer Vision Expert",
    level: "Expert",
    duration: "3 months",
    image: "/placeholder.svg?height=200&width=300&query=Computer Vision certification",
    description: "Master advanced computer vision algorithms and techniques for image and video analysis.",
    industry: true,
  },
  {
    id: "ai-business-strategy",
    title: "AI for Business Strategy",
    level: "Professional",
    duration: "2 months",
    image: "/placeholder.svg?height=200&width=300&query=AI Business Strategy certification",
    description: "Learn to integrate AI solutions into business strategies and operations for competitive advantage.",
    new: true,
  },
  {
    id: "blockchain-fundamentals",
    title: "Blockchain Fundamentals",
    level: "Foundation",
    duration: "6 weeks",
    image: "/placeholder.svg?height=200&width=300&query=Blockchain certification",
    description: "Understand the core concepts of blockchain technology and its applications in various industries.",
    popular: true,
  },
  {
    id: "cloud-ai-architect",
    title: "Cloud AI Architect",
    level: "Expert",
    duration: "4 months",
    image: "/placeholder.svg?height=200&width=300&query=Cloud AI Architect certification",
    description: "Design and implement scalable AI solutions on cloud platforms for enterprise applications.",
    industry: true,
  },
  {
    id: "iot-ai-integration",
    title: "IoT & AI Integration",
    level: "Professional",
    duration: "3 months",
    image: "/placeholder.svg?height=200&width=300&query=IoT and AI certification",
    description: "Learn to combine IoT devices with AI algorithms for smart systems and automation.",
    new: true,
  },
]

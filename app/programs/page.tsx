import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import ProgramFilters from "@/components/programs/program-filters"
import AudienceSelector from "@/components/programs/audience-selector"
import ProgramSearch from "@/components/programs/program-search"
import { ArrowRight, ArrowRightLeft } from "lucide-react"

export default function ProgramsPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">AI Training Programs</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover our comprehensive range of AI programs designed to build skills for Africa's digital future.
        </p>
      </div>

      {/* <div className="mx-auto mt-8 max-w-2xl">
        <ProgramSearch programs={programs} />
      </div> */}

      {/* <AudienceSelector /> */}

      <div className="mt-12">
        <Tabs defaultValue="all">
          <div className="flex justify-center">
            {/* <TabsList className="mb-8">
              <TabsTrigger value="all">All Programs</TabsTrigger>
              <TabsTrigger value="certification">Certification</TabsTrigger>
              <TabsTrigger value="workshops">Workshops</TabsTrigger>
              <TabsTrigger value="corporate">Corporate</TabsTrigger>
              <TabsTrigger value="specialized">Specialized</TabsTrigger>
            </TabsList> */}
          </div>

          {/* <div className="flex justify-end">
            <Button variant="outline" size="sm" asChild className="mb-4">
              <Link href="/programs/compare" className="flex items-center gap-2">
                <ArrowRightLeft className="h-4 w-4" /> Compare Programs
              </Link>
            </Button>
          </div> */}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="md:col-span-1">
              <ProgramFilters />
            </div>

            <div className="md:col-span-3 lg:col-span-4">
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {programs.map((program) => (
                    <ProgramCard key={program.id} program={program} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="certification" className="mt-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {programs
                    .filter((program) => program.type === "certification")
                    .map((program) => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="workshops" className="mt-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {programs
                    .filter((program) => program.type === "workshop")
                    .map((program) => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="corporate" className="mt-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {programs
                    .filter((program) => program.type === "corporate")
                    .map((program) => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="specialized" className="mt-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {programs
                    .filter((program) => program.type === "specialized")
                    .map((program) => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

function ProgramCard({ program }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={program.image || "/placeholder.svg"}
          alt={program.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{program.level}</Badge>
          <Badge variant="outline">{program.duration}</Badge>
          <Badge variant="secondary">{program.format}</Badge>
        </div>
        <CardTitle className="mt-2">{program.title}</CardTitle>
        <CardDescription>{program.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Target Audience:</p>
            <p className="text-sm font-medium">{program.audience.join(", ")}</p>
          </div>
          {/* {program.price && (
            <div className="text-right">
              <p className="text-lg font-bold text-primary">{program.price}</p>
              {program.pricePeriod && <p className="text-xs text-muted-foreground">{program.pricePeriod}</p>}
            </div>
          )} */}
        </div>
      </CardContent>
      {/* <CardFooter className="flex gap-2">
        <Button asChild className="flex-1">
          <Link href={`/programs/${program.id}`} className="flex items-center justify-center gap-2">
            View Details <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild title="Add to comparison">
          <Link href={`/programs/compare?add=${program.id}`}>
            <ArrowRightLeft className="h-4 w-4" />
            <span className="sr-only">Compare</span>
          </Link>
        </Button>
      </CardFooter> */}
    </Card>
  )
}

const programs = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    description: "A comprehensive introduction to AI concepts, machine learning basics, and data science fundamentals.",
    type: "certification",
    duration: "8 weeks",
    level: "Beginner",
    format: "Online & In-person",
    audience: ["Youth", "Educators", "Professionals"],
    price: "$199",
    pricePeriod: "one-time",
    image: "/ai-basics-classroom.png",
  },
  {
    id: "advanced-machine-learning",
    title: "Advanced Machine Learning",
    description:
      "Deep dive into neural networks, deep learning, and advanced ML algorithms for experienced practitioners.",
    type: "certification",
    duration: "12 weeks",
    level: "Advanced",
    format: "Online & In-person",
    audience: ["IT Professionals", "Researchers", "Data Scientists"],
    price: "$349",
    pricePeriod: "one-time",
    image: "/data-scientist-visualizations.png",
  },
  {
    id: "ai-for-business",
    title: "AI for Business Leaders",
    description: "Strategic implementation of AI in business operations, decision-making, and digital transformation.",
    type: "corporate",
    duration: "4 weeks",
    level: "Intermediate",
    format: "Online & Workshops",
    audience: ["Managers", "Business Leaders", "Entrepreneurs"],
    price: "$299",
    pricePeriod: "one-time",
    image: "/business-meeting-data.png",
  },
  {
    id: "healthcare-ai",
    title: "Healthcare AI Applications",
    description:
      "Specialized training for healthcare professionals on AI applications in diagnostics and patient care.",
    type: "specialized",
    duration: "6 weeks",
    level: "Intermediate",
    format: "Online & Workshops",
    audience: ["Healthcare Professionals", "Hospital Administrators"],
    price: "$249",
    pricePeriod: "one-time",
    image: "/placeholder-3gf1m.png",
  },
  {
    id: "financial-ai",
    title: "AI in Banking & Finance",
    description:
      "Implementing AI solutions for risk assessment, fraud detection, and customer service in financial institutions.",
    type: "specialized",
    duration: "8 weeks",
    level: "Intermediate",
    format: "Online & In-person",
    audience: ["Bank Employees", "Insurance Workers", "Financial Services"],
    price: "$299",
    pricePeriod: "one-time",
    image: "/placeholder.svg?height=400&width=600&query=banking%20professionals%20with%20ai",
  },
  {
    id: "ai-policy-governance",
    title: "AI Policy & Governance",
    description: "Training for policymakers on developing responsible AI regulations and governance frameworks.",
    type: "specialized",
    duration: "4 weeks",
    level: "Advanced",
    format: "In-person",
    audience: ["Decision Makers", "Policy Makers", "Government Officials"],
    price: "$399",
    pricePeriod: "one-time",
    image: "/placeholder.svg?height=400&width=600&query=policy%20makers%20in%20discussion",
  },
  {
    id: "ai-bootcamp",
    title: "Intensive AI Bootcamp",
    description:
      "Fast-track your AI skills with this intensive, hands-on bootcamp covering key AI concepts and applications.",
    type: "workshop",
    duration: "2 weeks",
    level: "Beginner to Intermediate",
    format: "In-person",
    audience: ["Youth", "Career Changers", "Professionals"],
    price: "$499",
    pricePeriod: "one-time",
    image: "/placeholder.svg?height=400&width=600&query=intensive%20coding%20bootcamp",
  },
  {
    id: "ai-for-educators",
    title: "AI for Educators",
    description: "Learn how to integrate AI concepts into educational curricula and use AI tools to enhance teaching.",
    type: "specialized",
    duration: "4 weeks",
    level: "Beginner",
    format: "Online",
    audience: ["Educators", "School Administrators", "Education Officials"],
    price: "$199",
    pricePeriod: "one-time",
    image: "/placeholder.svg?height=400&width=600&query=teachers%20learning%20technology",
  },
  {
    id: "agricultural-ai",
    title: "AI in Agriculture",
    description:
      "Applying AI techniques to improve crop yields, resource management, and sustainable farming practices.",
    type: "specialized",
    duration: "6 weeks",
    level: "Intermediate",
    format: "Blended",
    audience: ["Agriculture Professionals", "Farmers", "Agribusiness Managers"],
    price: "$249",
    pricePeriod: "one-time",
    image: "/placeholder.svg?height=400&width=600&query=smart%20farming%20technology",
  },
  {
    id: "corporate-ai-training",
    title: "Custom Corporate AI Training",
    description: "Tailored AI training programs designed specifically for your organization's needs and objectives.",
    type: "corporate",
    duration: "Customizable",
    level: "All Levels",
    format: "Customizable",
    audience: ["Corporations", "NGOs", "Government Agencies"],
    price: "Custom",
    image: "/placeholder.svg?height=400&width=600&query=corporate%20training%20session",
  },
  {
    id: "ai-cybersecurity",
    title: "AI for Cybersecurity",
    description: "Using AI to enhance security measures, detect threats, and protect digital infrastructure.",
    type: "certification",
    duration: "8 weeks",
    level: "Advanced",
    format: "Online & In-person",
    audience: ["IT Security Professionals", "Network Administrators"],
    price: "$349",
    pricePeriod: "one-time",
    image: "/placeholder.svg?height=400&width=600&query=cybersecurity%20operations%20center",
  },
  {
    id: "ai-entrepreneurship",
    title: "AI Entrepreneurship Workshop",
    description: "Learn how to build AI-powered startups, from ideation to market validation and funding.",
    type: "workshop",
    duration: "1 week",
    level: "Intermediate",
    format: "In-person",
    audience: ["Entrepreneurs", "Startups", "Business Innovators"],
    price: "$299",
    pricePeriod: "one-time",
    image: "/placeholder.svg?height=400&width=600&query=startup%20team%20brainstorming",
  },
]

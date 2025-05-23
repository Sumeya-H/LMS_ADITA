import { BookOpen, Award, Users, Briefcase, Lightbulb, Globe, Shield, Handshake } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    name: "AI Education & Training",
    description: "Comprehensive courses in AI, Machine Learning, and Data Science tailored for African contexts.",
    icon: BookOpen,
  },
  {
    name: "Certification Programs",
    description: "Industry-recognized certifications to validate skills and enhance career prospects.",
    icon: Award,
  },
  {
    name: "Workshops & Bootcamps",
    description: "Intensive, hands-on training sessions to develop practical AI skills quickly.",
    icon: Users,
  },
  {
    name: "Job Placement",
    description: "Connect with employers seeking AI talent across various industries in Africa.",
    icon: Briefcase,
  },
  {
    name: "AI Incubator",
    description: "Support for AI-driven startups and entrepreneurs to develop innovative solutions.",
    icon: Lightbulb,
  },
  {
    name: "Policy & Governance",
    description: "Training for policymakers to develop responsible AI regulations and frameworks.",
    icon: Globe,
  },
  {
    name: "Cybersecurity Focus",
    description: "Specialized training in AI-enhanced cybersecurity to protect digital infrastructure.",
    icon: Shield,
  },
  {
    name: "Industry Partnerships",
    description: "Collaborate with leading tech companies and organizations for real-world experience.",
    icon: Handshake,
  },
]

export default function Features() {
  return (
    <section className="container py-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Empowering Africa's Digital Future</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Our comprehensive services and programs are designed to build a robust AI ecosystem across Africa.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.name} className="border-2 transition-all hover:border-primary hover:shadow-md">
            <CardHeader>
              <feature.icon className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">{feature.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

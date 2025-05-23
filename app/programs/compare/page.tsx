"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Check, X, Clock, Users, Award, Briefcase } from "lucide-react"

export default function ProgramComparePage() {
  const searchParams = useSearchParams()
  const addParam = searchParams.get("add")

  const [selectedPrograms, setSelectedPrograms] = useState([])
  const [availablePrograms, setAvailablePrograms] = useState([])

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const allPrograms = [
      {
        id: "ai-fundamentals",
        title: "AI Fundamentals",
        description:
          "A comprehensive introduction to AI concepts, machine learning basics, and data science fundamentals.",
        type: "certification",
        duration: "8 weeks",
        level: "Beginner",
        format: "Online & In-person",
        audience: ["Youth", "Educators", "Professionals"],
        price: "$199",
        pricePeriod: "one-time",
        prerequisites: "Basic computer literacy",
        certification: "ADITA AI Fundamentals Certificate",
        jobOpportunities: ["AI Assistant", "Junior Data Analyst", "AI Support Specialist"],
        skills: ["Python Basics", "Data Analysis", "Machine Learning Fundamentals", "Neural Networks Basics"],
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
        prerequisites: "Strong programming skills, basic ML knowledge",
        certification: "ADITA Advanced ML Specialist Certificate",
        jobOpportunities: ["Machine Learning Engineer", "AI Researcher", "Data Scientist"],
        skills: ["Deep Learning", "Neural Network Architecture", "Model Optimization", "Research Methods"],
        image: "/data-scientist-visualizations.png",
      },
      {
        id: "ai-for-business",
        title: "AI for Business Leaders",
        description:
          "Strategic implementation of AI in business operations, decision-making, and digital transformation.",
        type: "corporate",
        duration: "4 weeks",
        level: "Intermediate",
        format: "Online & Workshops",
        audience: ["Managers", "Business Leaders", "Entrepreneurs"],
        price: "$299",
        pricePeriod: "one-time",
        prerequisites: "Business management experience",
        certification: "ADITA AI Business Strategy Certificate",
        jobOpportunities: ["Digital Transformation Manager", "AI Strategy Consultant", "Innovation Director"],
        skills: ["AI Strategy Development", "ROI Analysis", "Change Management", "AI Project Management"],
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
        prerequisites: "Healthcare background",
        certification: "ADITA Healthcare AI Specialist Certificate",
        jobOpportunities: ["Healthcare AI Specialist", "Medical Data Analyst", "Clinical AI Coordinator"],
        skills: ["Medical Data Analysis", "Diagnostic AI Systems", "Patient Care Optimization", "Healthcare Ethics"],
        image: "/placeholder-3gf1m.png",
      },
    ]

    // Initialize with the program from the URL if present
    if (addParam) {
      const programToAdd = allPrograms.find((p) => p.id === addParam)
      if (programToAdd) {
        setSelectedPrograms([programToAdd])
      }
    }

    setAvailablePrograms(allPrograms)
  }, [addParam])

  const addProgram = (programId) => {
    const programToAdd = availablePrograms.find((p) => p.id === programId)
    if (programToAdd && !selectedPrograms.some((p) => p.id === programId)) {
      setSelectedPrograms([...selectedPrograms, programToAdd])
    }
  }

  const removeProgram = (programId) => {
    setSelectedPrograms(selectedPrograms.filter((p) => p.id !== programId))
  }

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/programs">
            <Button variant="outline" size="sm" className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Compare Programs</h1>
          <p className="mt-2 text-muted-foreground">
            Compare different programs side by side to find the best fit for your learning goals.
          </p>
        </div>

        <div className="w-64">
          <Select onValueChange={addProgram}>
            <SelectTrigger>
              <SelectValue placeholder="Add program to compare" />
            </SelectTrigger>
            <SelectContent>
              {availablePrograms
                .filter((p) => !selectedPrograms.some((sp) => sp.id === p.id))
                .map((program) => (
                  <SelectItem key={program.id} value={program.id}>
                    {program.title}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedPrograms.length === 0 ? (
        <Card className="text-center">
          <CardContent className="pt-10 pb-10">
            <p className="mb-4 text-muted-foreground">No programs selected for comparison.</p>
            <p className="mb-6">Select programs to compare from the dropdown above or browse our programs.</p>
            <Button asChild>
              <Link href="/programs">Browse Programs</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr>
                <th className="w-1/4 p-4 text-left"></th>
                {selectedPrograms.map((program) => (
                  <th key={program.id} className="w-1/4 p-4">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => removeProgram(program.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                      <div className="aspect-video w-full overflow-hidden rounded-lg">
                        <img
                          src={program.image || "/placeholder.svg"}
                          alt={program.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="mt-2 text-lg font-bold">{program.title}</h3>
                      <p className="text-sm text-muted-foreground">{program.description}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4 font-medium">Type</td>
                {selectedPrograms.map((program) => (
                  <td key={program.id} className="p-4 text-center">
                    <Badge variant="outline">{program.type}</Badge>
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Duration</td>
                {selectedPrograms.map((program) => (
                  <td key={program.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{program.duration}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Level</td>
                {selectedPrograms.map((program) => (
                  <td key={program.id} className="p-4 text-center">
                    <Badge>{program.level}</Badge>
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Format</td>
                {selectedPrograms.map((program) => (
                  <td key={program.id} className="p-4 text-center">
                    <span>{program.format}</span>
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Target Audience</td>
                {selectedPrograms.map((program) => (
                  <td key={program.id} className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{program.audience.join(", ")}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Prerequisites</td>
                {selectedPrograms.map((program) => (
                  <td key={program.id} className="p-4 text-center">
                    <span>{program.prerequisites}</span>
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Certification</td>
                {selectedPrograms.map((program) => (
                  <td key={program.id} className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>{program.certification}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Key Skills</td>
                {selectedPrograms.map((program) => (
                  <td key={program.id} className="p-4">
                    <ul className="space-y-1">
                      {program.skills.map((skill, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Job Opportunities</td>
                {selectedPrograms.map((program) => (
                  <td key={program.id} className="p-4">
                    <ul className="space-y-1">
                      {program.jobOpportunities.map((job, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>{job}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Price</td>
                {selectedPrograms.map((program) => (
                  <td key={program.id} className="p-4 text-center">
                    <div className="text-xl font-bold text-primary">{program.price}</div>
                    {program.pricePeriod && <div className="text-xs text-muted-foreground">{program.pricePeriod}</div>}
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4"></td>
                {selectedPrograms.map((program) => (
                  <td key={program.id} className="p-4 text-center">
                    <Button asChild className="w-full">
                      <Link href={`/programs/${program.id}/enroll`}>Enroll Now</Link>
                    </Button>
                    <Button asChild variant="outline" className="mt-2 w-full">
                      <Link href={`/programs/${program.id}`}>View Details</Link>
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

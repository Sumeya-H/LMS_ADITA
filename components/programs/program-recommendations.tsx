"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export default function ProgramRecommendations({ userProfile = null }) {
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real application, you would fetch personalized recommendations from an API
    // based on the user's profile, interests, and learning history
    const fetchRecommendations = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      const mockRecommendations = [
        {
          id: "ai-fundamentals",
          title: "AI Fundamentals",
          description:
            "A comprehensive introduction to AI concepts, machine learning basics, and data science fundamentals.",
          type: "certification",
          duration: "8 weeks",
          level: "Beginner",
          format: "Online & In-person",
          matchScore: 98,
          reason: "Based on your interest in technology and beginner skill level",
          image: "/ai-basics-classroom.png",
        },
        {
          id: "python-for-ai",
          title: "Python Programming for AI",
          description: "Learn Python programming fundamentals with a focus on AI and machine learning applications.",
          type: "certification",
          duration: "6 weeks",
          level: "Beginner",
          format: "Online",
          matchScore: 95,
          reason: "Recommended for beginners in AI and programming",
          image: "/placeholder.svg?height=200&width=400&query=python%20programming%20code",
        },
        {
          id: "ai-for-educators",
          title: "AI for Educators",
          description:
            "Learn how to integrate AI concepts into educational curricula and use AI tools to enhance teaching.",
          type: "specialized",
          duration: "4 weeks",
          level: "Beginner",
          format: "Online",
          matchScore: 92,
          reason: "Matches your background in education",
          image: "/placeholder.svg?height=200&width=400&query=teachers%20learning%20technology",
        },
      ]

      setRecommendations(mockRecommendations)
      setIsLoading(false)
    }

    fetchRecommendations()
  }, [userProfile])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <p className="text-muted-foreground">Personalized program recommendations based on your profile</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video w-full animate-pulse bg-muted"></div>
              <CardHeader>
                <div className="h-6 w-2/3 animate-pulse rounded bg-muted"></div>
                <div className="h-4 animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 animate-pulse rounded bg-muted"></div>
              </CardContent>
              <CardFooter>
                <div className="h-10 w-full animate-pulse rounded bg-muted"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <p className="text-muted-foreground">Personalized program recommendations based on your profile</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/programs">View All Programs</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((program) => (
          <Card key={program.id} className="overflow-hidden">
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={program.image || "/placeholder.svg"}
                alt={program.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-2 right-2 rounded-full bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
                {program.matchScore}% Match
              </div>
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
              <div className="rounded-lg bg-muted p-2 text-sm">
                <span className="font-medium">Why we recommend this:</span> {program.reason}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/programs/${program.id}`} className="flex items-center justify-center gap-2">
                  View Program <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

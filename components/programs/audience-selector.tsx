"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  GraduationCap,
  Users,
  Building,
  Briefcase,
  HeartPulse,
  Leaf,
  UserCog,
  Globe,
  FileText,
  Lightbulb,
} from "lucide-react"

export default function AudienceSelector() {
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null)

  const audiences = [
    { id: "youth", name: "Youth", icon: GraduationCap },
    { id: "educators", name: "Educators", icon: Users },
    { id: "finance", name: "Banking & Finance", icon: Building },
    { id: "healthcare", name: "Healthcare", icon: HeartPulse },
    { id: "agriculture", name: "Agriculture", icon: Leaf },
    { id: "business", name: "Business Leaders", icon: Briefcase },
    { id: "government", name: "Government", icon: Globe },
    { id: "ngo", name: "NGOs", icon: FileText },
    { id: "it", name: "IT Professionals", icon: UserCog },
    { id: "entrepreneurs", name: "Entrepreneurs", icon: Lightbulb },
  ]

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-center">Find Programs For Your Role</h2>
      <p className="mt-2 text-center text-muted-foreground">
        Select your professional background to see tailored program recommendations
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {audiences.map((audience) => (
          <Card
            key={audience.id}
            className={`cursor-pointer transition-all hover:border-primary hover:shadow-md ${
              selectedAudience === audience.id ? "border-2 border-primary bg-primary/5" : ""
            }`}
            onClick={() => setSelectedAudience(audience.id)}
          >
            <CardContent className="flex flex-col items-center justify-center p-4 text-center">
              <audience.icon
                className={`h-8 w-8 ${selectedAudience === audience.id ? "text-primary" : "text-muted-foreground"}`}
              />
              <span className="mt-2 text-sm font-medium">{audience.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedAudience && (
        <div className="mt-6 flex justify-center">
          <Button asChild variant="outline">
            <a href={`#${selectedAudience}-programs`}>View Recommended Programs</a>
          </Button>
        </div>
      )}
    </div>
  )
}

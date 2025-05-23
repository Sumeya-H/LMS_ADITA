import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Certification Paths | Africa Digital & Innovation Technology Academy",
  description:
    "Explore structured certification paths to build your career in AI and digital technologies with Africa Digital & Innovation Technology Academy.",
}

export default function CertificationPathsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      Certificate Path
      </div>
  )
}
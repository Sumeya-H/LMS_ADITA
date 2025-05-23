import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Certification Paths | Africa Digital Innovation Academy",
  description:
    "Explore structured certification paths to build your career in AI and digital technologies with Africa Digital Innovation Academy.",
}

export default function CertificationPathsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Certification Paths</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Follow structured learning paths to build your expertise progressively and achieve your career goals in AI and digital technologies.
        </p>
      </div>
      
      <Tabs defaultValue="ai-ml" className="mb-12">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="ai-ml">AI & Machine Learning</TabsTrigger>
          <TabsTrigger value="data-science">Data Science</TabsTrigger>
          <TabsTrigger value="cloud-ai">Cloud & AI</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai-ml" className="mt-6">
          <div className="bg-muted p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-2">AI & Machine Learning Path</h2>
            <p className="text-muted-foreground mb-4">
              Build a comprehensive skill set in artificial intelligence and machine learning, from foundational concepts to advanced applications and specialized domains.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm bg-background px-3 py-1 rounded-full">Estimated completion: 12-18 months</span>
              <span className="text-sm bg-background px-3 py-1 rounded-full">4 certifications</span>
              <span className="text-sm bg-background px-3 py-1 rounded-full">Career-ready</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border z-0"></div>
            
            <div className="relative z-10 mb-12">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xl font-bold">
                  1
                </div>
                <div className="ml-6 pt-3">
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>AI & Machine Learning Foundation</CardTitle>
                      <CardDescription>Foundation Level • 2 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Build a solid foundation in AI and machine learning concepts, algorithms, and applications.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span className="text-sm">Core AI and ML concepts and terminology</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span className="text-sm">Python programming for AI applications</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span className="text-sm">Basic machine learning algorithms</span>
                        </div>
                      </div>
                      <div className="relative h-40 w-full rounded-md overflow-hidden">
                        <Image 
                          src="/placeholder.svg?height=160&width=500&query=AI and Machine Learning basics" 
                          alt="AI and Machine Learning Foundation" 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/certifications/ai-ml-foundation" className="w-full">
                        <Button className="w-full">
                          View Certification
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 mb-12">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xl font-bold">
                  2
                </div>
                <div className="ml-6 pt-3">
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Applied Machine Learning</CardTitle>
                      <CardDescription>Associate Level • 3 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Deepen your machine learning knowledge with practical applications and more advanced algorithms.
                      </p>
                      <div className="space-y-2 mb-4">
                \

"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import ProgramFilters from "@/components/programs/program-filters"
import AudienceSelector from "@/components/programs/audience-selector"
import ProgramSearch from "@/components/programs/program-search"
import { ArrowRight, ArrowRightLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchCourses } from "@/services/courseService"

// Empty State Component
function EmptyState({ message, description }) {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
                <svg
                    className="h-10 w-10 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>
            <h3 className="text-lg font-semibold">{message || "No courses found"}</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
                {description || "Try adjusting your filters or check back later for new programs."}
            </p>
        </div>
    )
}

// Loading State Component
function LoadingState() {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading programs...</p>
        </div>
    )
}

// Helper function to render program grid
function renderProgramGrid(programs, categoryName = "", isLoading = false) {
    if (isLoading) {
        return <LoadingState />
    }

    if (programs.length === 0) {
        return (
            <EmptyState
                message={categoryName ? `No ${categoryName} programs found` : "No programs found"}
                description="Try adjusting your filters or check back later for new programs."
            />
        )
    }

    return programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
    ))
}

export default function ProgramsPage() {
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                setIsLoading(true);
                const data = await fetchCourses();
                setFilteredCourses(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        loadCourses();
    }, []);

    const handleApplyFilters = (filters) => {
        const result = filteredCourses.filter((course) => {
            const matchesDuration =
                filters.duration.length === 0 ||
                filters.duration.some((dur) => {
                    const weeks = parseInt(course.duration)
                    if (dur === "short") return weeks >= 1 && weeks <= 4
                    if (dur === "medium") return weeks >= 5 && weeks <= 8
                    if (dur === "long") return weeks >= 9
                    return false
                })

            const matchesLevel =
                filters.level.length === 0 || filters.level.includes(course.level.toLowerCase())

            const matchesFormat =
                filters.format.length === 0 ||
                filters.format.some((f) => course.format.toLowerCase().includes(f))

            return matchesDuration && matchesLevel && matchesFormat
        })

        setFilteredCourses(result)
    }

    return (
        <div className="container py-12">
            <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-4xl font-bold tracking-tight">Training Programs</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Discover our comprehensive range of programs designed to build skills for Africa's digital future.
                </p>
            </div>

            <div className="mt-12">
                <Tabs defaultValue="all">
                    <div className="flex justify-center overflow-x-auto pb-4">
                        <TabsList className="flex flex-wrap gap-2 justify-center bg-transparent h-auto">
                            <TabsTrigger value="all" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-accent hover:bg-secondary/80 transition-all">
                                All Programs
                            </TabsTrigger>
                            <TabsTrigger value="artificial-intelligence" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-accent hover:bg-secondary/80 transition-all">
                                Artificial Intelligence
                            </TabsTrigger>
                            <TabsTrigger value="development" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-accent hover:bg-secondary/80 transition-all">
                                Development
                            </TabsTrigger>
                            <TabsTrigger value="digital-literacy" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-accent hover:bg-secondary/80 transition-all">
                                Digital Literacy
                            </TabsTrigger>
                            <TabsTrigger value="data-science" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-accent hover:bg-secondary/80 transition-all">
                                Data Science
                            </TabsTrigger>
                            <TabsTrigger value="entrepreneurship" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-accent hover:bg-secondary/80 transition-all">
                                Entrepreneurship
                            </TabsTrigger>
                            <TabsTrigger value="cybersecurity" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-accent hover:bg-secondary/80 transition-all">
                                Cybersecurity
                            </TabsTrigger>
                            <TabsTrigger value="civic-tech" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-accent hover:bg-secondary/80 transition-all">
                                Tech for Governance
                            </TabsTrigger>
                            <TabsTrigger value="design" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-accent hover:bg-secondary/80 transition-all">
                                Design
                            </TabsTrigger>
                            <TabsTrigger value="emerging-tech" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-accent hover:bg-secondary/80 transition-all">
                                Emerging Technology
                            </TabsTrigger>
                            <TabsTrigger value="digital-marketing" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-accent hover:bg-secondary/80 transition-all">
                                Digital Marketing
                            </TabsTrigger>
                            <TabsTrigger value="soft-skills" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-accent hover:bg-secondary/80 transition-all">
                                Soft Skills
                            </TabsTrigger>
                            <TabsTrigger value="iso-training" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-accent hover:bg-secondary/80 transition-all">
                                Specialized
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5 mt-8">
                        <div className="md:col-span-1">
                            <ProgramFilters onApply={handleApplyFilters} />
                        </div>

                        <div className="md:col-span-3 lg:col-span-4">
                            <TabsContent value="all" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {renderProgramGrid(filteredCourses, "", isLoading)}
                                </div>
                            </TabsContent>

                            <TabsContent value="artificial-intelligence" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {renderProgramGrid(
                                        filteredCourses.filter((program) => program.type === "artificial-intelligence"),
                                        "AI",
                                        isLoading
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="development" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {renderProgramGrid(
                                        filteredCourses.filter((program) => program.type === "development"),
                                        "development",
                                        isLoading
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="digital-literacy" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {renderProgramGrid(
                                        filteredCourses.filter((program) => program.type === "digital-literacy"),
                                        "digital literacy",
                                        isLoading
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="data-science" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {renderProgramGrid(
                                        filteredCourses.filter((program) => program.type === "data-science"),
                                        "data science",
                                        isLoading
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="entrepreneurship" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {renderProgramGrid(
                                        filteredCourses.filter((program) => program.type === "entrepreneurship"),
                                        "entrepreneurship",
                                        isLoading
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="cybersecurity" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {renderProgramGrid(
                                        filteredCourses.filter((program) => program.type === "cybersecurity"),
                                        "cybersecurity",
                                        isLoading
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="civic-tech" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {renderProgramGrid(
                                        filteredCourses.filter((program) => program.type === "civic-tech"),
                                        "civic tech",
                                        isLoading
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="design" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {renderProgramGrid(
                                        filteredCourses.filter((program) => program.type === "design"),
                                        "design",
                                        isLoading
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="emerging-tech" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {renderProgramGrid(
                                        filteredCourses.filter((program) => program.type === "emerging-tech"),
                                        "emerging technology",
                                        isLoading
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="digital-marketing" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {renderProgramGrid(
                                        filteredCourses.filter((program) => program.type === "digital-marketing"),
                                        "digital marketing",
                                        isLoading
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="soft-skills" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {renderProgramGrid(
                                        filteredCourses.filter((program) => program.type === "soft-skills"),
                                        "soft skills",
                                        isLoading
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="iso-training" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {renderProgramGrid(
                                        filteredCourses.filter((program) => program.type === "iso-training"),
                                        "specialized",
                                        isLoading
                                    )}
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
        <Card className="overflow-hidden flex flex-col h-full">
            <div className="aspect-video w-full overflow-hidden">
                <img
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    loading="lazy"
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
            <CardContent className="mt-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Target Audience:</p>
                        <p className="text-sm font-medium">{program.audience?.join(", ") || "All learners"}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button asChild className="flex-1">
                    <Link href={`/programs/${program.id}`} className="flex items-center justify-center gap-2">
                        View Details <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

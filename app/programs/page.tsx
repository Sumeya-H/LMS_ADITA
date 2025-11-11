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
import { programs } from "@/helpers/programs"

export default function ProgramsPage() {
    const [filteredCourses, setFilteredCourses] = useState(programs)

    const handleApplyFilters = (filters) => {
        const result = programs.filter((course) => {
            //const [min, max] = filters.priceRange
            //const price = Number(course.price.replace("$", ""))

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

            // const matchesPrice = price >= min && price <= max

            //return matchesDuration && matchesLevel && matchesFormat && matchesPrice
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

            {/* <div className="mx-auto mt-8 max-w-2xl">
        <ProgramSearch programs={programs} />
      </div> */}

            {/* <AudienceSelector /> */}

            <div className="mt-12">
                <Tabs defaultValue="all">
                    <div className="flex justify-center">
                        <TabsList className="mb-8">
                            <TabsTrigger value="all">All Programs</TabsTrigger>
                            <TabsTrigger value="artificial-intelligence">Artificial Intelligence</TabsTrigger>
                            <TabsTrigger value="development">Development</TabsTrigger>
                            <TabsTrigger value="digital-literacy">Digital Literacy</TabsTrigger>
                            <TabsTrigger value="data-science">Data Science</TabsTrigger>
                            <TabsTrigger value="entrepreneurship">Entrepreneurship</TabsTrigger>
                            <TabsTrigger value="cybersecurity">Cybersecurity</TabsTrigger>
                            <TabsTrigger value="civic-tech">Tech for Governance</TabsTrigger>
                            <TabsTrigger value="design">Design</TabsTrigger>
                            <TabsTrigger value="emerging-tech">Emerging Technology</TabsTrigger>
                            <TabsTrigger value="cyber-security">Cyber Security</TabsTrigger>
                            <TabsTrigger value="digital-marketing">Digital Marketing</TabsTrigger>
                            <TabsTrigger value="soft-skills">Soft Skills</TabsTrigger>
                            <TabsTrigger value="iso-training">Specialized</TabsTrigger>
                        </TabsList>
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
                            <ProgramFilters onApply={handleApplyFilters} />
                        </div>

                        <div className="md:col-span-3 lg:col-span-4">
                            <TabsContent value="all" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses.map((program) => (
                                        <ProgramCard key={program.id} program={program} />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="artificial-intelligence" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "artificial-intelligence")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="digital-literacy" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "digital-literacy")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="development" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "development")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="entrepreneurship" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "entrepreneurship")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="cybersecurity" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "cybersecurity")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="data-science" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "data-science")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="civic-tech" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "civic-tech")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="design" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "design")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="soft-skills" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "soft-skills")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="emerging-tech" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "emerging-tech")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="iso-training" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "iso-training")
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
                        <p className="text-sm font-medium">{program.audience.join(", ")}</p>
                    </div>
                    {/*program.price && (
                        <div className="text-right">
                            <p className="text-lg font-bold text-primary">{program.price}</p>
                            {program.pricePeriod && <p className="text-xs text-muted-foreground">{program.pricePeriod}</p>}
                        </div>
                    )*/}
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button asChild className="flex-1">
                    <Link href={`/programs/${program.id}`} className="flex items-center justify-center gap-2">
                        View Details <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
                {/*
                <Button variant="outline" size="icon" asChild title="Add to comparison">
                    <Link href={`/programs/compare?add=${program.id}`}>
                        <ArrowRightLeft className="h-4 w-4" />
                        <span className="sr-only">Compare</span>
                    </Link>
                </Button>*/}
            </CardFooter>
        </Card>
    )
}

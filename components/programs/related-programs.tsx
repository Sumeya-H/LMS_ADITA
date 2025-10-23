import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { programs } from "@/helpers/programs"

export default function RelatedPrograms({ currentProgramId }) {
    // In a real application, you would fetch related programs based on the current program
    // For this example, we'll use mock data
    const relatedPrograms = programs.filter((program) => program.type === currentProgramId)
    if (relatedPrograms.length === 1)
        return;
    return (
        <div>
            <h2 className="text-2xl font-bold">Related Programs</h2>
            <p className="mt-2 text-muted-foreground">
                Explore these complementary programs to further enhance your AI skills
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPrograms.map((program) => (
                    <Card key={program.id} className="overflow-hidden">
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

import { Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CourseCard({ course }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.summary}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{course.weekText}</span>
                    </div>
                    <div className="text-sm font-medium">{course.progress || 0}% Complete</div>
                </div>
                <Progress value={course.progress} className="mb-2" />
                <Button asChild className="mt-4 w-full">
                    <Link href={`/dashboard/courses/${course.id}`}>Continue</Link>
                </Button>
            </CardContent>
        </Card>
    )
}

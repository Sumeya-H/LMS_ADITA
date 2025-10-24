import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function CoursesPage() {
    const categories = [
        { id: "all", name: "All Courses" },
        { id: "fundamentals", name: "AI Fundamentals" },
        { id: "advanced", name: "Advanced AI" },
        { id: "specialized", name: "Specialized Tracks" },
        { id: "professional", name: "Professional Development" },
    ]

    const courses = [
        {
            id: 1,
            title: "Introduction to AI and Machine Learning",
            description: "A comprehensive introduction to AI concepts, algorithms, and applications.",
            category: "fundamentals",
            duration: "8 weeks",
            level: "Beginner",
            price: "$199",
            image: "/ai-learning.png",
        },
        {
            id: 2,
            title: "Deep Learning Specialization",
            description: "Master neural networks and deep learning techniques for complex AI applications.",
            category: "advanced",
            duration: "12 weeks",
            level: "Advanced",
            price: "$349",
            image: "/ai-learning.png",
        },
        {
            id: 3,
            title: "AI for Healthcare Professionals",
            description: "Learn how AI is transforming diagnostics, patient care, and healthcare management.",
            category: "specialized",
            duration: "6 weeks",
            level: "Intermediate",
            price: "$249",
            image: "/ai-learning.png",
        },
        {
            id: 4,
            title: "AI in Financial Services",
            description: "Implement AI solutions for risk assessment, fraud detection, and customer service in banking.",
            category: "specialized",
            duration: "8 weeks",
            level: "Intermediate",
            price: "$299",
            image: "/ai-learning.png",
        },
        {
            id: 5,
            title: "AI Strategy for Business Leaders",
            description: "Strategic frameworks for implementing AI in business operations and digital transformation.",
            category: "professional",
            duration: "4 weeks",
            level: "Executive",
            price: "$399",
            image: "/ai-learning.png",
        },
        {
            id: 6,
            title: "Natural Language Processing",
            description: "Build AI systems that understand, interpret, and generate human language.",
            category: "advanced",
            duration: "10 weeks",
            level: "Advanced",
            price: "$329",
            image: "/ai-learning.png",
        },
        {
            id: 7,
            title: "AI for Agricultural Innovation",
            description: "Apply AI techniques to improve crop yields, resource management, and sustainable farming.",
            category: "specialized",
            duration: "6 weeks",
            level: "Intermediate",
            price: "$249",
            image: "/ai-learning.png",
        },
        {
            id: 8,
            title: "Data Science Fundamentals",
            description: "Essential skills in data analysis, visualization, and statistical methods for AI applications.",
            category: "fundamentals",
            duration: "8 weeks",
            level: "Beginner",
            price: "$199",
            image: "/ai-learning.png",
        },
    ]

    return (
        <div className="container py-12">
            <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-4xl font-bold tracking-tight">AI Courses & Training Programs</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Discover our comprehensive range of AI courses designed to build skills for Africa's digital future.
                </p>
            </div>

            <Tabs defaultValue="all" className="mt-12">
                <div className="flex justify-center">
                    <TabsList className="mb-8">
                        {categories.map((category) => (
                            <TabsTrigger key={category.id} value={category.id}>
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {categories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="mt-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {courses
                                .filter((course) => category.id === "all" || course.category === category.id)
                                .map((course) => (
                                    <Card key={course.id} className="overflow-hidden">
                                        <div className="aspect-video w-full overflow-hidden">
                                            <img
                                                src={course.image || "/placeholder.svg"}
                                                alt={course.title}
                                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                        <CardHeader>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="outline">{course.level}</Badge>
                                                <Badge variant="outline">{course.duration}</Badge>
                                            </div>
                                            <CardTitle className="mt-2">{course.title}</CardTitle>
                                            <CardDescription>{course.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-2xl font-bold text-primary">{course.price}</p>
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            <Button asChild variant="outline">
                                                <Link href={`/courses/${course.id}`}>Learn More</Link>
                                            </Button>
                                            <Button asChild>
                                                <Link href={`/courses/${course.id}`}>View Course</Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

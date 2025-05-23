import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Clock, Calendar, Users, BookOpen, Award } from "lucide-react"
import Link from "next/link"

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  // In a real application, you would fetch this data from an API
  const course = {
    id: Number.parseInt(params.courseId),
    title: "Introduction to AI and Machine Learning",
    description:
      "A comprehensive introduction to AI concepts, algorithms, and applications designed specifically for the African context. This course bridges theoretical foundations with practical applications relevant to local challenges and opportunities.",
    longDescription:
      "This course provides a solid foundation in artificial intelligence and machine learning concepts, tailored specifically for the African context. You'll learn the fundamentals of AI, including machine learning algorithms, neural networks, and data analysis techniques. The course emphasizes practical applications relevant to African challenges and opportunities, with case studies from healthcare, agriculture, finance, and education sectors across the continent.",
    category: "fundamentals",
    duration: "8 weeks",
    level: "Beginner",
    price: "$199",
    startDate: "June 15, 2023",
    enrollmentDeadline: "June 10, 2023",
    maxStudents: 50,
    language: "English (with French and Swahili subtitles)",
    certification: "ADITA AI Fundamentals Certificate",
    prerequisites: "Basic computer skills and high school mathematics",
    image: "/ai-learning.png",
    objectives: [
      "Understand core AI and machine learning concepts",
      "Develop practical skills in data preparation and analysis",
      "Build and evaluate simple machine learning models",
      "Apply AI techniques to solve real-world problems in an African context",
      "Understand ethical considerations in AI development and deployment",
    ],
    curriculum: [
      {
        week: 1,
        title: "Introduction to AI and Its Applications in Africa",
        topics: [
          "What is AI?",
          "History and evolution of AI",
          "Current AI landscape in Africa",
          "Opportunities and challenges",
        ],
      },
      {
        week: 2,
        title: "Data Fundamentals",
        topics: ["Types of data", "Data collection methods", "Data preparation", "Exploratory data analysis"],
      },
      {
        week: 3,
        title: "Introduction to Machine Learning",
        topics: [
          "Supervised vs. unsupervised learning",
          "Common algorithms",
          "Model evaluation",
          "Practical applications",
        ],
      },
      {
        week: 4,
        title: "Neural Networks Basics",
        topics: ["Perceptrons", "Activation functions", "Backpropagation", "Simple neural networks"],
      },
      {
        week: 5,
        title: "Practical Applications in Healthcare",
        topics: [
          "Disease prediction",
          "Medical imaging analysis",
          "Healthcare resource optimization",
          "Case studies from African hospitals",
        ],
      },
      {
        week: 6,
        title: "Practical Applications in Agriculture",
        topics: ["Crop yield prediction", "Pest detection", "Resource management", "Case studies from African farms"],
      },
      {
        week: 7,
        title: "Ethics and Responsible AI",
        topics: ["Bias and fairness", "Privacy considerations", "Transparency", "AI governance in African context"],
      },
      {
        week: 8,
        title: "Final Project and Future Directions",
        topics: [
          "Project presentations",
          "Emerging AI trends",
          "Continuing education paths",
          "AI career opportunities in Africa",
        ],
      },
    ],
    instructors: [
      {
        name: "Dr. Amara Okafor",
        role: "Lead Instructor",
        bio: "PhD in Computer Science with 10+ years of experience in AI research and education across East Africa.",
        image: "/placeholder-b22lb.png",
      },
      {
        name: "Prof. Emmanuel Mensah",
        role: "Guest Lecturer",
        bio: "Leading researcher in AI applications for healthcare with extensive work in West African medical institutions.",
        image: "/placeholder.svg?height=100&width=100&query=african%20male%20professor",
      },
    ],
    reviews: {
      average: 4.8,
      count: 124,
      distribution: [
        { stars: 5, percentage: 85 },
        { stars: 4, percentage: 10 },
        { stars: 3, percentage: 3 },
        { stars: 2, percentage: 1 },
        { stars: 1, percentage: 1 },
      ],
    },
    faqs: [
      {
        question: "Do I need programming experience for this course?",
        answer:
          "No prior programming experience is required. We'll teach you the basics of Python as part of the course.",
      },
      {
        question: "What kind of computer do I need?",
        answer:
          "Any computer with internet access will work. For the practical exercises, we provide cloud-based environments.",
      },
      {
        question: "Is financial aid available?",
        answer:
          "Yes, we offer scholarships and payment plans. Please visit our Financial Aid page for more information.",
      },
      {
        question: "Will I get job placement assistance?",
        answer:
          "We provide career guidance and connect top performers with our industry partners for internship and job opportunities.",
      },
    ],
  }

  return (
    <div className="container py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">{course.level}</Badge>
              <Badge variant="outline">{course.duration}</Badge>
              <Badge variant="outline">{course.language}</Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="h-full w-full object-cover" />
            </div>
            <p className="mb-6">{course.longDescription}</p>

            <h2 className="text-2xl font-bold mb-4">Learning Objectives</h2>
            <ul className="grid gap-3 mb-8">
              {course.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          <Tabs defaultValue="curriculum">
            <TabsList className="mb-6">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructors">Instructors</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum">
              <div className="space-y-6">
                {course.curriculum.map((week) => (
                  <Card key={week.week}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">
                          Week {week.week}: {week.title}
                        </h3>
                      </div>
                      <ul className="grid gap-2">
                        {week.topics.map((topic, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="instructors">
              <div className="grid gap-8 md:grid-cols-2">
                {course.instructors.map((instructor) => (
                  <Card key={instructor.name}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={instructor.image || "/placeholder.svg"} alt={instructor.name} />
                          <AvatarFallback>
                            {instructor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-semibold">{instructor.name}</h3>
                          <p className="text-sm text-muted-foreground">{instructor.role}</p>
                        </div>
                      </div>
                      <p>{instructor.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl font-bold">{course.reviews.average}</div>
                  <div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < Math.round(course.reviews.average) ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Based on {course.reviews.count} reviews</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {course.reviews.distribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-2">
                      <div className="w-12 text-sm">{item.stars} stars</div>
                      <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${item.percentage}%` }}></div>
                      </div>
                      <div className="w-12 text-sm text-right">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="faqs">
              <div className="space-y-6">
                {course.faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardContent className="p-6">
                <p className="text-3xl font-bold mb-6">{course.price}</p>

                <Button asChild className="w-full mb-4">
                  <Link href={`/courses/${course.id}/enroll`}>Enroll Now</Link>
                </Button>

                <div className="space-y-4 mt-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{course.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Start Date</p>
                      <p className="text-sm text-muted-foreground">{course.startDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Class Size</p>
                      <p className="text-sm text-muted-foreground">Maximum {course.maxStudents} students</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Prerequisites</p>
                      <p className="text-sm text-muted-foreground">{course.prerequisites}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Certification</p>
                      <p className="text-sm text-muted-foreground">{course.certification}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

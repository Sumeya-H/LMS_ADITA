import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Clock,
  Calendar,
  Award,
  Briefcase,
  Download,
  Users,
  BookOpen,
  GraduationCap,
  Star,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Certification Details | Africa Digital Innovation Academy",
  description: "Detailed information about certifications offered by the Africa Digital Innovation Academy.",
}

export default function CertificationDetailPage({ params }: { params: { certificationId: string } }) {
  const certification = certifications.find((cert) => cert.id === params.certificationId)

  if (!certification) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link href="/certifications" className="hover:underline">
                Certifications
              </Link>
              <span>/</span>
              <span>{certification.title}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{certification.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant="outline" className="text-sm py-1 px-3">
                {certification.level}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" /> {certification.duration}
              </span>
              <span className="text-sm text-muted-foreground flex items-center">
                <Users className="h-4 w-4 mr-1" /> {certification.students} students
              </span>
              <span className="text-sm text-muted-foreground flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" /> {certification.rating} ({certification.reviews}{" "}
                reviews)
              </span>
            </div>

            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
              <Image
                src={certification.image || "/placeholder.svg"}
                alt={certification.title}
                fill
                className="object-cover"
              />
            </div>

            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="exams">Exams</TabsTrigger>
                <TabsTrigger value="careers">Careers</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">About This Certification</h2>
                    <p className="text-muted-foreground">{certification.fullDescription}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {certification.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Skills You'll Gain</h3>
                    <div className="flex flex-wrap gap-2">
                      {certification.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-6">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-3">Certification Curriculum</h2>
                  <p className="text-muted-foreground mb-6">
                    Our comprehensive curriculum is designed to build your skills progressively, with a focus on
                    practical applications and industry-relevant knowledge.
                  </p>

                  <Accordion type="single" collapsible className="w-full">
                    {certification.curriculum.map((module, index) => (
                      <AccordionItem key={index} value={`module-${index}`}>
                        <AccordionTrigger className="text-lg font-medium">
                          Module {index + 1}: {module.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-4 pt-2 space-y-4">
                            <p className="text-muted-foreground">{module.description}</p>
                            <h4 className="font-medium">Topics Covered:</h4>
                            <ul className="space-y-2">
                              {module.topics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="flex items-start">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>

              <TabsContent value="requirements" className="mt-6">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-3">Certification Requirements</h2>
                  <p className="text-muted-foreground mb-6">
                    To earn this certification, you'll need to meet the following requirements:
                  </p>

                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                        Prerequisites
                      </h3>
                      <ul className="space-y-2 pl-7 list-disc text-muted-foreground">
                        {certification.prerequisites.map((prereq, index) => (
                          <li key={index}>{prereq}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2 text-purple-600" />
                        Completion Requirements
                      </h3>
                      <ul className="space-y-2 pl-7 list-disc text-muted-foreground">
                        {certification.completionRequirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                        Recertification
                      </h3>
                      <p className="text-muted-foreground">{certification.recertification}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="exams" className="mt-6">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-3">Certification Exams</h2>
                  <p className="text-muted-foreground mb-6">
                    This certification requires successful completion of the following exams:
                  </p>

                  {certification.exams.map((exam, index) => (
                    <Card key={index} className="mb-4">
                      <CardHeader>
                        <CardTitle>{exam.title}</CardTitle>
                        <CardDescription>
                          <div className="flex flex-wrap items-center gap-3 mt-1">
                            <span className="text-sm flex items-center">
                              <Clock className="h-4 w-4 mr-1" /> {exam.duration}
                            </span>
                            <span className="text-sm flex items-center">
                              <Award className="h-4 w-4 mr-1" /> {exam.passingScore}% to pass
                            </span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{exam.description}</p>
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Exam Format:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {exam.format.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Topic Distribution:</h4>
                          <div className="space-y-3">
                            {exam.topics.map((topic, i) => (
                              <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>{topic.name}</span>
                                  <span>{topic.percentage}%</span>
                                </div>
                                <Progress value={topic.percentage} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Exam Preparation Resources</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      {certification.examResources.map((resource, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>{resource}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="careers" className="mt-6">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-3">Career Opportunities</h2>
                  <p className="text-muted-foreground mb-6">
                    This certification prepares you for the following career paths and opportunities:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certification.careers.map((career, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{career.title}</CardTitle>
                          <CardDescription>
                            <Badge variant="outline">{career.avgSalary}</Badge>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                          <div className="text-sm">
                            <h4 className="font-medium mb-1">Key Responsibilities:</h4>
                            <ul className="text-muted-foreground space-y-1">
                              {career.responsibilities.map((resp, i) => (
                                <li key={i} className="flex items-start">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-950/30 dark:to-blue-950/30 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">Industry Demand</h3>
                    <p className="text-muted-foreground mb-4">{certification.industryDemand}</p>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">{certification.jobGrowth} job growth projected</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="border-t pt-8">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {certification.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="sticky top-24">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Certification Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold">{certification.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{certification.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Level</span>
                  <Badge variant="outline">{certification.level}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Format</span>
                  <span>{certification.format}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Language</span>
                  <span>{certification.language}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Validity</span>
                  <span>{certification.validity}</span>
                </div>

                <div className="pt-4">
                  <Button className="w-full mb-3">Enroll Now</Button>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Syllabus
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {certification.relatedCertifications.map((related, index) => (
                  <Link href={`/certifications/${related.id}`} key={index}>
                    <div className="flex items-start hover:bg-muted p-2 rounded-md transition-colors">
                      <div className="relative h-12 w-12 rounded overflow-hidden mr-3">
                        <Image
                          src={related.image || "/placeholder.svg"}
                          alt={related.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{related.title}</h4>
                        <p className="text-xs text-muted-foreground">{related.level}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Certification data
const certifications = [
  {
    id: "ai-ml-foundation",
    title: "AI & Machine Learning Foundation",
    level: "Foundation",
    duration: "2 months",
    image: "/ai-ml-certification.png",
    description: "Build a solid foundation in AI and machine learning concepts, algorithms, and applications.",
    fullDescription:
      "The AI & Machine Learning Foundation certification provides a comprehensive introduction to the field of artificial intelligence and machine learning. This certification is designed for individuals with little to no prior experience in AI and ML, and aims to build a solid foundation of knowledge and skills that can be applied across various industries. Through a combination of theoretical learning and hands-on projects, you'll gain an understanding of core AI concepts, machine learning algorithms, and practical applications that are transforming businesses and societies across Africa.",
    popular: true,
    students: "2,450",
    rating: "4.8",
    reviews: "320",
    price: "$499",
    format: "Online + Practical Projects",
    language: "English, French, Swahili",
    validity: "3 years",
    learningOutcomes: [
      "Understand fundamental AI and machine learning concepts and terminology",
      "Implement basic machine learning algorithms using Python",
      "Prepare and preprocess data for machine learning applications",
      "Evaluate and improve machine learning models",
      "Apply machine learning techniques to solve real-world problems",
      "Understand ethical considerations in AI development and deployment",
      "Develop a portfolio of AI projects demonstrating your skills",
    ],
    skills: [
      "Python Programming",
      "Data Analysis",
      "Machine Learning",
      "Neural Networks",
      "Data Preprocessing",
      "Model Evaluation",
      "AI Ethics",
      "Problem Solving",
    ],
    curriculum: [
      {
        title: "Introduction to AI and Machine Learning",
        description:
          "This module introduces the fundamental concepts of artificial intelligence and machine learning, providing a historical context and overview of current applications.",
        topics: [
          "History and evolution of AI",
          "Types of machine learning: supervised, unsupervised, and reinforcement learning",
          "AI applications across industries in Africa",
          "Setting up your development environment",
          "Introduction to Python for AI and ML",
        ],
      },
      {
        title: "Data Preprocessing and Exploration",
        description:
          "Learn how to prepare and explore data for machine learning applications, a critical step in the ML pipeline.",
        topics: [
          "Data collection and importation",
          "Data cleaning and handling missing values",
          "Feature selection and engineering",
          "Data normalization and standardization",
          "Exploratory data analysis and visualization",
        ],
      },
      {
        title: "Supervised Learning Algorithms",
        description:
          "Explore common supervised learning algorithms and their applications in solving real-world problems.",
        topics: [
          "Linear and logistic regression",
          "Decision trees and random forests",
          "Support vector machines",
          "K-nearest neighbors",
          "Model evaluation metrics and techniques",
        ],
      },
      {
        title: "Unsupervised Learning",
        description: "Discover techniques for finding patterns and structures in unlabeled data.",
        topics: [
          "Clustering algorithms (K-means, hierarchical clustering)",
          "Dimensionality reduction techniques (PCA)",
          "Association rule learning",
          "Anomaly detection",
          "Applications of unsupervised learning in African contexts",
        ],
      },
      {
        title: "Introduction to Neural Networks",
        description:
          "Learn the basics of neural networks and deep learning, the technologies behind many modern AI applications.",
        topics: [
          "Fundamentals of neural networks",
          "Activation functions and backpropagation",
          "Building simple neural networks",
          "Introduction to deep learning frameworks",
          "Transfer learning and pre-trained models",
        ],
      },
      {
        title: "Practical Applications and Ethics",
        description:
          "Apply your knowledge to real-world problems while considering ethical implications of AI systems.",
        topics: [
          "End-to-end machine learning project workflow",
          "Deploying machine learning models",
          "AI ethics and responsible AI development",
          "Bias and fairness in machine learning",
          "AI policy and governance in African contexts",
        ],
      },
    ],
    prerequisites: [
      "Basic programming knowledge (any language)",
      "High school level mathematics (algebra and statistics)",
      "Access to a computer with internet connection",
      "No prior AI or machine learning experience required",
    ],
    completionRequirements: [
      "Complete all six modules with a minimum score of 70% on each module assessment",
      "Successfully complete the hands-on projects for each module",
      "Pass the final certification exam with a minimum score of 75%",
      "Submit and present a capstone project applying AI/ML to a real-world problem",
    ],
    recertification:
      "This certification is valid for 3 years. To recertify, you must complete 20 hours of continuing education and pass a recertification exam, or upgrade to a higher-level certification.",
    exams: [
      {
        title: "AI & Machine Learning Foundation Certification Exam",
        duration: "2 hours",
        passingScore: 75,
        description:
          "This comprehensive exam tests your understanding of AI and machine learning fundamentals, data preprocessing, supervised and unsupervised learning algorithms, neural networks, and ethical considerations.",
        format: ["Multiple choice questions (60%)", "Short answer questions (20%)", "Practical coding exercises (20%)"],
        topics: [
          { name: "AI and ML Fundamentals", percentage: 20 },
          { name: "Data Preprocessing", percentage: 15 },
          { name: "Supervised Learning", percentage: 25 },
          { name: "Unsupervised Learning", percentage: 15 },
          { name: "Neural Networks", percentage: 15 },
          { name: "Ethics and Applications", percentage: 10 },
        ],
      },
    ],
    examResources: [
      "Comprehensive study guide provided upon enrollment",
      "Practice exams with detailed explanations",
      "Online forum for exam-specific questions",
      "Virtual study groups with peers",
      "One-on-one tutoring sessions (available at additional cost)",
    ],
    careers: [
      {
        title: "Junior Data Analyst",
        avgSalary: "$30,000 - $45,000",
        description: "Analyze and interpret complex data sets to inform business decisions using AI and ML techniques.",
        responsibilities: [
          "Collect and preprocess data from various sources",
          "Perform exploratory data analysis",
          "Create visualizations to communicate insights",
          "Assist in building and evaluating machine learning models",
          "Prepare reports and presentations for stakeholders",
        ],
      },
      {
        title: "AI Research Assistant",
        avgSalary: "$35,000 - $50,000",
        description: "Support research teams in developing and testing new AI algorithms and applications.",
        responsibilities: [
          "Assist in designing and implementing experiments",
          "Collect and analyze experimental data",
          "Help develop and test AI models",
          "Document research findings and methodologies",
          "Contribute to research papers and presentations",
        ],
      },
      {
        title: "Machine Learning Support Specialist",
        avgSalary: "$40,000 - $55,000",
        description: "Provide technical support for machine learning systems and applications.",
        responsibilities: [
          "Monitor performance of deployed ML models",
          "Troubleshoot issues with AI applications",
          "Assist in model updates and improvements",
          "Document system behaviors and changes",
          "Provide technical support to end users",
        ],
      },
    ],
    industryDemand:
      "The demand for AI and machine learning professionals in Africa is growing rapidly, with organizations across sectors seeking talent to drive digital transformation and innovation. Entry-level positions are increasingly available as more companies begin their AI journey.",
    jobGrowth: "35% annual",
    faqs: [
      {
        question: "Do I need programming experience for this certification?",
        answer:
          "While some basic programming knowledge is helpful, this foundation certification is designed to be accessible to beginners. We provide introductory Python lessons to help you get started.",
      },
      {
        question: "How much time should I dedicate to this certification weekly?",
        answer:
          "We recommend dedicating 8-10 hours per week to complete the certification within the 2-month timeframe. This includes watching lectures, completing exercises, and working on projects.",
      },
      {
        question: "Is this certification recognized by employers?",
        answer:
          "Yes, ADITA certifications are recognized by over 200 companies across Africa and globally. Our foundation certification is particularly valued for entry-level positions in data analysis and AI support roles.",
      },
      {
        question: "What kind of support will I receive during the certification process?",
        answer:
          "You'll have access to instructor support through forums and weekly office hours, a peer community for collaborative learning, and technical support for any platform issues.",
      },
      {
        question: "Can I pay for the certification in installments?",
        answer:
          "Yes, we offer flexible payment plans that allow you to pay in 2-3 installments. We also offer scholarships for qualified candidates from underrepresented groups in tech.",
      },
    ],
    relatedCertifications: [
      {
        id: "data-science-professional",
        title: "Data Science Professional",
        level: "Professional",
        image: "/placeholder.svg?height=100&width=100&query=Data Science certification",
      },
      {
        id: "ai-ethics-governance",
        title: "AI Ethics & Governance",
        level: "Associate",
        image: "/placeholder.svg?height=100&width=100&query=AI Ethics certification",
      },
      {
        id: "python-for-ai",
        title: "Python for AI Development",
        level: "Foundation",
        image: "/placeholder.svg?height=100&width=100&query=Python for AI certification",
      },
    ],
  },
  // Additional certification data would be defined here
]

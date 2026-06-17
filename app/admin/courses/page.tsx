"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Edit, Trash2, RefreshCw, Plus, Eye } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface Course {
    reg_id: string
    id: string
    title: string
    description: string
    longDescription: string
    type: string
    duration: string
    level: string
    format: string
    audience: string[]
    price: string
    startDates: string[]
    modules: any[]
    outcomes: any[]
    requirements: any[]
    certification: string
    image: string | null
    status: string | null
    moodle_course_id?: number
    is_synced_to_moodle?: boolean
    is_registration_open?: boolean
    created_at?: string
}

export default function CoursesListPage() {
    const router = useRouter()
    const [courses, setCourses] = useState<Course[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const fetchCourses = async () => {
        setIsLoading(true)
        setError("")

        try {
            const token = localStorage.getItem("access")
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error("Failed to fetch courses")
            }

            const data = await response.json()
            setCourses(data)
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    const handleDeleteCourse = async () => {
        if (!selectedCourse) return

        setDeleting(true)
        try {
            const token = localStorage.getItem("access")
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/manage/${selectedCourse.reg_id}/delete/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error("Failed to delete course")
            }

            setIsDeleteDialogOpen(false)
            fetchCourses()
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setDeleting(false)
        }
    }

    const getLevelBadgeColor = (level: string) => {
        switch (level?.toLowerCase()) {
            case "beginner":
                return "bg-green-100 text-green-800"
            case "intermediate":
                return "bg-yellow-100 text-yellow-800"
            case "advanced":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const formatPrice = (price: string) => {
        if (!price) return "Free"
        // Remove $ sign and parse
        const numericPrice = parseFloat(price.replace('$', ''))
        if (isNaN(numericPrice) || numericPrice === 0) return "Free"
        return price
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Course Management</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage all courses and assign instructors
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={() => router.push("/admin/courses/create")}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Course
                        </Button>
                        <Button onClick={fetchCourses} variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                    </div>
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>All Courses</CardTitle>
                        <CardDescription>
                            Total {courses.length} courses found
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead>Format</TableHead>
                                    <TableHead>Audience</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Moodle Sync</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center py-8">
                                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                <Plus className="h-12 w-12 mb-3 opacity-50" />
                                                <p>No courses found</p>
                                                <Button
                                                    variant="link"
                                                    className="mt-2"
                                                    onClick={() => router.push("/admin/courses/create")}
                                                >
                                                    Click here to create your first course
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    courses.map((course) => (
                                        <TableRow key={course.reg_id}>
                                            <TableCell className="font-medium">
                                                {course.title}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {course.type?.replace(/-/g, ' ') || 'N/A'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{course.duration || 'N/A'}</TableCell>
                                            <TableCell>
                                                <Badge className={getLevelBadgeColor(course.level)}>
                                                    {course.level || 'N/A'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {course.format || 'N/A'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {course.audience?.slice(0, 2).map((item, idx) => (
                                                        <span key={idx} className="text-xs bg-gray-100 px-1 rounded">
                                                            {item}
                                                        </span>
                                                    ))}
                                                    {course.audience && course.audience.length > 2 && (
                                                        <span className="text-xs text-muted-foreground">
                                                            +{course.audience.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {formatPrice(course.price)}
                                            </TableCell>
                                            <TableCell>
                                                {course.moodle_course_id ? (
                                                    <Badge variant="default" className="bg-green-100 text-green-800">
                                                        Synced
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary">
                                                        Not Synced
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => router.push(`/admin/courses/${course.id}`)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => router.push(`/admin/courses/edit/${course.id}`)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => {
                                                            setSelectedCourse(course)
                                                            setIsDeleteDialogOpen(true)
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Delete Confirmation Dialog */}
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete "{selectedCourse?.title}"?
                                This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteCourse} disabled={deleting}>
                                {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Delete Course
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

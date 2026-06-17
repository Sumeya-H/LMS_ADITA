"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2, Plus, X, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { fetchAllStaff } from "@/services/authService"
import { getCourseById, updateCourse } from "@/services/courseService"

interface Instructor {
    id: string
    email: string
    first_name: string
    last_name: string
    role: string
}

interface Course {
    id: string
    title: string
    description: string
    long_description: string
    duration: string
    level: string
    format: string
    price: string
    category: string
    audience: string[]
    outcomes: string[]
    requirements: string[]
    certification: string
    start_dates: string[]
    instructor_ids: string[]
    image_url?: string
}

export default function EditCoursePage() {
    const router = useRouter()
    const params = useParams()
    const courseId = params.courseId as string

    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [instructors, setInstructors] = useState<Instructor[]>([])
    const [loadingInstructors, setLoadingInstructors] = useState(true)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [currentImage, setCurrentImage] = useState<string>("")

    const [courseData, setCourseData] = useState<Course>({
        id: "",
        title: "",
        description: "",
        long_description: "",
        duration: "",
        level: "",
        format: "",
        price: "",
        category: "",
        audience: [],
        outcomes: [],
        requirements: [],
        certification: "",
        start_dates: [],
        instructor_ids: []
    })

    // Temporary input states for arrays
    const [newAudience, setNewAudience] = useState("")
    const [newOutcome, setNewOutcome] = useState("")
    const [newRequirement, setNewRequirement] = useState("")
    const [newStartDate, setNewStartDate] = useState("")

    useEffect(() => {
        fetchCourseData()
        fetchInstructors()
    }, [courseId])

    const fetchCourseData = async () => {
        try {
            const data = await getCourseById(courseId)
            setCourseData({
                id: data.id,
                title: data.title || "",
                description: data.description || "",
                long_description: data.long_description || "",
                duration: data.duration || "",
                level: data.level || "",
                format: data.format || "",
                price: data.price || "",
                category: data.category || "",
                audience: data.audience || [],
                outcomes: data.outcomes || [],
                requirements: data.requirements || [],
                certification: data.certification || "",
                start_dates: data.start_dates || [],
                instructor_ids: data.instructor_ids || []
            })
            if (data.image_url) {
                setCurrentImage(data.image_url)
            }
        } catch (err: any) {
            console.error("Error fetching course:", err)
            setError("Failed to load course data")
        } finally {
            setIsFetching(false)
        }
    }

    const fetchInstructors = async () => {
        try {
            const data = await fetchAllStaff()
            const instructorsOnly = data.filter((staff: any) => staff.role === "instructor")
            setInstructors(instructorsOnly)
        } catch (err: any) {
            console.error("Error fetching instructors:", err)
            setError("Failed to load instructors")
        } finally {
            setLoadingInstructors(false)
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddInstructor = (instructorId: string) => {
        if (!courseData.instructor_ids.includes(instructorId)) {
            setCourseData({
                ...courseData,
                instructor_ids: [...courseData.instructor_ids, instructorId]
            })
        }
    }

    const handleRemoveInstructor = (instructorId: string) => {
        setCourseData({
            ...courseData,
            instructor_ids: courseData.instructor_ids.filter(id => id !== instructorId)
        })
    }

    const handleAddArrayItem = (field: keyof Course, value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
        if (value.trim()) {
            setCourseData({
                ...courseData,
                [field]: [...(courseData[field] as string[]), value.trim()]
            })
            setter("")
        }
    }

    const handleRemoveArrayItem = (field: keyof Course, index: number) => {
        setCourseData({
            ...courseData,
            [field]: (courseData[field] as string[]).filter((_, i) => i !== index)
        })
    }

    const getInstructorName = (id: string) => {
        const instructor = instructors.find(inst => inst.id === id)
        if (instructor) {
            return `${instructor.first_name} ${instructor.last_name}`.trim() || instructor.email
        }
        return id
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccess("")

        // Validation
        if (!courseData.title.trim()) {
            setError("Course title is required")
            setIsLoading(false)
            return
        }

        if (!courseData.description.trim()) {
            setError("Course description is required")
            setIsLoading(false)
            return
        }

        if (!courseData.duration.trim()) {
            setError("Course duration is required")
            setIsLoading(false)
            return
        }

        if (!courseData.level) {
            setError("Course level is required")
            setIsLoading(false)
            return
        }

        if (!courseData.format) {
            setError("Course format is required")
            setIsLoading(false)
            return
        }

        if (!courseData.category) {
            setError("Course category is required")
            setIsLoading(false)
            return
        }

        if (courseData.instructor_ids.length === 0) {
            setError("At least one instructor must be assigned")
            setIsLoading(false)
            return
        }

        try {
            // Create FormData for multipart/form-data
            const formData = new FormData()
            formData.append("title", courseData.title)
            formData.append("description", courseData.description)
            formData.append("long_description", courseData.long_description)
            formData.append("duration", courseData.duration)
            formData.append("level", courseData.level)
            formData.append("format", courseData.format)
            formData.append("price", courseData.price || "0")
            formData.append("category", courseData.category)
            formData.append("certification", courseData.certification)

            // Add arrays
            formData.append("audience", JSON.stringify(courseData.audience))
            formData.append("outcomes", JSON.stringify(courseData.outcomes))
            formData.append("requirements", JSON.stringify(courseData.requirements))
            formData.append("start_dates", JSON.stringify(courseData.start_dates))
            formData.append("instructor_ids", JSON.stringify(courseData.instructor_ids))

            // Add image if selected
            if (imageFile) {
                formData.append("image", imageFile)
            }

            await updateCourse(courseId, formData)

            setSuccess("Course updated successfully and synced to Moodle!")

            setTimeout(() => {
                router.push("/admin/courses")
            }, 2000)

        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const courseLevels = [
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "advanced", label: "Advanced" },
        { value: "all-levels", label: "All Levels" }
    ]

    const courseFormats = [
        { value: "online", label: "Online" },
        { value: "in-person", label: "In-Person" },
        { value: "hybrid", label: "Hybrid" },
        { value: "self-paced", label: "Self-Paced" }
    ]

    const courseCategories = [
        { value: "artificial-intelligence", label: "Artificial Intelligence" },
        { value: "development", label: "Development" },
        { value: "digital-literacy", label: "Digital Literacy" },
        { value: "data-science", label: "Data Science" },
        { value: "entrepreneurship", label: "Entrepreneurship" },
        { value: "cybersecurity", label: "Cybersecurity" },
        { value: "civic-tech", label: "Tech for Governance" },
        { value: "design", label: "Design" },
        { value: "emerging-tech", label: "Emerging Technology" },
        { value: "digital-marketing", label: "Digital Marketing" },
        { value: "soft-skills", label: "Soft Skills" },
        { value: "iso-training", label: "Specialized" }
    ]

    if (isFetching) {
        return (
            <div className="container mx-auto py-8 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardContent className="py-12">
                            <div className="flex justify-center items-center">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Edit Course</h1>
                    <p className="text-muted-foreground mt-2">
                        Update course information. Changes will be synced to Moodle automatically.
                    </p>
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {success && (
                    <Alert className="mb-6 border-green-500 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertDescription>{success}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Information</CardTitle>
                            <CardDescription>
                                Update the details for the course. All fields marked with * are required.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Basic Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Course Title *</Label>
                                        <Input
                                            id="title"
                                            placeholder="e.g., Advanced Python Programming"
                                            value={courseData.title}
                                            onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                                            disabled={isLoading}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category *</Label>
                                        <Select
                                            value={courseData.category}
                                            onValueChange={(value) => setCourseData({ ...courseData, category: value })}
                                            disabled={isLoading}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {courseCategories.map((cat) => (
                                                    <SelectItem key={cat.value} value={cat.value}>
                                                        {cat.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Short Description *</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Brief description of the course..."
                                        rows={3}
                                        value={courseData.description}
                                        onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="long_description">Long Description</Label>
                                    <Textarea
                                        id="long_description"
                                        placeholder="Detailed description of the course, curriculum, and expectations..."
                                        rows={5}
                                        value={courseData.long_description}
                                        onChange={(e) => setCourseData({ ...courseData, long_description: e.target.value })}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Course Details */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Course Details</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="duration">Duration *</Label>
                                        <Input
                                            id="duration"
                                            placeholder="e.g., 8 weeks, 3 months"
                                            value={courseData.duration}
                                            onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                                            disabled={isLoading}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="level">Level *</Label>
                                        <Select
                                            value={courseData.level}
                                            onValueChange={(value) => setCourseData({ ...courseData, level: value })}
                                            disabled={isLoading}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {courseLevels.map((level) => (
                                                    <SelectItem key={level.value} value={level.value}>
                                                        {level.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="format">Format *</Label>
                                        <Select
                                            value={courseData.format}
                                            onValueChange={(value) => setCourseData({ ...courseData, format: value })}
                                            disabled={isLoading}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select format" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {courseFormats.map((format) => (
                                                    <SelectItem key={format.value} value={format.value}>
                                                        {format.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="price">Price</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={courseData.price}
                                            onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                                            disabled={isLoading}
                                        />
                                        <p className="text-xs text-muted-foreground">Leave empty or 0 for free courses</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="certification">Certification</Label>
                                        <Input
                                            id="certification"
                                            placeholder="e.g., Certificate of Completion"
                                            value={courseData.certification}
                                            onChange={(e) => setCourseData({ ...courseData, certification: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Target Audience */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Target Audience</h3>

                                <div className="flex gap-2">
                                    <Input
                                        placeholder="e.g., Beginners, Professionals, Students"
                                        value={newAudience}
                                        onChange={(e) => setNewAudience(e.target.value)}
                                        disabled={isLoading}
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => handleAddArrayItem("audience", newAudience, setNewAudience)}
                                        disabled={isLoading}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>

                                {courseData.audience.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {courseData.audience.map((item, index) => (
                                            <Badge key={index} variant="secondary">
                                                {item}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveArrayItem("audience", index)}
                                                    className="ml-2 hover:text-red-600"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Learning Outcomes */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Learning Outcomes</h3>

                                <div className="flex gap-2">
                                    <Input
                                        placeholder="e.g., Master Python programming"
                                        value={newOutcome}
                                        onChange={(e) => setNewOutcome(e.target.value)}
                                        disabled={isLoading}
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => handleAddArrayItem("outcomes", newOutcome, setNewOutcome)}
                                        disabled={isLoading}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>

                                {courseData.outcomes.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {courseData.outcomes.map((item, index) => (
                                            <Badge key={index} variant="secondary">
                                                {item}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveArrayItem("outcomes", index)}
                                                    className="ml-2 hover:text-red-600"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Requirements */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Requirements</h3>

                                <div className="flex gap-2">
                                    <Input
                                        placeholder="e.g., Basic computer knowledge"
                                        value={newRequirement}
                                        onChange={(e) => setNewRequirement(e.target.value)}
                                        disabled={isLoading}
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => handleAddArrayItem("requirements", newRequirement, setNewRequirement)}
                                        disabled={isLoading}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>

                                {courseData.requirements.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {courseData.requirements.map((item, index) => (
                                            <Badge key={index} variant="secondary">
                                                {item}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveArrayItem("requirements", index)}
                                                    className="ml-2 hover:text-red-600"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Start Dates */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Start Dates</h3>

                                <div className="flex gap-2">
                                    <Input
                                        type="date"
                                        value={newStartDate}
                                        onChange={(e) => setNewStartDate(e.target.value)}
                                        disabled={isLoading}
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => handleAddArrayItem("start_dates", newStartDate, setNewStartDate)}
                                        disabled={isLoading}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>

                                {courseData.start_dates.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {courseData.start_dates.map((date, index) => (
                                            <Badge key={index} variant="secondary">
                                                {new Date(date).toLocaleDateString()}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveArrayItem("start_dates", index)}
                                                    className="ml-2 hover:text-red-600"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Course Image */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Course Image</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="image">Upload Image</Label>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            disabled={isLoading}
                                            className="flex-1"
                                        />
                                        {(imagePreview || currentImage) && (
                                            <div className="relative w-12 h-12 rounded overflow-hidden border">
                                                <img
                                                    src={imagePreview || currentImage}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Upload a new course thumbnail image (optional). Leave empty to keep current image.
                                    </p>
                                </div>
                            </div>

                            {/* Assign Instructors */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Assign Instructors *</h3>

                                <div className="space-y-2">
                                    <Label>Select Instructors</Label>
                                    <Select onValueChange={handleAddInstructor} disabled={loadingInstructors || isLoading}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={loadingInstructors ? "Loading instructors..." : "Select an instructor"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {instructors.length === 0 ? (
                                                <div className="p-2 text-center text-muted-foreground">
                                                    No instructors found. Create an instructor first.
                                                </div>
                                            ) : (
                                                instructors.map((instructor) => (
                                                    <SelectItem key={instructor.id} value={instructor.id}>
                                                        {instructor.first_name} {instructor.last_name} - {instructor.email}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {courseData.instructor_ids.length > 0 && (
                                    <div className="space-y-2">
                                        <Label>Assigned Instructors</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {courseData.instructor_ids.map((id) => (
                                                <Badge key={id} variant="secondary" className="text-sm py-1 px-3">
                                                    {getInstructorName(id)}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveInstructor(id)}
                                                        className="ml-2 hover:text-red-600"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {courseData.instructor_ids.length === 0 && (
                                    <p className="text-sm text-red-500">No instructors assigned yet. Please add at least one instructor.</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/admin/courses")}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating Course...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Update Course
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    )
}

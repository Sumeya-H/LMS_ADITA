"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2, UserPlus, GraduationCap, Briefcase, Shield } from "lucide-react"
import { createInstructor, createFinanceStaff, createManager } from "@/services/authService"

interface InstructorData {
    email: string
    username: string
    first_name: string
    last_name: string
    phone_number: string
    title: string
    bio: string
    password?: string
}

interface FinanceData {
    email: string
    username: string
    first_name: string
    last_name: string
    phone_number: string
    department: string
    job_title: string
    password?: string
}

interface ManagerData {
    email: string
    username: string
    first_name: string
    last_name: string
    phone_number: string
    department: string
    job_title: string
    password?: string
}

export default function CreateStaffPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const tabParam = searchParams.get("tab")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [createdUser, setCreatedUser] = useState<any>(null)
    const [activeTab, setActiveTab] = useState(tabParam || "instructor")

    // Instructor form state
    const [instructorData, setInstructorData] = useState<InstructorData>({
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        title: "",
        bio: "",
        password: ""
    })

    // Finance form state
    const [financeData, setFinanceData] = useState<FinanceData>({
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        department: "Finance",
        job_title: "Finance Staff",
        password: ""
    })

    // Manager form state
    const [managerData, setManagerData] = useState<ManagerData>({
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        department: "Management",
        job_title: "Manager",
        password: ""
    })

    useEffect(() => {
        if (tabParam && ["instructor", "finance", "manager"].includes(tabParam)) {
            setActiveTab(tabParam)
        }
    }, [tabParam])

    const handleInstructorSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccess("")
        setCreatedUser(null)

        try {
            const data = await createInstructor(instructorData)
            setSuccess("Instructor created successfully!")
            setCreatedUser(data)

            // Reset form
            setInstructorData({
                email: "",
                username: "",
                first_name: "",
                last_name: "",
                phone_number: "",
                title: "",
                bio: "",
                password: ""
            })

            setTimeout(() => setSuccess(""), 5000)

        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const handleFinanceSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccess("")
        setCreatedUser(null)

        try {
            const data = await createFinanceStaff(financeData)
            setSuccess("Finance staff created successfully!")
            setCreatedUser(data)

            // Reset form
            setFinanceData({
                email: "",
                username: "",
                first_name: "",
                last_name: "",
                phone_number: "",
                department: "Finance",
                job_title: "Finance Staff",
                password: ""
            })

            setTimeout(() => setSuccess(""), 5000)

        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const handleManagerSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccess("")
        setCreatedUser(null)

        try {
            const data = await createManager(managerData)
            setSuccess("Manager created successfully!")
            setCreatedUser(data)

            // Reset form
            setManagerData({
                email: "",
                username: "",
                first_name: "",
                last_name: "",
                phone_number: "",
                department: "Management",
                job_title: "Manager",
                password: ""
            })

            setTimeout(() => setSuccess(""), 5000)

        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        alert("Copied to clipboard!")
    }

    return (
        <div className="container py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Create Staff Accounts</h1>
                <p className="text-muted-foreground mt-2">
                    Create instructor, finance, and management staff accounts
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

            {createdUser && createdUser.temporary_password && (
                <Card className="mb-6 border-blue-500 bg-blue-50">
                    <CardHeader>
                        <CardTitle className="text-blue-700">Account Created Successfully!</CardTitle>
                        <CardDescription className="text-blue-600">
                            Please save these credentials and share them securely with the user
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                                <div>
                                    <span className="font-semibold">Email:</span> {createdUser.user.email}
                                </div>
                                <Button size="sm" variant="outline" onClick={() => copyToClipboard(createdUser.user.email)}>
                                    Copy
                                </Button>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                                <div>
                                    <span className="font-semibold">Temporary Password:</span> {createdUser.temporary_password}
                                </div>
                                <Button size="sm" variant="outline" onClick={() => copyToClipboard(createdUser.temporary_password)}>
                                    Copy
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={() => router.push("/admin/staff")}>
                            View All Staff
                        </Button>
                    </CardFooter>
                </Card>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="instructor" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Instructor
                    </TabsTrigger>
                    <TabsTrigger value="finance" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Finance
                    </TabsTrigger>
                    <TabsTrigger value="manager" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Manager
                    </TabsTrigger>
                </TabsList>

                {/* Instructor Form */}
                <TabsContent value="instructor">
                    <Card>
                        <form onSubmit={handleInstructorSubmit}>
                            <CardHeader>
                                <CardTitle>Create Instructor</CardTitle>
                                <CardDescription>
                                    Add a new instructor to the platform. They will be able to create and manage courses.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="instructor-email">Email *</Label>
                                        <Input
                                            id="instructor-email"
                                            type="email"
                                            placeholder="instructor@example.com"
                                            required
                                            value={instructorData.email}
                                            onChange={(e) => setInstructorData({ ...instructorData, email: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="instructor-username">Username</Label>
                                        <Input
                                            id="instructor-username"
                                            placeholder="username"
                                            value={instructorData.username}
                                            onChange={(e) => setInstructorData({ ...instructorData, username: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="instructor-first-name">First Name</Label>
                                        <Input
                                            id="instructor-first-name"
                                            placeholder="John"
                                            value={instructorData.first_name}
                                            onChange={(e) => setInstructorData({ ...instructorData, first_name: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="instructor-last-name">Last Name</Label>
                                        <Input
                                            id="instructor-last-name"
                                            placeholder="Doe"
                                            value={instructorData.last_name}
                                            onChange={(e) => setInstructorData({ ...instructorData, last_name: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="instructor-phone">Phone Number</Label>
                                        <Input
                                            id="instructor-phone"
                                            type="tel"
                                            placeholder="+1234567890"
                                            value={instructorData.phone_number}
                                            onChange={(e) => setInstructorData({ ...instructorData, phone_number: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="instructor-title">Title</Label>
                                        <Input
                                            id="instructor-title"
                                            placeholder="Senior Python Instructor"
                                            value={instructorData.title}
                                            onChange={(e) => setInstructorData({ ...instructorData, title: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="instructor-bio">Bio</Label>
                                    <Textarea
                                        id="instructor-bio"
                                        placeholder="Experienced software developer with 10+ years in the industry..."
                                        rows={4}
                                        value={instructorData.bio}
                                        onChange={(e) => setInstructorData({ ...instructorData, bio: e.target.value })}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="instructor-password">Custom Password (Optional)</Label>
                                    <Input
                                        id="instructor-password"
                                        type="password"
                                        placeholder="Leave empty to auto-generate"
                                        value={instructorData.password}
                                        onChange={(e) => setInstructorData({ ...instructorData, password: e.target.value })}
                                        disabled={isLoading}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        If left empty, a temporary password will be auto-generated
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isLoading} className="w-full">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating Instructor...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            Create Instructor
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>

                {/* Finance Form */}
                <TabsContent value="finance">
                    <Card>
                        <form onSubmit={handleFinanceSubmit}>
                            <CardHeader>
                                <CardTitle>Create Finance Staff</CardTitle>
                                <CardDescription>
                                    Add finance staff to manage payments, invoices, and financial records.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="finance-email">Email *</Label>
                                        <Input
                                            id="finance-email"
                                            type="email"
                                            placeholder="finance@example.com"
                                            required
                                            value={financeData.email}
                                            onChange={(e) => setFinanceData({ ...financeData, email: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="finance-username">Username</Label>
                                        <Input
                                            id="finance-username"
                                            placeholder="username"
                                            value={financeData.username}
                                            onChange={(e) => setFinanceData({ ...financeData, username: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="finance-first-name">First Name</Label>
                                        <Input
                                            id="finance-first-name"
                                            placeholder="Jane"
                                            value={financeData.first_name}
                                            onChange={(e) => setFinanceData({ ...financeData, first_name: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="finance-last-name">Last Name</Label>
                                        <Input
                                            id="finance-last-name"
                                            placeholder="Smith"
                                            value={financeData.last_name}
                                            onChange={(e) => setFinanceData({ ...financeData, last_name: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="finance-phone">Phone Number</Label>
                                        <Input
                                            id="finance-phone"
                                            type="tel"
                                            placeholder="+1234567890"
                                            value={financeData.phone_number}
                                            onChange={(e) => setFinanceData({ ...financeData, phone_number: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="finance-department">Department</Label>
                                        <Input
                                            id="finance-department"
                                            placeholder="Finance Department"
                                            value={financeData.department}
                                            onChange={(e) => setFinanceData({ ...financeData, department: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="finance-job-title">Job Title</Label>
                                        <Input
                                            id="finance-job-title"
                                            placeholder="Financial Controller"
                                            value={financeData.job_title}
                                            onChange={(e) => setFinanceData({ ...financeData, job_title: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="finance-password">Custom Password (Optional)</Label>
                                        <Input
                                            id="finance-password"
                                            type="password"
                                            placeholder="Leave empty to auto-generate"
                                            value={financeData.password}
                                            onChange={(e) => setFinanceData({ ...financeData, password: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isLoading} className="w-full">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating Finance Staff...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            Create Finance Staff
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>

                {/* Manager Form */}
                <TabsContent value="manager">
                    <Card>
                        <form onSubmit={handleManagerSubmit}>
                            <CardHeader>
                                <CardTitle>Create Manager</CardTitle>
                                <CardDescription>
                                    Add managers to oversee operations, approve requests, and manage staff.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="manager-email">Email *</Label>
                                        <Input
                                            id="manager-email"
                                            type="email"
                                            placeholder="manager@example.com"
                                            required
                                            value={managerData.email}
                                            onChange={(e) => setManagerData({ ...managerData, email: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="manager-username">Username</Label>
                                        <Input
                                            id="manager-username"
                                            placeholder="username"
                                            value={managerData.username}
                                            onChange={(e) => setManagerData({ ...managerData, username: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="manager-first-name">First Name</Label>
                                        <Input
                                            id="manager-first-name"
                                            placeholder="Bob"
                                            value={managerData.first_name}
                                            onChange={(e) => setManagerData({ ...managerData, first_name: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="manager-last-name">Last Name</Label>
                                        <Input
                                            id="manager-last-name"
                                            placeholder="Johnson"
                                            value={managerData.last_name}
                                            onChange={(e) => setManagerData({ ...managerData, last_name: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="manager-phone">Phone Number</Label>
                                        <Input
                                            id="manager-phone"
                                            type="tel"
                                            placeholder="+1234567890"
                                            value={managerData.phone_number}
                                            onChange={(e) => setManagerData({ ...managerData, phone_number: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="manager-department">Department</Label>
                                        <Input
                                            id="manager-department"
                                            placeholder="Management"
                                            value={managerData.department}
                                            onChange={(e) => setManagerData({ ...managerData, department: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="manager-job-title">Job Title</Label>
                                        <Input
                                            id="manager-job-title"
                                            placeholder="Operations Manager"
                                            value={managerData.job_title}
                                            onChange={(e) => setManagerData({ ...managerData, job_title: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="manager-password">Custom Password (Optional)</Label>
                                        <Input
                                            id="manager-password"
                                            type="password"
                                            placeholder="Leave empty to auto-generate"
                                            value={managerData.password}
                                            onChange={(e) => setManagerData({ ...managerData, password: e.target.value })}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isLoading} className="w-full">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating Manager...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            Create Manager
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Edit, Trash2, RefreshCw, UserPlus, GraduationCap, Briefcase, Shield } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { fetchAllStaff, updateStaff, deleteStaff } from "@/services/authService"

interface StaffUser {
    id: string
    email: string
    username: string
    first_name: string
    last_name: string
    phone_number: string
    role: string
    is_active: boolean
    created_at: string
    profile?: {
        title?: string
        bio?: string
        department?: string
        job_title?: string
        courses?: number[]
    }
}

export default function StaffListPage() {
    const router = useRouter()
    const [staff, setStaff] = useState<StaffUser[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [selectedStaff, setSelectedStaff] = useState<StaffUser | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [updating, setUpdating] = useState(false)

    const fetchStaff = async () => {
        setIsLoading(true)
        setError("")

        try {
            const data = await fetchAllStaff()
            setStaff(data)
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchStaff()
    }, [])

    const handleUpdateStaff = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedStaff) return

        setUpdating(true)
        try {
            const updateData = {
                first_name: selectedStaff.first_name,
                last_name: selectedStaff.last_name,
                phone_number: selectedStaff.phone_number,
                is_active: selectedStaff.is_active,
                ...(selectedStaff.role === "instructor" && {
                    title: selectedStaff.profile?.title,
                    bio: selectedStaff.profile?.bio
                }),
                ...(selectedStaff.role !== "instructor" && {
                    department: selectedStaff.profile?.department,
                    job_title: selectedStaff.profile?.job_title
                })
            }

            await updateStaff(selectedStaff.id, updateData)
            setIsEditDialogOpen(false)
            fetchStaff()
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setUpdating(false)
        }
    }

    const handleDeleteStaff = async () => {
        if (!selectedStaff) return

        setUpdating(true)
        try {
            await deleteStaff(selectedStaff.id)
            setIsDeleteDialogOpen(false)
            fetchStaff()
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setUpdating(false)
        }
    }

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case "instructor":
                return "bg-blue-100 text-blue-800"
            case "finance":
                return "bg-green-100 text-green-800"
            case "manager":
                return "bg-purple-100 text-purple-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "instructor":
                return <GraduationCap className="h-4 w-4" />
            case "finance":
                return <Briefcase className="h-4 w-4" />
            case "manager":
                return <Shield className="h-4 w-4" />
            default:
                return <UserPlus className="h-4 w-4" />
        }
    }

    const navigateToCreateStaff = (tab: string) => {
        router.push(`/admin/staff/create-staff?tab=${tab}`)
    }

    if (isLoading) {
        return (
            <div className="container py-8 flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Staff Management</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage instructors, finance staff, and managers
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={fetchStaff} variant="outline" size="sm">
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

            {/* Quick Add Cards */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigateToCreateStaff("instructor")}>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <GraduationCap className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-semibold">Add Instructor</p>
                                <p className="text-sm text-muted-foreground">Create a new instructor account</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigateToCreateStaff("finance")}>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <Briefcase className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="font-semibold">Add Finance Staff</p>
                                <p className="text-sm text-muted-foreground">Create a new finance account</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigateToCreateStaff("manager")}>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-100 rounded-full">
                                <Shield className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="font-semibold">Add Manager</p>
                                <p className="text-sm text-muted-foreground">Create a new manager account</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Staff</CardTitle>
                    <CardDescription>
                        Total {staff.length} staff members found
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {staff.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                            <UserPlus className="h-12 w-12 mb-3 opacity-50" />
                                            <p>No staff members found</p>
                                            <Button
                                                variant="link"
                                                className="mt-2"
                                                onClick={() => navigateToCreateStaff("instructor")}
                                            >
                                                Click here to add your first staff member
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                staff.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                {getRoleIcon(user.role)}
                                                {user.first_name} {user.last_name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge className={getRoleBadgeColor(user.role)}>
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{user.phone_number || "-"}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.is_active ? "default" : "secondary"}>
                                                {user.is_active ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                        setSelectedStaff(user)
                                                        setIsEditDialogOpen(true)
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => {
                                                        setSelectedStaff(user)
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

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Staff Member</DialogTitle>
                        <DialogDescription>
                            Update staff information
                        </DialogDescription>
                    </DialogHeader>
                    {selectedStaff && (
                        <form onSubmit={handleUpdateStaff}>
                            <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>First Name</Label>
                                        <Input
                                            value={selectedStaff.first_name}
                                            onChange={(e) => setSelectedStaff({ ...selectedStaff, first_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Last Name</Label>
                                        <Input
                                            value={selectedStaff.last_name}
                                            onChange={(e) => setSelectedStaff({ ...selectedStaff, last_name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Phone Number</Label>
                                    <Input
                                        value={selectedStaff.phone_number || ""}
                                        onChange={(e) => setSelectedStaff({ ...selectedStaff, phone_number: e.target.value })}
                                    />
                                </div>

                                {selectedStaff.role === "instructor" && (
                                    <>
                                        <div className="space-y-2">
                                            <Label>Title</Label>
                                            <Input
                                                value={selectedStaff.profile?.title || ""}
                                                onChange={(e) => setSelectedStaff({
                                                    ...selectedStaff,
                                                    profile: { ...selectedStaff.profile, title: e.target.value }
                                                })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Bio</Label>
                                            <Input
                                                value={selectedStaff.profile?.bio || ""}
                                                onChange={(e) => setSelectedStaff({
                                                    ...selectedStaff,
                                                    profile: { ...selectedStaff.profile, bio: e.target.value }
                                                })}
                                            />
                                        </div>
                                    </>
                                )}

                                {(selectedStaff.role === "finance" || selectedStaff.role === "manager") && (
                                    <>
                                        <div className="space-y-2">
                                            <Label>Department</Label>
                                            <Input
                                                value={selectedStaff.profile?.department || ""}
                                                onChange={(e) => setSelectedStaff({
                                                    ...selectedStaff,
                                                    profile: { ...selectedStaff.profile, department: e.target.value }
                                                })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Job Title</Label>
                                            <Input
                                                value={selectedStaff.profile?.job_title || ""}
                                                onChange={(e) => setSelectedStaff({
                                                    ...selectedStaff,
                                                    profile: { ...selectedStaff.profile, job_title: e.target.value }
                                                })}
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select
                                        value={selectedStaff.is_active ? "active" : "inactive"}
                                        onValueChange={(value) => setSelectedStaff({ ...selectedStaff, is_active: value === "active" })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={updating}>
                                    {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Changes
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deactivation</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to deactivate {selectedStaff?.first_name} {selectedStaff?.last_name}?
                            This user will no longer be able to access the platform.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDeleteStaff} disabled={updating}>
                            {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Deactivate
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

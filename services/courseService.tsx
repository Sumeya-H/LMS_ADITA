export const fetchCourses = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store", // ensures fresh data (important in Next.js)
        }
    );

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Fetch courses error:", errorBody);
        throw new Error("Failed to fetch courses");
    }

    return response.json();
};

export const fetchCoursesById = async (id: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${id}/`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store", // ensures fresh data (important in Next.js)
        }
    );

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Fetch courses error:", errorBody);
        throw new Error("Failed to fetch courses");
    }

    return response.json();
};

export const fetchCoursesByStudent = async (id: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/by_student/`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                "Content-Type": "application/json",
            },
            cache: "no-store", // ensures fresh data (important in Next.js)
        }
    );

    console.log(response)
    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Fetch courses error:", errorBody);
        throw new Error("Failed to fetch courses");
    }

    return response.json();
};

export async function fetchInstructorStats() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/instructor/stats/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
        },
    });

    console.log("Courses instructor: ", response.json);
    if (!response.ok) {
        throw new Error("Failed to fetch instructor stats");
    }

    return response.json();
}

export const fetchFinanceRegistrations = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/register/finance/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Request failed");
    }

    // Handle empty response (PATCH often returns 204)
    if (res.status === 204) return null;

    return res.json();
}

export const approveFinanceRegistration = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/finance-approve/${id}/`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Request failed");
    }

    // Handle empty response (PATCH often returns 204)
    if (res.status === 204) return null;

    return res.json();
}

export const fetchManagementRegistrations = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/register/management/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Request failed");
    }

    // Handle empty response (PATCH often returns 204)
    if (res.status === 204) return null;

    return res.json();
}

export const approveManagementRegistration = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/management-approve/${id}/`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Request failed");
    }

    // Handle empty response (PATCH often returns 204)
    if (res.status === 204) return null;

    return res.json();
}

export async function fetchAllCourses() {
    const token = localStorage.getItem("access")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch courses")
    }

    return response.json()
}

export async function fetchCourseById(courseId: string) {
    const token = localStorage.getItem("access")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseId}/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch course")
    }

    return response.json()
}

export async function createCourse(formData: FormData) {
    const token = localStorage.getItem("access")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/manage/create/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to create course")
    }

    return data
}

export async function updateCourse(courseId: string, formData: FormData) {
    const token = localStorage.getItem("access")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseId}/update/`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to update course")
    }

    return data
}

export async function deleteCourse(courseId: string) {
    const token = localStorage.getItem("access")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseId}/delete/`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to delete course")
    }

    return response.json()
}

export async function fetchCoursesByInstructor(instructorId: string) {
    const token = localStorage.getItem("access")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/?instructor=${instructorId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch courses")
    }

    return response.json()
}

export async function fetchCourseCategories() {
    const token = localStorage.getItem("access")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/categories/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch categories")
    }

    return response.json()
}

export const getCourseById = async (courseId: string) => {
    try {
        const token = localStorage.getItem("access")
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseId}/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error("Failed to fetch course")
        }

        return await response.json()
    } catch (error) {
        console.error("Error fetching course:", error)
        throw error
    }
}

export const getAllCourses = async () => {
    try {
        const token = localStorage.getItem("access")
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error("Failed to fetch courses")
        }

        return await response.json()
    } catch (error) {
        console.error("Error fetching courses:", error)
        throw error
    }
}

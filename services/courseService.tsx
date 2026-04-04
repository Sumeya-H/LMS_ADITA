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

export async function fetchInstructorStats(token: string) {
    const response = await fetch("/api/instructor/stats/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

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

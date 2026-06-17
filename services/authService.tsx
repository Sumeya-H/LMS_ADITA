export const login = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!res.ok) {
        return res;
    }

    const data = await res.json();
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user))

    if (data.user.is_student || data.user.is_instructor) {
        localStorage.setItem("token", data.moodle_token);
        console.log("moodle token", data.moodle_token);
    }
    return data;
}

export const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login";
}

export const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
        logout();
        return null;
    }

    const data = await res.json();
    localStorage.setItem("access", data.access);
    return data.access;
}

export async function signupUser(requestData: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/students/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
    });
    const data = res.json()
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data))
    return data
}

// Create Instructor
export async function createInstructor(requestData: {
    email: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    title?: string;
    bio?: string;
    password?: string;
    courses?: number[];
}) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/staff/instructors/create/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to create instructor");
    }

    return data;
}

// Create Finance Staff
export async function createFinanceStaff(requestData: {
    email: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    department?: string;
    job_title?: string;
    password?: string;
}) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/staff/finance/create/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to create finance staff");
    }

    return data;
}

// Create Manager
export async function createManager(requestData: {
    email: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    department?: string;
    job_title?: string;
    password?: string;
}) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/staff/managers/create/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to create manager");
    }

    return data;
}

// Get all staff
export async function fetchAllStaff() {
    const token = localStorage.getItem("access");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/staff/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch staff");
    }

    const data = await res.json();
    return data;
}

// Update staff member
export async function updateStaff(userId: string, requestData: any) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/staff/${userId}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to update staff");
    }

    return data;
}

// Delete/Deactivate staff member
export async function deleteStaff(userId: string) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/staff/${userId}/delete/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!res.ok) {
        throw new Error("Failed to delete staff");
    }

    const data = await res.json();
    return data;
}

// Get staff by role
export async function fetchStaffByRole(role: string) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/staff/?role=${role}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch ${role}s`);
    }

    const data = await res.json();
    return data;
}

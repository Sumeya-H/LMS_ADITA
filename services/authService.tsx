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
        return null;
    }

    const data = await res.json();
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user))

    if (data.user.is_student || data.user.is_instructor) {
        localStorage.setItem("token", data.moodle_token)
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/students/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
    });
    const data = res.json()
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data))
    return data
}

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

export const envetRegistration = async (data) => {
    console.log("data", data);
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/register/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    if (!response.ok) {
        const errorBody = await response.text();
        console.log(errorBody);
        throw new Error("Failed to register to event");
    }
    return response.json();
};

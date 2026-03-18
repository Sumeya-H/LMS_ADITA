"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AiRedirectPage() {
    const router = useRouter()

    useEffect(() => {
        router.replace(
            "/programs/ai-for-content-creators/enroll"
        )
    }, [router])

    return <p>Redirecting...</p>
}

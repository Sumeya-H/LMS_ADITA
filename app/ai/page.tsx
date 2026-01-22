"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AiRedirectPage() {
    const router = useRouter()

    useEffect(() => {
        router.replace(
            "/programs/introduction-to-artificial-intelligence/enroll"
        )
    }, [router])

    return <p>Redirecting...</p>
}

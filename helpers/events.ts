export interface NewsType {
    slug: string
    title: string
    summary: string
    content: string
    date: string
    category: "MoU" | "Partnership" | "Announcement" | "Achievement"
    images: string[]
    featured?: boolean
}

export const news: NewsType[] = [
    {
        slug: "mou-signing-adita-gondar-university",
        title: "MoU Signing Between ADITA and Gondar University",
        summary:
            "ADITA and Gondar University formalized a strategic partnership to advance digital innovation, research collaboration, and student capacity development.",
        content:
            "African Digital & Innovation Technology Academy (ADITA) officially signed a Memorandum of Understanding with Gondar University. The partnership aims to strengthen collaboration in digital skills development, joint research initiatives, innovation programs, and technology-driven academic exchange. Further details of the collaboration framework will be announced in upcoming phases.",
        date: "November 2025",
        category: "MoU",
        images: [
            "/images/news/gondor_mou.jpeg",
            "/images/news/gondor_mou_2.jpeg",
            "/images/news/gondor_mou_3.jpeg",
        ],
        featured: true,
    },

    {
        slug: "mou-signing-adita-zsecuredtech-trading-plc",
        title: "MoU Signing Between ADITA and ZSecuredtech Trading PLC",
        summary:
            "ADITA and ZSecuredtech Trading PLC entered into a collaboration to enhance cybersecurity innovation and digital transformation initiatives.",
        content:
            "African Digital & Innovation Technology Academy (ADITA) signed a Memorandum of Understanding with ZSecuredtech Trading PLC (ZSecuredtech). This partnership is focused on strengthening cybersecurity awareness, professional training programs, technology consulting collaboration, and innovation-driven solutions. The agreement marks a significant milestone in bridging industry expertise with digital education advancement.",
        date: "December 2026",
        category: "MoU",
        images: [
            "/images/news/zsecured_mou.jpeg",
            "/images/news/zsecured_mou_2.jpeg",
        ],
        featured: true,
    },

    {
        slug: "mou-signing-adita-mohas-trading-plc",
        title:
            "MoU Signing Between ADITA and MOHAS TRADING PLC (Mohas Consult, Jobs and Technology)",
        summary:
            "ADITA and MOHAS TRADING PLC agreed to collaborate on technology consulting, job creation initiatives, and digital workforce development.",
        content:
            "African Digital & Innovation Technology Academy (ADITA) formalized a Memorandum of Understanding with MOHAS TRADING PLC (Mohas Consult, Jobs and Technology). The collaboration is designed to foster digital job readiness programs, technology consultancy services, and innovation-driven employment pathways. The partnership aims to empower youth and professionals through technology-focused initiatives.",
        date: "February 2026",
        category: "MoU",
        images: [
            "/images/news/mohas_mou.png",
        ],
        featured: true,
    },

    {
        slug: "mou-signing-adita-aastu",
        title:
            "MoU Signing Between ADITA and Addis Ababa Science and Technology University (AASTU)",
        summary:
            "ADITA and Addis Ababa Science and Technology University established a partnership to advance research, innovation, and technology education.",
        content:
            "African Digital & Innovation Technology Academy (ADITA) signed a Memorandum of Understanding with Addis Ababa Science and Technology University (AASTU). The partnership focuses on collaborative research, digital skills training, innovation incubation, and knowledge exchange programs. This agreement reinforces a shared commitment to strengthening science and technology education ecosystems.",
        date: "February 2026",
        category: "MoU",
        images: [
            "/images/news/aastu_mou.jpeg",
        ],
    },

    {
        slug: "mou-signing-adita-wollo-university",
        title: "MoU Signing Between ADITA and Wollo University",
        summary:
            "ADITA and Wollo University partnered to promote digital transformation, entrepreneurship, and collaborative academic programs.",
        content:
            "African Digital & Innovation Technology Academy (ADITA) entered into a Memorandum of Understanding with Wollo University to strengthen cooperation in digital education, innovation ecosystems, and technology-based entrepreneurship initiatives. The collaboration aims to expand opportunities for students and researchers through joint programs and institutional partnerships.",
        date: "February 2026",
        category: "MoU",
        images: [
            "/images/news/wollo_mou_6.jpeg",
            "/images/news/wollo_mou_3.jpeg",
            "/images/news/wollo_mou_4.jpeg",
        ],
    },

    {
        slug: "mou-signing-adita-hawassa-university",
        title: "MoU Signing Between ADITA and Hawassa University",
        summary:
            "ADITA and Hawassa University formalized a strategic agreement to collaborate on digital innovation, academic research, and capacity building.",
        content:
            "African Digital & Innovation Technology Academy (ADITA) signed a Memorandum of Understanding with Hawassa University to foster collaboration in digital technology training, innovation research, and institutional capacity development. The agreement aims to create sustainable partnerships that support technological advancement and youth empowerment initiatives.",
        date: "January 2026",
        category: "MoU",
        images: [
            "/images/news/hawassa_mou.jpeg",
            "/images/news/hawassa_mou_1.jpeg",
            "/images/news/hawassa_mou_2.jpeg",
        ],
    },
]

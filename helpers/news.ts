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
        title: "MoU Signing Between ADITA and University of Gondar",
        summary:
            "ADITA and University of Gondar formalized a strategic partnership to advance digital innovation, research collaboration, and student capacity development.",
        content:
            "African Digital & Innovation Technology Academy (ADITA) officially signed a Memorandum of Understanding with University of Gondar. The partnership aims to strengthen collaboration in digital skills development, joint research initiatives, innovation programs, and technology-driven academic exchange. Further details of the collaboration framework will be announced in upcoming phases.",
        date: "November 2025",
        category: "MoU",
        images: [
            "/images/news/gondor_mou_2.jpeg",
            "/images/news/gondor_mou_3.jpeg",
        ],
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
            "On February 9, 2026, Addis Ababa Science and Technology University AASTU and the African Digital & Innovation Technology Academy (ADITA) signed a Memorandum of Understanding to advance research and digital innovation in Ethiopia. This strategic partnership focuses on technology development and resource sharing to enhance educational offerings and drive impactful projects. Both institutions aim to leverage their collective expertise to foster a robust ecosystem for technological advancement.",
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
        content: "We are proud to announce the official signing of a Memorandum of Understanding (MoU) between ADITA - African digital innovation and Tech Academy and Wollo University, marking a pivotal step toward bridging the gap between academic excellence and industry-ready tech skills. \nThis collaboration focuses on integrating practical tech training with academic curriculum to ensure students are prepared for the demands of the modern workforce and thrive in today's global digital economy. We look forward to a productive partnership that fosters innovation, supports student growth, and strengthens the technology landscape in Ethiopia and beyond.",
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
            "Bridging the Gap: African Digital Innovation and Tech Academy x Hawassa University!\nWe are thrilled to announce that ADITA and Hawassa University officially signed a Memorandum of Understanding (MoU) today!i\nThis partnership marks a significant step toward aligning academic excellence with industry-leading tech skills. Together, we are committed to empowering the next generation of Ethiopian innovators through specialized training, mentorship, and career opportunities.\nThe future of tech in Africa starts with collaboration.",
        date: "February 2026",
        category: "MoU",
        images: [
            "/images/news/hawassa_mou.jpeg",
            "/images/news/hawassa_mou_1.jpeg",
            "/images/news/hawassa_mou_2.jpeg",
        ],
    },
    {
        slug: "mou-signing-adita-emy-technologies",
        title: "MoU Signing Between ADITA and EMY Technologies",
        summary:
            "ADITA and EMY Technologies established a strategic partnership to advance digital innovation, emerging technologies, and industry-driven training programs.",
        content:
            "African Digital & Innovation Technology Academy (ADITA) officially signed a Memorandum of Understanding with EMY Technologies to foster collaboration in emerging technology solutions, professional capacity building, and innovation-focused initiatives. The partnership is aimed at strengthening industry-academia linkage, promoting practical technology applications, and supporting digital transformation efforts. Further joint programs and initiatives will be announced in the coming months.",
        date: "March 2026",
        category: "MoU",
        images: [
            "/images/news/emy_mou.png",
        ],
    },
    {
        slug: "mou-signing-adita-faana-mikaa'inna",
        title: "MoU Signing Between ADITA and  Faana Milkaa'inaa",
        summary:
            "ADITA - African Digital and Innovation Technology Academy and Faana Milkaa'inaa (TAGs) have signed an MoU to establish a strategic partnership focused on digital innovation and capacity building.",
        content:
            "ADITA - African Digital and Innovation Technology Academy and Faana Milkaa'inaa (TAGs) have signed an MoU to establish a strategic partnership focused on digital innovation and capacity building. This collaboration will deliver joint training, startup incubation, and AI-integrated business curricula to empower entrepreneurs and professionals for the modern digital economy.This partnership bridges the gap between business strategy and tech innovation.We look forward to building a transformative future together!",
        date: "March 2026",
        category: "MoU",
        images: [
            "/images/news/faana_mou.webp",
            "/images/news/faana_mou_2.webp",
            "/images/news/faana_mou_3.webp",
        ],
        featured: true,
    }
]

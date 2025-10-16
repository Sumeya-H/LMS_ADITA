import {
    BookOpen,
    BriefcaseBusinessIcon,
    Award,
    Handshake,
    Users,
    Briefcase,
    Lightbulb,
    Globe,
} from "lucide-react"

export const features = [
    {
        name: "Accelerated Programs",
        description:
            "We offer AI, Data Science, and Development courses, plus soft skills training to bridge the gap between learning and the workplace.",
        icon: BookOpen,
        detail: (
            <>
                <div className="space-y-3">
                    <p>
                        ADITA’s training programs empower learners to build a strong
                        foundation in Artificial Intelligence, Machine Learning, Data
                        Science, and Software Development.
                    </p>

                    <p>
                        Our approach combines theory with practical, hands-on projects
                        aligned with real-world use cases. Learners gain exposure to modern
                        tools such as Python, TensorFlow, cloud platforms, and data
                        visualization technologies, while also developing essential soft
                        skills like problem-solving, communication, and teamwork.
                    </p>

                    <p className="font-semibold"><strong>Key Highlights:</strong></p>
                    <ul className="list-disc list-inside ml-5 space-y-1">
                        <li>Beginner to advanced tracks for individuals and professionals</li>
                        <li>Real projects simulating industry challenges</li>
                        <li>Blended learning (self-paced + live mentorship)</li>
                        <li>Certification upon successful completion</li>
                    </ul>
                </div>
            </>
        ),
    },
    {
        name: "Corporate Tech & Soft Skills Training",
        description:
            "We deliver tailored training in AI, Data Science, and Development to meet the specific needs of businesses.",
        icon: BriefcaseBusinessIcon,
        detail: (
            <>
                <div className="space-y-3">
                    <p>
                        ADITA partners with companies to design and deliver customized
                        digital training solutions for their teams.
                    </p>

                    <p>
                        We align our programs with each organization's strategic goals,
                        focusing on upskilling employees to adopt and deploy AI, data
                        analytics, and digital transformation effectively.
                    </p>

                    <p className="font-semibold"><strong>Who It’s For:</strong></p>
                    <ul className="list-disc list-inside ml-5 space-y-1">
                        <li>Corporates seeking in-house AI and data capability</li>
                        <li>SMEs looking to modernize workflows</li>
                        <li>Public sector teams digitizing operations</li>
                    </ul>

                    <p className="font-semibold"><strong>What We Offer:</strong></p>
                    <ul className="list-disc list-inside ml-5 space-y-1">
                        <li>Onsite and virtual group training</li>
                        <li>Custom course content aligned to your industry</li>
                        <li>Pre- and post-training performance evaluation</li>
                        <li>Long-term workforce development partnerships</li>
                    </ul>
                </div>
            </>
        ),
    },
    {
        name: "Certification Programs",
        description:
            "Industry-recognized certifications to validate skills and enhance career prospects.",
        icon: Award,
        /*detail:
            <>
                <p>Our certification programs are designed to help professionals prove their expertise and stand out in competitive job markets.</p>

                <p>Each certification is industry-aligned and integrates both academic rigor and applied practice.</p>

                <p><strong>Example Certifications:</strong></p>
                <ul>
                    <li>Certified AI Solutions Professional (CAISP)</li>
                    <li>Advanced Machine Learning Engineer</li>
                    <li>Data Science for Finance</li>
                    <li>Digital Transformation Strategy Leader</li>
                </ul>

                <p><strong>Benefits:</strong></p>
                <ul>
                    <li>Globally recognized credentials</li>
                    <li>Portfolio-ready project work</li>
                    <li>Mentorship from industry experts</li>
                    <li>Enhanced employability and promotion prospects</li>
                </ul>
            </>
        ,*/
    },
    {
        name: "Events & Conferences",
        description:
            "We host events and conferences that connect learners, professionals, and industry leaders.",
        icon: Handshake,
        detail: (
            <>
                <div className="space-y-3">
                    <p>
                        ADITA organizes flagship summits, hackathons, and conferences that
                        bring together Africa’s digital community.
                    </p>

                    <p>
                        These events foster collaboration, spark innovation, and inspire
                        cross-sector partnerships.
                    </p>

                    <p className="font-semibold"><strong>Signature Events:</strong></p>
                    <ul className="list-disc list-inside ml-5 space-y-1">
                        <li>AI for Africa Summit</li>
                        <li>Innovation & Future Tech Conference</li>
                        <li>Women in Data Science Forum</li>
                    </ul>

                    <p className="font-semibold"><strong>Opportunities for Participants:</strong></p>
                    <ul className="list-disc list-inside ml-5 space-y-1">
                        <li>Network with global AI leaders and investors</li>
                        <li>Showcase projects and innovations</li>
                        <li>Engage in policy and technology dialogues</li>
                        <li>Gain visibility in Africa’s digital ecosystem</li>
                    </ul>
                </div>
            </>
        ),
    },
    {
        name: "Workshops & Bootcamps",
        description:
            "Intensive, hands-on training sessions to develop practical AI skills quickly.",
        icon: Users,
        detail: (
            <>
                <div className="space-y-3">
                    <p>
                        Our workshops and bootcamps focus on rapid skill development through
                        immersive, project-based learning.
                    </p>

                    <p>
                        They’re ideal for learners who want to build practical capabilities
                        in a short time frame.
                    </p>

                    <p className="font-semibold"><strong>Examples:</strong></p>
                    <ul className="list-disc list-inside ml-5 space-y-1">
                        <li>AI for Business Leaders (2 Days)</li>
                        <li>Python for Data Science Bootcamp (1 Week)</li>
                        <li>Deep Learning with TensorFlow (2 Weeks)</li>
                    </ul>

                    <p className="font-semibold"><strong>Structure:</strong></p>
                    <ul className="list-disc list-inside ml-5 space-y-1">
                        <li>70% hands-on, guided projects</li>
                        <li>Mentored sessions by practitioners</li>
                        <li>Post-bootcamp career guidance</li>
                        <li>Optional certification add-ons</li>
                    </ul>
                </div>
            </>
        ),
    },
    {
        name: "Job Placement",
        description:
            "Connect with employers seeking AI talent across various industries in Africa.",
        icon: Briefcase,
        detail: (
            <>
                <div className="space-y-3">
                    <p>
                        ADITA bridges the gap between education and employment through our
                        Talent Connect program.
                    </p>

                    <p>
                        We actively match top-performing graduates with companies seeking
                        digital professionals.
                    </p>

                    <p className="font-semibold"><strong>How It Works:</strong></p>
                    <ul className="list-disc list-inside ml-5 space-y-1">
                        <li>Employers access our curated database of certified graduates</li>
                        <li>ADITA facilitates interviews and onboarding</li>
                        <li>Graduates gain access to exclusive job opportunities</li>
                    </ul>

                    <p className="font-semibold"><strong>Benefits for Learners:</strong></p>
                    <ul className="list-disc list-inside ml-5 space-y-1">
                        <li>Career coaching and resume workshops</li>
                        <li>Internship and apprenticeship placements</li>
                        <li>
                            Partnerships with hiring firms across tech, finance, healthcare,
                            and more
                        </li>
                    </ul>
                </div>
            </>
        ),
    },
    {
        name: "AI Incubator",
        description:
            "Support for AI-driven startups and entrepreneurs to develop innovative solutions.",
        icon: Lightbulb,
        detail: (
            <>
                <div className="space-y-3">
                    <p>
                        The ADITA AI Incubator nurtures early-stage startups leveraging AI,
                        data, and automation to address African challenges.
                    </p>

                    <p>
                        We provide mentorship, workspace access, investor linkages, and
                        technical support to transform ideas into scalable ventures.
                    </p>

                    <p className="font-semibold"><strong>What Startups Receive:</strong></p>
                    <ul className="list-disc list-inside ml-5 space-y-1">
                        <li>Access to ADITA’s research labs and mentorship</li>
                        <li>Product design and technical development support</li>
                        <li>Business model refinement and go-to-market strategy</li>
                        <li>
                            Access to funding opportunities through our investor network
                        </li>
                    </ul>

                    <p>
                        <strong>Focus Areas:</strong> Agriculture, Healthcare, Education,
                        Smart Cities, and Financial Inclusion.
                    </p>
                </div>
            </>
        ),
    },
    {
        name: "Consulting Services",
        description:
            "Comprehensive consulting services across AI strategy, governance, and implementation, including policymaker training.",
        icon: Globe,
        detail: (
            <>
                <div className="space-y-3">
                    <p>
                        ADITA provides strategic consulting services that help governments,
                        businesses, and NGOs harness AI responsibly and effectively.
                    </p>

                    <p>
                        Our consultants guide clients through planning, design, deployment,
                        and governance of AI systems.
                    </p>

                    <p className="font-semibold"><strong>Service Areas:</strong></p>
                    <ul className="list-disc list-inside ml-5 space-y-1">
                        <li>AI Policy Development and Ethical Frameworks</li>
                        <li>Data Strategy and Cloud Architecture</li>
                        <li>Process Automation and Predictive Analytics</li>
                        <li>Organizational Change and Digital Governance</li>
                    </ul>

                    <p className="font-semibold"><strong>Example Engagements:</strong></p>
                    <ul className="list-disc list-inside ml-5 space-y-1">
                        <li>Drafting a national AI strategy</li>
                        <li>Advising banks on intelligent automation</li>
                        <li>Assessing digital maturity in public institutions</li>
                    </ul>
                </div>
            </>
        ),
    },
    {
        name: "Industry Partnerships",
        description:
            "Collaborate with leading tech companies and organizations for real-world experience.",
        icon: Handshake,
        detail: (
            <>
                <div className="space-y-3">
                    <p>
                        ADITA builds strong partnerships with top technology companies,
                        research institutions, and development organizations.
                    </p>

                    <p>
                        These partnerships enable knowledge exchange, innovation, and
                        real-world impact through joint projects and talent pipelines.
                    </p>

                    <p className="font-semibold"><strong>Partner Benefits:</strong></p>
                    <ul className="list-disc list-inside ml-5 space-y-1">
                        <li>Access to skilled graduates and research talent</li>
                        <li>Co-branded training initiatives</li>
                        <li>Collaborative research and development projects</li>
                        <li>CSR and capacity-building collaborations</li>
                    </ul>
                </div>
            </>
        ),
    },
];

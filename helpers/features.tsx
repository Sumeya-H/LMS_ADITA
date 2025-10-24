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
            <div className="space-y-3">
                <p>
                    ADITA’s training programs empower learners to build a strong
                    foundation in Artificial Intelligence, Machine Learning, Data
                    Science, and Software Development.
                    <br />
                    Our approach combines theory with practical, hands-on projects
                    aligned with real-world use cases. Learners gain exposure to modern
                    tools such as Python, TensorFlow, cloud platforms, and data
                    visualization technologies, while also developing essential soft
                    skills like problem-solving, communication, and teamwork.
                </p>

                <p className="font-semibold"><strong>Highlights Include:</strong></p>
                <ul className="list-disc list-inside ml-5 space-y-1">
                    <li>AI Fundamentals & Applied Machine Learning</li>
                    <li>Data Science with Python and Power BI</li>
                    <li>Full-Stack Web Development with React and Django</li>
                    <li>Digital Transformation & Soft Skills Masterclass</li>
                </ul>

                <p className="font-semibold"><strong>Key Highlights:</strong></p>
                <ul className="list-disc list-inside ml-5 space-y-1">
                    <li>Beginner to advanced tracks for individuals and professionals</li>
                    <li>Real projects simulating industry challenges</li>
                    <li>Blended learning (self-paced + live mentorship)</li>
                    <li>Certification upon successful completion</li>
                </ul>
            </div>
        ),
    },
    {
        name: "Corporate Tech & Soft Skills Training",
        description:
            "We deliver tailored training in AI, Data Science, and Development to meet the specific needs of businesses.",
        icon: BriefcaseBusinessIcon,
        detail: (
            <div className="space-y-3">
                <p>
                    ADITA partners with companies to design and deliver customized
                    digital training solutions for their teams.
                    <br />
                    We align our programs with each organization's strategic goals,
                    focusing on upskilling employees to adopt and deploy AI, data
                    analytics, and digital transformation effectively.
                </p>

                <p className="font-semibold"><strong>Highlights Include:</strong></p>
                <ul className="list-disc list-inside ml-5 space-y-1">
                    <li>Onsite and virtual group training</li>
                    <li>Custom course content aligned to your industry</li>
                    <li>Pre- and post-training performance evaluation</li>
                    <li>Long-term workforce development partnerships</li>
                </ul>

                <p className="font-semibold"><strong>Who It’s For:</strong></p>
                <ul className="list-disc list-inside ml-5 space-y-1">
                    <li>Corporates seeking in-house AI and data capability</li>
                    <li>SMEs looking to modernize workflows</li>
                    <li>Public sector teams digitizing operations</li>
                </ul>
            </div>
        ),
    },
    {
        name: "Certification Programs",
        description:
            "Industry-recognized certifications to validate skills and enhance career prospects.",
        icon: Award,
        detail: (
            <div className="space-y-3">
                <p>
                    Our certification programs help professionals demonstrate their expertise
                    and stand out in competitive job markets.
                    <br />
                    Certifications integrate academic rigor with applied practice.
                </p>

                <p className="font-semibold"><strong>Highlights Include:</strong></p>
                <ul className="list-disc list-inside ml-5 space-y-1">
                    <li>Certified AI Solutions Professional (CAISP)</li>
                    <li>Advanced Machine Learning Engineer</li>
                    <li>Data Science for Finance</li>
                    <li>Digital Transformation Strategy Leader</li>
                </ul>

                <p className="font-semibold"><strong>Benefits:</strong></p>
                <ul className="list-disc list-inside ml-5 space-y-1">
                    <li>Globally recognized credentials</li>
                    <li>Portfolio-ready project work</li>
                    <li>Mentorship from industry experts</li>
                    <li>Enhanced employability and promotion prospects</li>
                </ul>
            </div>
        ),
    },
    {
        name: "Events & Conferences",
        description:
            "We host events and conferences that connect learners, professionals, and industry leaders.",
        icon: Handshake,
        detail: (
            <div className="space-y-3">
                <p>
                    ADITA organizes flagship summits, hackathons, and conferences that
                    bring together Africa’s digital community.
                    <br />
                    These events foster collaboration, spark innovation, and inspire
                    cross-sector partnerships.
                </p>

                <p className="font-semibold"><strong>Signiture Events:</strong></p>
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
        ),
    },
    {
        name: "Workshops & Bootcamps",
        description:
            "Intensive, hands-on training sessions to develop practical AI skills quickly.",
        icon: Users,
        detail: (
            <div className="space-y-3">
                <p>
                    Our workshops and bootcamps focus on rapid skill development through
                    immersive, project-based learning.
                    <br />
                    They’re ideal for learners who want to build practical capabilities
                    in a short time frame.
                </p>

                <p className="font-semibold"><strong>Highlights Include:</strong></p>
                <ul className="list-disc list-inside ml-5 space-y-1">
                    <li>AI for Business Leaders </li>
                    <li>Python for Data Science Bootcamp </li>
                    <li>Deep Learning with TensorFlow </li>
                </ul>

                <p className="font-semibold"><strong>Structure:</strong></p>
                <ul className="list-disc list-inside ml-5 space-y-1">
                    <li>70% hands-on, guided projects</li>
                    <li>Mentored sessions by practitioners</li>
                    <li>Post-bootcamp career guidance</li>
                    <li>Optional certification add-ons</li>
                </ul>
            </div>
        ),
    },
    {
        name: "Job Placement",
        description:
            "Connect with employers seeking AI talent across various industries in Africa.",
        icon: Briefcase,
        detail: (
            <div className="space-y-3">
                <p>
                    We bridge the gap between education and employment through our
                    Talent Connect program.
                    <br />
                    We actively match top-performing graduates with companies seeking
                    Talented Individuals.
                </p>

                <p className="font-semibold"><strong>Highlights Include:</strong></p>
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
        ),
    },
    {
        name: "AI Incubator",
        description:
            "Support for AI-driven startups and entrepreneurs to develop innovative solutions.",
        icon: Lightbulb,
        detail: (
            <div className="space-y-3">
                <p>
                    The ADITA AI Incubator nurtures early-stage startups leveraging AI,
                    data, and automation to address African challenges.
                    <br />
                    We provide mentorship, workspace access, investor linkages, and
                    technical support to transform ideas into scalable ventures.
                </p>

                <p className="font-semibold"><strong>Highlights Include:</strong></p>
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
        ),
    },
    {
        name: "Consultancy Services",
        description:
            "Strategic consulting services that guide organizations through every stage of digital transformation from vision to execution.",
        icon: Globe,
        detail: (
            <div className="space-y-3">
                <p>
                    ADITA provides expert consulting services that help governments, businesses,
                    and NGOs plan, execute, and sustain successful Digital Transformation initiatives.
                    <br />
                    Our consultants partner with clients to modernize legacy systems, improve digital
                    capabilities, and build data-driven, resilient organizations prepared for the future.
                    We focus on ensuring that each transformation aligns with strategic objectives,
                    regulatory standards, and long-term sustainability goals.
                </p>

                <p className="font-semibold"><strong>Highlights Include:</strong></p>
                <ul className="list-disc list-inside ml-5 space-y-1">
                    <li>Digital Maturity Assessments and Transformation Roadmaps</li>
                    <li>Cloud Strategy, Migration, and Infrastructure Modernization</li>
                    <li>Process Automation and Intelligent Workflow Design</li>
                    <li>Data Strategy, Analytics, and Insight-Driven Decision Making</li>
                    <li>Cybersecurity Integration and Digital Risk Management</li>
                    <li>Governance Frameworks and Organizational Change Management</li>
                </ul>
                <p className="font-semibold"><strong>Target Clients:</strong></p>
                <ul className="list-disc list-inside ml-5 space-y-1">
                    <li>Private Sectors: Banks (Finance), Tech Companies, Agri-Businesses, Healthcare Providers.</li>
                    <li>Public Sectors: Government Ministries (e.g., Health, Agriculture, Digital Economy).</li>
                    <li>NGOs & Development Partners</li>
                </ul>
            </div>
        ),
    },
    {
        name: "Partnerships",
        description:
            "Building impactful collaborations across public, private, and non-profit sectors to drive sustainable digital transformation.",
        icon: Handshake,
        detail: (
            <div className="space-y-3">
                <p>
                    ADITA partners with organizations across the <strong>private sector</strong> including
                    <strong> banks and financial institutions</strong>, <strong>technology companies</strong>,
                    <strong> agri-businesses</strong>, and <strong>healthcare providers</strong> to accelerate
                    innovation, enhance operational efficiency, and strengthen digital capabilities.
                    <br />
                    <br />
                    In the <strong>public sector</strong>, we collaborate with <strong>government ministries </strong>
                    such as Health, Agriculture, and Digital Economy to design and implement policies, platforms,
                    and governance frameworks that drive inclusive and secure digital growth.
                    <br />
                    <br />
                    ADITA also works closely with <strong>NGOs and development partners</strong> to support
                    social impact initiatives, digital inclusion programs, and data-driven development strategies
                    that advance community and national objectives.
                </p>

                <p className="font-semibold"><strong>Our Collaboration Focus:</strong></p>
                <ul className="list-disc list-inside ml-5 space-y-1">
                    <li>Joint Digital Transformation Planning and Execution</li>
                    <li>Policy Design and Implementation Support</li>
                    <li>Capacity Building and Skills Development Programs</li>
                    <li>Public–Private Partnership Facilitation</li>
                    <li>Technology Integration for Sustainable Development</li>
                </ul>
            </div>
        ),
    },];


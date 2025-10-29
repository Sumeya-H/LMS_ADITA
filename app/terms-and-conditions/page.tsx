import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
    return (
        <section className="py-12 px-4 md:px-6 text-gray-800">
            <div className="container mx-auto max-w-4xl">
                <Card >
                    <CardContent className="pt-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
                            Terms & Conditions
                        </h1>
                        <p className="text-center text-sm text-gray-600 mb-8">
                            Effective Date: October 27, 2025
                        </p>

                        <div className="p-6 md:p-10 space-y-8">
                            {/* Sections */}
                            <section>
                                <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                                <p>
                                    Welcome to{" "}
                                    <strong>
                                        African Digital Innovation and Technology Academy (ADITA)
                                    </strong>
                                    . These Terms and Conditions (“Terms”) govern your use of our
                                    website, registration services, and participation in our
                                    online and blended courses related to Artificial Intelligence
                                    (AI), Digital Innovation, and Technology.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    2. Acceptance of Terms
                                </h2>
                                <p>
                                    By accessing or registering on the ADITA website{" "}
                                    <a
                                        href="https://aditacademy.co"
                                        className="text-blue-700 hover:underline"
                                    >
                                        aditacademy.co
                                    </a>{" "}
                                    and its learning management system (LMS), you acknowledge that
                                    you have read, understood, and agree to be bound by these
                                    Terms. If you do not agree, you must not use our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">3. Definitions</h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        <strong>"Academy"</strong> or <strong>"ADITA"</strong> refers to the African
                                        Digital Innovation and Technology Academy.
                                    </li>
                                    <li>
                                        <strong>"User", “You”, “Your” </strong>or <strong>“Participant”</strong>  refers to the graduate, professional, or any individual registering for or using our services.
                                    </li>
                                    <li>
                                        <strong>"Course"</strong>means any Educational content or program
                                        delivered by ADITA, online or blended.
                                    </li>
                                    <li>
                                        <strong>"Services"</strong> refers to all educational, informational and related
                                        services provided by ADITA via its online platforms.
                                    </li>
                                    <li>
                                        <strong>"Platform"</strong> means ADITA’s website,  Learning Management System (LMS), or other
                                        approved tools used for course delivery.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    4. Eligibility and Registration
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        If you are under 18, registration must be done by a parent or guardian.
                                    </li>
                                    <li>
                                        You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate.
                                    </li>
                                    <li>
                                        ADITA reserves the right to verify your identity and qualifications.
                                    </li>
                                    <li>
                                        You are responsible for the security of your account credentials and for all activities that occur under your account.
                                    </li>
                                    <li>
                                        You must notify ADITA immediately of any unauthorized use of your account.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    5. Course Enrollment and Payment
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        Registration is done online through ADITA’s official website or LMS.
                                    </li>
                                    <li>
                                        You must complete all required fields truthfully.
                                    </li>
                                    <li>
                                        Submission of the online registration form constitutes an offer to enroll in a course.
                                    </li>
                                    <li>
                                        Course fees are payable in Ethiopian Birr (ETB) or USD via secure gateways like Telebirr or Chapa.
                                    </li>
                                    <li>
                                        Course fees must be paid in full or by an approved installment plan before course access is granted.
                                    </li>
                                    <li>
                                        A place in the course is only confirmed once ADITA has sent a formal confirmation email and full payment (or the first installment, if applicable) has been received.
                                    </li>
                                    <li>
                                        All course fees are quoted in Ethiopian Birr or USD (if specified) and are inclusive of any applicable taxes, unless otherwise stated.
                                    </li>
                                    <li>
                                        All payments are processed securely using authorized payment gateways such as Telebirr or Chapa in Ethiopian Birr (ETB).
                                    </li>
                                    <li>
                                        ADITA is not responsible for payment errors caused by incorrect details or third-party platforms.
                                    </li>
                                    <li>
                                        Any scholarships or discounts are subject to specific terms outlined at the time of offer and cannot be combined unless explicitly stated.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    6. Course Access and Delivery
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        Access credentials (username and password) are personal and non-transferable.
                                    </li>
                                    <li>
                                        Participants must maintain the confidentiality of their login information.
                                    </li>
                                    <li>
                                        Courses may include live virtual sessions, recorded videos, downloadable materials, and assessments.
                                    </li>
                                    <li>
                                        ADITA reserves the right to modify course content, instructors, or schedules as needed for academic or technical reasons.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    7. Intellectual Property
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        All course materials, including but not limited to videos, presentations, documents, code, quizzes, and the LMS structure, are the intellectual property of ADITA or its licensors. They are provided for your personal, non-commercial, educational use only.
                                    </li>
                                    <li>
                                        You may not download, reproduce, distribute, modify, sell, or share any course materials without the prior written consent of ADITA.
                                    </li>
                                    <li>
                                        By submitting assignments, posts, or other content to the LMS, you grant ADITA a non-exclusive, royalty-free license to use, store, and reproduce that content for the purpose of assessing your work and operating the course.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    8. Code of Conduct
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        Conduct yourself in a respectful and professional manner in all interactions with instructors, staff, and other students.
                                    </li>
                                    <li>
                                        Not engage in any form of harassment, discrimination, or disruptive behavior.
                                    </li>
                                    <li>
                                        Not misuse the LMS or any platform to distribute spam, malware, or illegal content.
                                    </li>
                                    <li>
                                        ADITA reserves the right to suspend or terminate your access to a course and the LMS for violations of this code without a refund.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    9. Disclaimer and Limitation of Liability
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        ADITA provides educational services but does not guarantee employment, career advancement, or specific outcomes upon course completion.
                                    </li>
                                    <li>
                                        While ADITA strives to ensure the LMS is available 24/7, we do not guarantee uninterrupted access and are not liable for any downtime due to technical issues, maintenance, or factors beyond our control (e.g., internet outages in Ethiopia).
                                    </li>
                                    <li>
                                        To the fullest extent permitted by Ethiopian law, ADITA's total liability to you for any claim arising from these Terms or the Services is limited to the course fees you have paid.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    10. Certificates and Assessment
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        Certificates are issued only upon successful completion of course requirements.
                                    </li>
                                    <li>
                                        ADITA reserves the right to verify identity and performance before issuing certificates.
                                    </li>
                                    <li>
                                        Certificates are digital unless otherwise specified.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    11. Cancellation, Refund, and Transfer Policy
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        <strong>Cancellation by You: </strong>
                                        You may cancel your enrollment by notifying ADITA in writing.
                                    </li>
                                    <li>
                                        Cancellation more than 15 days before the course start date: Full refund.
                                    </li>
                                    <li>
                                        Cancellation less than 15 days but before the course start date: 50% refund.
                                    </li>
                                    <li>
                                        Cancellation after the course has started: No refund.
                                    </li>
                                    <li>
                                        <strong>Cancellation by ADITA: </strong>
                                        ADITA reserves the right to cancel a course due to low enrollment or unforeseen circumstances. In such a case, you will receive a full refund of all fees paid.
                                    </li>
                                    <li>
                                        <strong>Course Transfer: </strong>
                                        Requests to transfer to a different course cohort will be considered on a case-by-case basis and may be subject to an administrative fee.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    12. Limitation of Liability
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        ADITA is not liable for any loss or damage arising from interruptions, technical issues, or unauthorized access caused by factors beyond its control.
                                    </li>
                                    <li>
                                        ADITA provides all courses “as is” without guarantees of job placement or specific outcomes.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    13. Data Protection and Privacy
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        Your personal data is collected and processed in accordance with ADITA’s Privacy Policy and the Ethiopian Personal Data Protection Proclamation.
                                    </li>
                                    <li>
                                        By registering, you consent to the processing of your information for educational, administrative, and communication purposes.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">14. Termination</h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        ADITA may suspend or terminate your account if you breach these Terms or engage in unethical or unlawful activities.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    15. Governing Law and Dispute Resolution
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        These Terms shall be governed by and construed in accordance with the laws of the Federal Democratic Republic of Ethiopia.
                                    </li>
                                    <li>
                                        Any dispute arising from these Terms shall first be attempted to be resolved through amicable negotiations. If unresolved, the dispute shall be settled by the competent courts of Addis Ababa, Ethiopia.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">16. Amendments</h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        ADITA reserves the right to modify these Terms at any time. Changes will be communicated via email or a notice on the website and will be effective immediately upon posting. Your continued use of the Services constitutes acceptance of the revised Terms.
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>


    );
}

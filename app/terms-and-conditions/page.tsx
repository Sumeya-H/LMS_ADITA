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
                        {/*<p className="text-center text-sm text-gray-600 mb-8">
                            Effective Date: October 27, 2025
                        </p>*/}

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
                                        <strong>Academy</strong> or <strong>ADITA</strong>: African
                                        Digital Innovation and Technology Academy.
                                    </li>
                                    <li>
                                        <strong>User / Participant</strong>: Any graduate,
                                        professional, or individual registering for or using our
                                        services.
                                    </li>
                                    <li>
                                        <strong>Course</strong>: Educational content or program
                                        delivered by ADITA.
                                    </li>
                                    <li>
                                        <strong>Services</strong>: All educational and related
                                        services provided via ADITA’s online platforms.
                                    </li>
                                    <li>
                                        <strong>Platform</strong>: ADITA’s website, LMS, or other
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
                                        You must be at least 18 years old or have a parent/guardian
                                        register on your behalf.
                                    </li>
                                    <li>
                                        Provide accurate and complete registration details and
                                        update them as needed.
                                    </li>
                                    <li>
                                        ADITA reserves the right to verify identity and
                                        qualifications.
                                    </li>
                                    <li>
                                        You are responsible for the security of your credentials and
                                        must report any unauthorized use.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    5. Course Enrollment and Payment
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Registration is done through ADITA’s website or LMS.</li>
                                    <li>
                                        Submitting the form constitutes an offer to enroll;
                                        confirmation is sent upon payment approval.
                                    </li>
                                    <li>
                                        Course fees are payable in Ethiopian Birr (ETB) or USD via
                                        secure gateways like Telebirr or Chapa.
                                    </li>
                                    <li>
                                        Scholarships or discounts follow specific terms and cannot
                                        be combined unless stated.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    6. Course Access and Delivery
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Login credentials are personal and non-transferable.</li>
                                    <li>
                                        Courses may include live sessions, recordings, materials,
                                        and assessments.
                                    </li>
                                    <li>
                                        ADITA may update course content, instructors, or schedules
                                        as needed.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    7. Intellectual Property
                                </h2>
                                <p>
                                    All course materials are the intellectual property of ADITA or
                                    its licensors and are provided for personal educational use
                                    only. You may not reproduce, distribute, or sell any materials
                                    without written consent. By submitting work, you grant ADITA a
                                    non-exclusive, royalty-free license to use it for academic
                                    purposes.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    8. Code of Conduct
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        Maintain respectful and professional behavior in all
                                        interactions.
                                    </li>
                                    <li>No harassment, discrimination, or misuse of the LMS.</li>
                                    <li>
                                        Violations may lead to suspension or termination without
                                        refund.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    9. Disclaimer and Limitation of Liability
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        ADITA does not guarantee employment or career outcomes upon
                                        course completion.
                                    </li>
                                    <li>
                                        While the LMS aims for 24/7 availability, ADITA is not
                                        liable for downtimes or internet issues.
                                    </li>
                                    <li>
                                        Liability for any claim is limited to the total course fees
                                        paid.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    10. Certificates and Assessment
                                </h2>
                                <p>
                                    Certificates are issued upon successful completion of
                                    requirements and identity verification. Certificates are
                                    digital unless otherwise stated.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    11. Cancellation, Refund, and Transfer Policy
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        <strong>Cancellation by You:</strong>
                                        <ul className="list-disc pl-6">
                                            <li>More than 15 days before start: Full refund.</li>
                                            <li>Less than 15 days before start: 50% refund.</li>
                                            <li>After course start: No refund.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>Cancellation by ADITA:</strong> Full refund if
                                        course is canceled by ADITA.
                                    </li>
                                    <li>
                                        <strong>Course Transfer:</strong> Requests may be accepted
                                        case-by-case with administrative fees.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    12. Limitation of Liability
                                </h2>
                                <p>
                                    ADITA is not liable for any technical issues or damages caused
                                    by factors beyond its control. Courses are provided “as is,”
                                    with no guarantee of job placement.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    13. Data Protection and Privacy
                                </h2>
                                <p>
                                    Your personal data is processed per ADITA’s Privacy Policy and
                                    Ethiopian data protection laws. By registering, you consent to
                                    this processing for educational and communication purposes.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">14. Termination</h2>
                                <p>
                                    ADITA may suspend or terminate your account for breaches of
                                    these Terms or unethical conduct.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">
                                    15. Governing Law and Dispute Resolution
                                </h2>
                                <p>
                                    These Terms are governed by the laws of the Federal Democratic
                                    Republic of Ethiopia. Disputes shall first be resolved
                                    amicably; unresolved cases will be handled by courts in Addis
                                    Ababa, Ethiopia.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-2">16. Amendments</h2>
                                <p>
                                    ADITA may modify these Terms at any time. Changes will be
                                    announced via email or website notice and take effect
                                    immediately. Continued use of the services indicates
                                    acceptance of the updated Terms.
                                </p>
                            </section>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>


    );
}

"use client"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicy() {
    return (
        <section className="py-12 px-4 md:px-6">
            <div className="container mx-auto max-w-5xl">
                <Card className="p-6 md:p-10">
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-[#3D2A1A] mb-2">Privacy Policy</h1>
                            {/* <p className="text-gray-600">Effective Date: October 27, 2025</p>*/}
                        </div>

                        <p>
                            African Digital Innovation and Technology Academy ("ADITA," "we," "us," "our") is committed to protecting your
                            privacy and complying with applicable data protection laws, including the Ethiopian Data Proclamation. This policy
                            explains how we collect, use, store, and protect your personal information when you use our website and services.
                        </p>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">1. Information We Collect</h2>
                        <p>We collect information that you provide directly to us and through automated technologies.</p>

                        <h3 className="text-xl font-semibold text-[#3D2A1A]">Personal Information:</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Full Name, Email Address, Phone Number</li>
                            <li>Educational and Professional Background</li>
                            <li>Payment Information (handled by secure payment processors)</li>
                            <li>Government-Issued ID (for verification, if required for certification)</li>
                            <li>Your interactions, assignments, and forum posts within the LMS</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-[#3D2A1A]">Automatically Collected Information:</h3>
                        <p>
                            When you visit our site, we may collect data such as your IP address, browser type, device information, and pages
                            you visit through cookies and similar tracking technologies.
                        </p>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">2. How We Use Your Information</h2>
                        <p>We use your personal information for the following purposes:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>To Provide Our Services:</strong> Create and manage your account, enroll you in courses, process payments, and deliver course content.</li>
                            <li><strong>To Communicate With You:</strong> Send you course-related announcements, support responses, and updates.</li>
                            <li><strong>To Improve Our Services:</strong> Analyze user interactions to improve experience and develop new courses.</li>
                            <li><strong>For Certification:</strong> Verify your identity and issue certificates of completion.</li>
                            <li><strong>For Marketing (with Consent):</strong> Share updates about courses, events, and promotions.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">3. How We Share Your Information</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Service Providers:</strong> Trusted vendors for payment, hosting, and LMS operations.</li>
                            <li><strong>Legal Obligation:</strong> If required by law or a government agency.</li>
                            <li><strong>With Your Consent:</strong> For any other disclosure, we will request your explicit permission.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">4. Data Storage and Security</h2>
                        <p>
                            In compliance with Ethiopian law, your personal data is stored on servers located within the Federal Democratic
                            Republic of Ethiopia. We implement encryption and strict access controls to prevent unauthorized access or misuse.
                        </p>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">5. Your Data Protection Rights</h2>
                        <p>Under the Ethiopian Data Proclamation, you have the right to:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Access and obtain a copy of your data</li>
                            <li>Request correction of inaccurate or incomplete data</li>
                            <li>Request deletion (“right to be forgotten”) under certain conditions</li>
                            <li>Restrict or object to data processing</li>
                            <li>Opt out of marketing communications</li>
                        </ul>
                        <p>
                            To exercise these rights, contact our Data Protection Officer at{" "}
                            <a href="mailto:info@aditacademy.co" className="text-blue-600 underline">info@aditacademy.co</a>.
                        </p>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">6. Data Retention</h2>
                        <p>
                            We retain your data only as long as necessary for educational, legal, or accounting purposes, after which it is
                            securely deleted or anonymized.
                        </p>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">7. Cookies and Tracking</h2>
                        <p>
                            Our website uses cookies to enhance your experience. You can disable cookies in your browser settings, but some
                            site features may not function properly.
                        </p>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">8. Contact Us</h2>
                        <p>
                            For any questions or to exercise your rights, contact our Data Protection Officer: <br />
                            <strong>Email:</strong>{" "}
                            <a href="mailto:info@aditacademy.co" className="text-blue-600 underline">info@aditacademy.co</a>
                        </p>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">9. Changes to This Privacy Policy</h2>
                        <p>
                            We may update this policy from time to time. The latest version will always be posted on our website with an updated
                            “Effective Date.” Continued use of our services signifies your acceptance of these changes.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

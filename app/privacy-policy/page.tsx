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
                            <p className="text-gray-600">Effective Date: October 27, 2025</p>
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
                        <p>We use your personal information for the following purposes, relying on the legal bases of <strong>performance of a contract, legitimate interest, and your consent </strong>as per Article 6 of the Data Proclamation: </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>To Provide Our Services:</strong> Create and manage your account, enroll you in courses, process payments, and deliver course content.</li>
                            <li><strong>To Communicate With You:</strong> Send you course-related announcements, support responses, and updates.</li>
                            <li><strong>To Improve Our Services:</strong> Analyze user interactions to improve experience and develop new courses.</li>
                            <li><strong>For Certification:</strong> Verify your identity and issue certificates of completion.</li>
                            <li><strong>For Marketing (with Consent):</strong> Share updates about courses, events, and promotions.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">3. How We Share Your Information</h2>
                        <p>We do not sell your personal data. We may share your information with third parties only in the following circumstances:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Service Providers:</strong> With trusted third-party vendors who perform services on our behalf, such as payment processing (e.g., telebirr, Chapa), data hosting (within Ethiopia, as required by law), and LMS platform maintenance. These partners are contractually bound to protect your data. </li>
                            <li><strong>Legal Obligation:</strong> If required to do so by law or in response to a valid request by a public authority (e.g., a court or government agency in Ethiopia). </li>
                            <li><strong>With Your Consent:</strong> For any other purpose, we will disclose only with your explicit consent. </li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">4. Data Storage and Internaltional Transfer</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>
                                <strong>Data Localization:</strong> In compliance with Article 6 of the Ethiopian Data Proclamation, we will store and process your personal data on servers located <strong> within the Federal Democratic Republic of Ethiopia.</strong>
                            </li>
                            <li>
                                <strong>Security:</strong> We implement appropriate technical and organizational measures (e.g., encryption, access controls) to protect your data against unauthorized access, alteration, or destruction.
                            </li>
                        </ul>
                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">5. Your Data Protection Rights (As Per Ethiopian Law)</h2>
                        <p>Under the Ethiopian Data Proclamation, you have the following rights regarding your personal data:</p>
                        <ul className="list-disc pl-6 space-y-1">




                            <li>
                                <strong>Right of Access:</strong> You can request a copy of the personal data we hold about you.
                            </li>
                            <li>
                                <strong>Right to Rectification:</strong> You can request correction of inaccurate or incomplete data.
                            </li>
                            <li>
                                <strong>Right to Erasure (Right to be forgotten):</strong> You can request the deletion of your personal data under certain conditions.
                            </li>
                            <li>
                                <strong>Right to Restrict Processing:</strong> You can request that we temporarily or permanently stop processing all or some of your personal data.
                            </li>
                            <li>
                                <strong>Right to Object:</strong> You can object to the processing of your personal data for specific purposes, such as direct marketing.
                            </li>
                        </ul>
                        <p>
                            To exercise these rights, contact our Data Protection Officer at{" "}
                            <a href="mailto:info@aditacademy.co" className="text-blue-600 underline">info@aditacademy.co</a>.
                        </p>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">6. Data Retention</h2>
                        <p>
                            We will retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, including for academic record-keeping, legal, or accounting requirements. We will securely delete or anonymize your data upon the expiration of the retention period.
                        </p>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">7. Cookies and Tracking</h2>
                        <p>
                            Our website uses cookies to distinguish you from other users, which help us provide a better experience. You can set your browser to refuse all or some browser cookies, but this may impair the functionality of our website.
                        </p>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">8. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact our Data Protection Officer at: <br />
                            <strong>Email:</strong>{" "}
                            <a href="mailto:info@aditacademy.co" className="text-blue-600 underline">info@aditacademy.co</a>
                        </p>

                        <h2 className="text-2xl font-semibold text-[#3D2A1A]">9. Changes to This Privacy Policy</h2>
                        <p>
                            We may update this policy from time to time. The updated version will be indicated by an updated "Effective Date" and will be effective as soon as it is accessible. We will notify you of any material changes via email or a prominent notice on our service.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

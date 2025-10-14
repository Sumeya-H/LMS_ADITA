import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CalendarIcon, PhoneIcon, MapPinIcon } from "lucide-react"

export default function UpcomingEvent() {
    return (
        <section className="py-12 px-4 md:px-6 bg-[#F7E8CB]">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Previous Event</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="relative">
                        <Image
                            src="/seminar.png"
                            alt="Public Seminar on AI's Impact & Africa's Future"
                            width={500}
                            height={500}
                            className="rounded-lg shadow-lg mx-auto"
                            priority
                        />
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl md:text-3xl font-bold">Public Seminar on AI's Impact & Africa's Future</h3>

                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5 text-[#52331E]" />
                            <p className="text-lg">June 13, Friday at 13:30 Ethiopian Time (12:30 Oslo Time)</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPinIcon className="h-5 w-5 text-[#52331E]" />
                            <p className="text-lg">AAIT, Addis Ababa, Ethiopia</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-xl mb-2">Distinguished Speakers:</h4>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                                <li>
                                    <span className="font-semibold">Prof. Josef:</span> Insights on "AI to All: Opportunities and
                                    Challenges"
                                </li>
                                <li>
                                    <span className="font-semibold">Prof. Abebe:</span> Discussing "Shaping Africa: ADITA in AI Training
                                    for Services, Technological Innovation, and Entrepreneurship"
                                </li>
                            </ul>
                        </div>

                        {/*<div className="pt-4">
              <Button className="bg-[#52331E] hover:bg-[#3a2416] text-white px-8 py-6 text-lg rounded-full">
                <PhoneIcon className="h-5 w-5 mr-2" />
                Register Now: (251) 116 679 207
              </Button>
              <p className="mt-4 text-sm text-gray-600">For more information, contact us at: info@aditacademy.co</p>
            </div>*/}
                    </div>
                </div>
            </div>
        </section>
    )
}

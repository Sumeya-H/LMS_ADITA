"use client";

import { Phone, Mail, MapPin } from "lucide-react";

export default function AfricomCard() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div
                className="w-[390px] h-[780px] bg-white text-[#234489] rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.15)] overflow-hidden border border-[#e0e0e0] flex flex-col relative"
            >
                {/* Pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(45deg, #234489 0px, #234489 1px, transparent 1px, transparent 12px)",
                    }}
                />

                {/* Header / Logo */}
                <div className="bg-white pt-6 pb-4 px-6 text-center z-10">
                    <img
                        src="https://africom.et/Images/Africom_Logo.png"
                        alt="Africom Logo"
                        className="h-10 mx-auto object-contain"
                    />

                    <p className="text-[11px] text-[#234489] mt-2 leading-snug font-medium">
                        African Communications & Technology
                    </p>
                </div>

                {/* Profile picture */}
                <div className="flex justify-center mt-4 z-10">
                    <img
                        src="https://aditacademy.co/images/teams/shegaw_anagaw.jpeg"
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 px-6 pt-4 pb-5 flex flex-col justify-between z-10">

                    {/* Identity */}
                    <div className="text-center">
                        <h1 className="text-xl font-semibold text-[#234489]">
                            Professor Shegaw Anagaw
                        </h1>

                        <p className="text-sm text-[#098d4b] mt-2 font-medium">
                            Director of International Business & Strategic Outsourcing
                        </p>

                        <p className="text-xs text-[#555555] mt-2">
                            Founder, DARMONEL • Professor at USN
                        </p>

                        <div className="w-20 h-[2px] bg-[#234489] mx-auto mt-4 rounded-full" />
                    </div>

                    {/* About */}
                    <div className="mt-4 text-xs text-[#333333] leading-relaxed bg-white p-3 rounded-lg border border-[#e0e0e0]">
                        Researcher in digital health, public sector digitalization, and IS/IT innovation.
                        Expertise in AI, Machine Learning, Data Science, IT Governance, and Smart Cities.
                    </div>

                    {/* Contact */}
                    <div className="mt-4 space-y-3 text-sm">

                        <a href="tel:+251951108014" className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-[#234489]">
                                <Phone size={16} /> Mobile
                            </span>
                            <span className="text-right text-xs">
                                +251-951-108014<br />+47-406-726-65
                            </span>
                        </a>

                        <a href="mailto:shegawa@africom.et" className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-[#234489]">
                                <Mail size={16} /> Email
                            </span>
                            <span className="text-right text-xs break-all">
                                shegawa@africom.et<br />
                                shegaw.mengiste@usn.no
                            </span>
                        </a>

                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-[#234489]">
                                <MapPin size={16} /> Location
                            </span>
                            <span className="text-right">
                                Addis Ababa, Ethiopia
                            </span>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                        <a
                            href="mailto:shegawa@aditacademy.co"
                            className="flex-1 text-center py-2 rounded-lg bg-[#234489] text-white text-xs"
                        >
                            Email
                        </a>

                        <a
                            href="tel:+251951108014"
                            className="flex-1 text-center py-2 rounded-lg border border-[#234489] text-[#234489] text-xs"
                        >
                            Call
                        </a>
                    </div>

                    {/* Footer / QR */}
                    <div className="flex items-center justify-between mt-5">
                        <div>
                            <p className="text-xs text-[#234489] tracking-wide">AFRICOM</p>
                            <p className="text-xs text-[#098d4b]">Innovation • Business • Impact</p>
                        </div>

                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=BEGIN:VCARD%0AVERSION:3.0%0AFN:Shegaw%20Anagaw%0ATEL:+251951108014%0AEMAIL:shegawa@aditacademy.co%0AEND:VCARD"
                            alt="QR Code"
                            className="w-20 h-20 rounded-md border"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}

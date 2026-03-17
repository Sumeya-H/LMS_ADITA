"use client";

import { Phone, Mail, MapPin } from "lucide-react";

export default function BusinessCard() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">

            {/* Card */}
            <div className="w-[390px] h-[800px] bg-card text-card-foreground rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.15)] overflow-hidden border relative flex flex-col">

                {/* Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(45deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 1px, transparent 1px, transparent 12px)",
                    }}
                />

                {/* Header */}
                <div className="bg-muted pt-6 pb-4 px-6 text-center z-10">
                    <img
                        src="/adita-logo.png"
                        alt="ADITA Logo"
                        className="h-10 mx-auto object-contain"
                    />

                    <p className="text-[11px] text-primary mt-2 leading-snug font-medium">
                        African Digital & Innovation
                        <br />
                        Technology Academy (ADITA)
                    </p>
                </div>

                {/* Profile */}
                <div className="flex justify-center mt-4 z-10">
                    <img
                        src="/images/teams/shegaw_anagaw.jpeg"
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-background shadow-xl"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 px-6 pt-4 pb-5 flex flex-col justify-between z-10">

                    {/* Identity */}
                    <div className="text-center">
                        <h1 className="text-xl font-semibold">
                            Professor Shegaw Anagaw
                        </h1>

                        <p className="text-sm text-primary mt-2 font-medium">
                            Co-Founder & CEO
                        </p>

                        <p className="text-xs text-muted-foreground mt-2">
                            Founder, DARMONEL • Professor at USN
                        </p>

                        <div className="w-20 h-[2px] bg-primary mx-auto mt-4 rounded-full" />
                    </div>

                    {/* About */}
                    <div className="mt-4 text-xs text-muted-foreground leading-relaxed bg-muted p-3 rounded-lg border">
                        Researcher in digital health, public sector digitalization, and IS/IT innovation.
                        Expertise in AI, Machine Learning, Data Science, IT Governance, and Smart Cities.
                    </div>

                    {/* Contact */}
                    <div className="mt-4 space-y-3 text-sm">

                        <a href="tel:+251951108014" className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-primary">
                                <Phone size={16} /> Mobile
                            </span>
                            <span className="text-right text-xs">
                                +251-951-108014<br />
                                +47-406-726-65
                            </span>
                        </a>

                        <a href="mailto:shegawa@aditacademy.co" className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-primary">
                                <Mail size={16} /> Email
                            </span>
                            <span className="text-right text-xs break-all">
                                shegawa@aditacademy.co<br />
                                shegaw.mengiste@usn.no
                            </span>
                        </a>

                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-primary">
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
                            className="flex-1 text-center py-2 rounded-lg bg-primary text-primary-foreground text-xs"
                        >
                            Email
                        </a>

                        <a
                            href="tel:+251951108014"
                            className="flex-1 text-center py-2 rounded-lg border border-primary text-primary text-xs"
                        >
                            Call
                        </a>

                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-5">

                        <div>
                            <p className="text-xs text-primary tracking-wide">ADITA</p>
                            <p className="text-xs text-muted-foreground">
                                Innovation • Education • Impact
                            </p>
                        </div>

                        {/* QR */}
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

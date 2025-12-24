import React, { useState } from "react";
import { Input } from "./input";
import { Select } from "./select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const countryCodes = [
    { value: "+251", label: "🇪🇹 +251" },
];

const PhoneNumberInput = ({ setNumber, valid }) => {
    const [countryCode, setCountryCode] = useState("+251");
    const [phone, setPhone] = useState("");
    const [isValid, setIsValid] = useState(true);

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setPhone(value);

        const fullNumber = countryCode + value;
        setNumber(fullNumber);

        // Ethiopia numbers are 9 digits (without country code)
        setIsValid(value.length === 9);
        valid(value.length === 9);
    };

    return (
        <div className="w-full">
            {/* Combined Input */}
            <div
                className={`flex items-center border hover:border-primary rounded-lg overflow-hidden ${!isValid ? "border-red-500" : "border-gray-300"}`}
            >
                {/* Country Code Select */}
                <Select>
                    <SelectTrigger className="w-fit rounded-r-none" id="background">
                        <SelectValue placeholder="+251" />
                    </SelectTrigger>
                    <SelectContent
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-fit"
                    >
                        <SelectItem className="w-fit " value="+251">+251</SelectItem>
                    </SelectContent>
                </Select>

                {/* Phone Input */}
                <Input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="912345678"
                    className="rounded-l-none focus-visible:border-l-0"
                    required
                />
            </div>

            {/* Error Message */}
            {!isValid && (
                <p className="text-red-500 text-sm mt-1">
                    Enter a valid 9-digit Ethiopian phone number
                </p>
            )}
        </div>
    );
};

export default PhoneNumberInput;

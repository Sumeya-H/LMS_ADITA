"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"

type Filters = {
    duration: string[]
    level: string[]
    format: string[]
    priceRange: [number, number]
}

type ProgramFiltersProps = {
    defaultFilters?: Filters
    onApply: (filters: Filters) => void
    onReset?: () => void
}

export default function ProgramFilters({
    defaultFilters = {
        duration: [],
        level: [],
        format: [],
        priceRange: [0, 500]
    },
    onApply,
    onReset
}: ProgramFiltersProps) {
    const [filters, setFilters] = useState<Filters>(defaultFilters)

    const toggleFilter = (category: keyof Filters, value: string) => {
        setFilters((prev) => {
            const list = prev[category] as string[]
            const updated = list.includes(value)
                ? list.filter((v) => v !== value)
                : [...list, value]
            return { ...prev, [category]: updated }
        })
    }

    const handleApply = () => {
        onApply(filters)
    }

    const handleReset = () => {
        const resetState: Filters = {
            duration: [],
            level: [],
            format: [],
            priceRange: [0, 500]
        }
        setFilters(resetState)
        if (onReset) onReset()
        onApply(resetState)
    }

    return (
        <div className="space-y-6">
            <div className="text-lg font-semibold">Filter Programs</div>

            <Accordion type="multiple" defaultValue={["duration", "level", "format", "price"]}>
                {/* Duration */}
                <AccordionItem value="duration">
                    <AccordionTrigger>Duration</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {["short", "medium", "long", "custom"].map((val) => (
                                <div key={val} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`duration-${val}`}
                                        checked={filters.duration.includes(val)}
                                        onCheckedChange={() => toggleFilter("duration", val)}
                                    />
                                    <Label htmlFor={`duration-${val}`}>
                                        {{
                                            short: "Short (1–4 weeks)",
                                            medium: "Medium (5–8 weeks)",
                                            long: "Long (9+ weeks)",
                                            custom: "Customizable"
                                        }[val]}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Level */}
                <AccordionItem value="level">
                    <AccordionTrigger>Skill Level</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {["beginner", "intermediate", "advanced", "all"].map((val) => (
                                <div key={val} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`level-${val}`}
                                        checked={filters.level.includes(val)}
                                        onCheckedChange={() => toggleFilter("level", val)}
                                    />
                                    <Label htmlFor={`level-${val}`}>
                                        {val.charAt(0).toUpperCase() + val.slice(1)}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Format */}
                <AccordionItem value="format">
                    <AccordionTrigger>Format</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {["online", "inperson", "blended", "custom"].map((val) => (
                                <div key={val} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`format-${val}`}
                                        checked={filters.format.includes(val)}
                                        onCheckedChange={() => toggleFilter("format", val)}
                                    />
                                    <Label htmlFor={`format-${val}`}>
                                        {{
                                            online: "Online",
                                            inperson: "In-person",
                                            blended: "Blended",
                                            custom: "Customizable"
                                        }[val]}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/*
                <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4">
                            <Slider
                                min={0}
                                max={500}
                                step={10}
                                value={filters.priceRange}
                                onValueChange={(range) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        priceRange: range as [number, number]
                                    }))
                                }
                            />
                            <div className="flex items-center justify-between">
                                <span>${filters.priceRange[0]}</span>
                                <span>${filters.priceRange[1]}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>*/}
            </Accordion>

            <Button className="w-full" onClick={handleApply}>
                Apply Filters
            </Button>
            <Button variant="outline" className="w-full" onClick={handleReset}>
                Reset
            </Button>
        </div>
    )
}


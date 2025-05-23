"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProgramFilters() {
  const [priceRange, setPriceRange] = useState([0, 500])

  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold">Filter Programs</div>

      <Accordion type="multiple" defaultValue={["duration", "level", "format", "price"]}>
        <AccordionItem value="duration">
          <AccordionTrigger>Duration</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="duration-short" />
                <Label htmlFor="duration-short">Short (1-4 weeks)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="duration-medium" />
                <Label htmlFor="duration-medium">Medium (5-8 weeks)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="duration-long" />
                <Label htmlFor="duration-long">Long (9+ weeks)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="duration-custom" />
                <Label htmlFor="duration-custom">Customizable</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="level">
          <AccordionTrigger>Skill Level</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="level-beginner" />
                <Label htmlFor="level-beginner">Beginner</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="level-intermediate" />
                <Label htmlFor="level-intermediate">Intermediate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="level-advanced" />
                <Label htmlFor="level-advanced">Advanced</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="level-all" />
                <Label htmlFor="level-all">All Levels</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="format">
          <AccordionTrigger>Format</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="format-online" />
                <Label htmlFor="format-online">Online</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="format-inperson" />
                <Label htmlFor="format-inperson">In-person</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="format-blended" />
                <Label htmlFor="format-blended">Blended</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="format-custom" />
                <Label htmlFor="format-custom">Customizable</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[0, 500]} max={500} step={10} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-custom" />
                <Label htmlFor="price-custom">Include custom pricing</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full">Apply Filters</Button>
      <Button variant="outline" className="w-full">
        Reset
      </Button>
    </div>
  )
}

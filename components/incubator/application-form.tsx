"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useRouter } from "next/navigation"

const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  linkedIn: z.string().url({ message: "Please enter a valid LinkedIn URL." }).optional().or(z.literal("")),
})

const startupInfoSchema = z.object({
  startupName: z.string().min(2, { message: "Startup name must be at least 2 characters." }),
  website: z.string().url({ message: "Please enter a valid website URL." }).optional().or(z.literal("")),
  stage: z.enum(["idea", "prototype", "mvp", "growth", "scaling"]),
  founded: z.string().regex(/^\d{4}$/, { message: "Please enter a valid year (YYYY)." }),
  industry: z.string().min(2, { message: "Please select or enter an industry." }),
  description: z.string().min(50, { message: "Description must be at least 50 characters." }),
})

const teamInfoSchema = z.object({
  teamSize: z.string(),
  hasCofounder: z.enum(["yes", "no"]),
  technicalExpertise: z.enum(["none", "some", "experienced", "expert"]),
  teamBackground: z.string().min(50, { message: "Team background must be at least 50 characters." }),
})

const projectInfoSchema = z.object({
  problem: z.string().min(50, { message: "Problem statement must be at least 50 characters." }),
  solution: z.string().min(50, { message: "Solution description must be at least 50 characters." }),
  aiComponent: z.string().min(50, { message: "AI component description must be at least 50 characters." }),
  targetMarket: z.string().min(50, { message: "Target market must be at least 50 characters." }),
  competitiveAdvantage: z.string().min(50, { message: "Competitive advantage must be at least 50 characters." }),
})

const programInfoSchema = z.object({
  programType: z.enum(["incubation", "acceleration", "both"]),
  expectations: z.string().min(50, { message: "Expectations must be at least 50 characters." }),
  heardFrom: z.string().min(2, { message: "Please tell us how you heard about us." }),
  termsAgreed: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions." }),
  }),
})

type FormStep = {
  title: string
  description: string
  schema: any
}

const formSteps: FormStep[] = [
  {
    title: "Personal Information",
    description: "Tell us about yourself",
    schema: personalInfoSchema,
  },
  {
    title: "Startup Information",
    description: "Tell us about your startup",
    schema: startupInfoSchema,
  },
  {
    title: "Team Information",
    description: "Tell us about your team",
    schema: teamInfoSchema,
  },
  {
    title: "Project Information",
    description: "Tell us about your project",
    schema: projectInfoSchema,
  },
  {
    title: "Program Information",
    description: "Tell us about your program preferences",
    schema: programInfoSchema,
  },
]

export function IncubatorApplicationForm() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const currentSchema = formSteps[step].schema
  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: formData[step as keyof typeof formData] || {},
  })

  const onSubmit = async (values: any) => {
    const updatedFormData = {
      ...formData,
      [step]: values,
    }
    setFormData(updatedFormData)

    if (step === formSteps.length - 1) {
      setIsSubmitting(true)
      // Here you would typically send the data to your API
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
      setIsSubmitting(false)
      router.push("/incubator/apply/confirmation")
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const progress = ((step + 1) / formSteps.length) * 100

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">{formSteps[step].title}</h2>
        <p className="text-muted-foreground">{formSteps[step].description}</p>
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <p className="mt-2 text-sm text-muted-foreground text-right">
            Step {step + 1} of {formSteps.length}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 0 && (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="startupName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Startup Name</FormLabel>
                    <FormControl>
                      <Input placeholder="AI Innovations" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Stage</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your startup stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="idea">Idea Stage</SelectItem>
                        <SelectItem value="prototype">Prototype</SelectItem>
                        <SelectItem value="mvp">Minimum Viable Product</SelectItem>
                        <SelectItem value="growth">Growth Stage</SelectItem>
                        <SelectItem value="scaling">Scaling</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="founded"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Founded</FormLabel>
                    <FormControl>
                      <Input placeholder="2023" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="fintech">Fintech</SelectItem>
                        <SelectItem value="edtech">Edtech</SelectItem>
                        <SelectItem value="agritech">Agritech</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Startup Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe your startup and its mission..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your team size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="solo">Solo Founder</SelectItem>
                        <SelectItem value="2-5">2-5 Members</SelectItem>
                        <SelectItem value="6-10">6-10 Members</SelectItem>
                        <SelectItem value="11+">11+ Members</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasCofounder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you have a co-founder?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="technicalExpertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technical Expertise in AI/ML</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your team's technical expertise" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="some">Some Experience</SelectItem>
                        <SelectItem value="experienced">Experienced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teamBackground"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Background & Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your team's background, experience, and relevant skills..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 3 && (
            <>
              <FormField
                control={form.control}
                name="problem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problem Statement</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What problem are you solving?" className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="solution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solution Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="How does your solution address the problem?"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aiComponent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI/ML Component</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe how AI/ML is integrated into your solution..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetMarket"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Market</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your target market and potential customers..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="competitiveAdvantage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Competitive Advantage</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What makes your solution unique compared to competitors?"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 4 && (
            <>
              <FormField
                control={form.control}
                name="programType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select program type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="incubation">Incubation Program (6 months)</SelectItem>
                        <SelectItem value="acceleration">Acceleration Program (3 months)</SelectItem>
                        <SelectItem value="both">Both (will be determined during review)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expectations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Expectations</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What do you hope to achieve through our program?"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="heardFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How did you hear about us?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="search">Search Engine</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="press">Press/News</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <FormField
                  control={form.control}
                  name="termsAgreed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Terms and Conditions</FormLabel>
                        <FormDescription>
                          I agree to the{" "}
                          <a href="/terms" className="text-primary underline">
                            terms of service
                          </a>{" "}
                          and{" "}
                          <a href="/privacy" className="text-primary underline">
                            privacy policy
                          </a>
                          .
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={handleBack} disabled={step === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                "Submitting..."
              ) : step === formSteps.length - 1 ? (
                <>
                  Submit Application <Check className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ApplicationFAQ() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <p className="mt-2 text-muted-foreground">
          Find answers to common questions about the ADITA AI Incubator & Accelerator application process.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is the difference between the Incubation and Acceleration programs?</AccordionTrigger>
          <AccordionContent>
            <p>
              The <strong>Incubation Program</strong> (6 months) is designed for early-stage startups at the idea or
              prototype phase. It focuses on validating your concept, building an MVP, and establishing product-market
              fit.
            </p>
            <p className="mt-2">
              The <strong>Acceleration Program</strong> (3 months) is for startups that already have an MVP and some
              traction. It focuses on scaling, market expansion, and securing investment.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Do I need to relocate to participate in the program?</AccordionTrigger>
          <AccordionContent>
            <p>
              While we encourage founders to be physically present for key events and workshops, we offer a hybrid model
              that allows for remote participation. However, startups that can have at least one founder present at our
              hub in Nairobi, Lagos, or Cape Town will benefit most from the in-person mentorship and networking
              opportunities.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is there any cost to participate in the program?</AccordionTrigger>
          <AccordionContent>
            <p>
              There is no upfront cost to participate in our programs. However, for the Acceleration Program, we take a
              small equity stake (typically 5-7%) in exchange for funding, resources, and mentorship. For the Incubation
              Program, we offer a stipend and resources in exchange for a smaller equity stake (typically 3-5%).
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>What kind of support will my startup receive?</AccordionTrigger>
          <AccordionContent>
            <p>Startups in our programs receive:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Seed funding (amount varies by program and startup needs)</li>
              <li>Office space and technical infrastructure</li>
              <li>Mentorship from industry experts and successful entrepreneurs</li>
              <li>Technical support for AI/ML development</li>
              <li>Legal and administrative support</li>
              <li>Access to our network of investors and partners</li>
              <li>Marketing and PR support</li>
              <li>Specialized workshops and training sessions</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>How many startups do you accept per cohort?</AccordionTrigger>
          <AccordionContent>
            <p>
              We typically accept 10-15 startups per cohort for each program. This allows us to provide personalized
              attention and support to each startup while maintaining a vibrant community.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>What happens after I submit my application?</AccordionTrigger>
          <AccordionContent>
            <p>
              After submission, you'll receive a confirmation email. Our team reviews applications on a rolling basis,
              and you can expect to hear back within 2-3 weeks. If shortlisted, you'll be invited for an interview and
              possibly asked to provide additional documentation or participate in a technical assessment.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>Can I apply if my startup is not yet incorporated?</AccordionTrigger>
          <AccordionContent>
            <p>
              Yes, you can apply with just an idea or concept. If accepted into the Incubation Program, we'll help you
              with the incorporation process as part of our support package.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>What if my startup doesn't have a technical co-founder?</AccordionTrigger>
          <AccordionContent>
            <p>
              While having technical expertise on your founding team is beneficial, it's not a strict requirement. If
              your concept is strong and you show the ability to execute, we can help connect you with technical talent
              or provide technical support through our network of developers and engineers.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

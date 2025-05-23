import { Check, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ApplicationRequirements() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Application Requirements</h2>
        <p className="mt-2 text-muted-foreground">
          To ensure your application is considered for the ADITA AI Incubator & Accelerator program, please make sure
          you meet the following requirements:
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          Applications are reviewed on a rolling basis. The sooner you apply, the better your chances of being
          considered for the upcoming cohort.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">Eligibility Criteria</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>Your startup must have a clear AI/ML component in its product or service offering</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>At least one founder must be of African descent or the startup must be based in Africa</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>Your startup must be at the idea, prototype, MVP, or early growth stage</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>Founders must be committed to working full-time on the startup during the program</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>Your solution should address a real problem with market potential in Africa or globally</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Required Documents</h3>
          <p className="mt-2 text-muted-foreground">
            The following documents will be requested during the later stages of the application process:
          </p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Pitch Deck</strong> (10-15 slides) outlining your business model, market opportunity, and growth
                strategy
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Technical Documentation</strong> explaining your AI/ML approach and implementation
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Financial Projections</strong> for the next 2-3 years (if available)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Team Resumes/CVs</strong> for all founders and key team members
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Proof of Incorporation</strong> (if already incorporated)
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Selection Process</h3>
          <ol className="mt-4 space-y-4">
            <li className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <div>
                <h4 className="font-medium">Initial Application Review</h4>
                <p className="text-muted-foreground">
                  Our team reviews all applications to ensure they meet our basic criteria and have potential for
                  impact.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <div>
                <h4 className="font-medium">Technical Assessment</h4>
                <p className="text-muted-foreground">
                  Selected startups undergo a technical evaluation to assess the feasibility and innovation of their
                  AI/ML approach.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <div>
                <h4 className="font-medium">Interview Round</h4>
                <p className="text-muted-foreground">
                  Founders are invited for an interview with our selection committee to discuss their vision, team
                  dynamics, and growth plans.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                4
              </div>
              <div>
                <h4 className="font-medium">Final Selection</h4>
                <p className="text-muted-foreground">
                  Based on all evaluations, the final cohort is selected and notified of their acceptance.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

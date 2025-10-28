import ProgramEnrollmentPage from "./enrollment";
import { programs } from "@/helpers/programs"

export async function generateStaticParams() {
    return programs.map((p) => ({
        programId: p.id,
    }));
}

export default function enroll({ params }) {
    return <ProgramEnrollmentPage params={params} />
}

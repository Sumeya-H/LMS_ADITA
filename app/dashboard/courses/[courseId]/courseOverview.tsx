
import { Progress } from "@/components/ui/progress";

export default function CourseOverview({ course, gradeReport }: any) {
    const items = gradeReport?.gradeitems || [];

    // All gradable items except course total
    const gradableItems = items.filter(
        (i: any) => i.itemtype !== "course"
    );

    // Only items with grades
    const gradedItems = gradableItems.filter(
        (i: any) => i.graderaw !== null
    );

    // Course aggregate (Moodle-calculated)
    const courseAggregate = items.find(
        (i: any) => i.itemtype === "course"
    );

    // Only show aggregate if everything else is graded
    const allItemsGraded =
        gradableItems.length > 0 &&
        gradedItems.length === gradableItems.length;

    return (
        <div className="w-full px-6 py-8 space-y-10">

            {/* HEADER */}
            <section className="space-y-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">
                        {course?.fullname}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Course overview and grading summary
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* PROGRESS */}
                    <div className="border rounded-lg p-6 space-y-3">
                        <div className="flex justify-between text-sm font-medium">
                            <span>Course progress</span>
                            <span>{course?.progress ?? 0}%</span>
                        </div>
                        <Progress value={course?.progress ?? 0} />
                    </div>

                    {/* OVERALL GRADE */}
                    <div className="border rounded-lg p-6 flex flex-col justify-center">
                        <span className="text-sm text-muted-foreground mb-1">
                            Overall grade
                        </span>
                        <span className="text-3xl font-bold">
                            {allItemsGraded && courseAggregate?.percentageformatted
                                ? courseAggregate.percentageformatted
                                : "Pending"}
                        </span>
                        <span className="text-sm text-muted-foreground mt-2">
                            {allItemsGraded
                                ? "Passing grade: 60%"
                                : "Final grade available once all items are graded"}
                        </span>
                    </div>

                    {/* STATUS */}
                    <div className="border rounded-lg p-6 flex flex-col justify-center">
                        <span className="text-sm text-muted-foreground mb-1">
                            Status
                        </span>
                        <span className="text-lg font-semibold">
                            {allItemsGraded &&
                                courseAggregate?.percentageformatted &&
                                parseFloat(courseAggregate.percentageformatted) >= 60
                                ? "Passing"
                                : "In progress"}
                        </span>
                    </div>
                </div>
            </section>

            {/* GRADE BREAKDOWN */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">
                    Grade breakdown
                </h2>

                <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-sm md:text-base border-collapse">
                        <thead className="bg-muted sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold">
                                    Item
                                </th>
                                <th className="px-4 py-3 text-right font-semibold">
                                    Grade
                                </th>
                                <th className="px-4 py-3 text-right font-semibold">
                                    Range
                                </th>
                                <th className="px-4 py-3 text-right font-semibold">
                                    Score
                                </th>
                                <th className="px-4 py-3 text-right font-semibold">
                                    Weight
                                </th>
                                <th className="px-4 py-3 text-right font-semibold">
                                    Contribution
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {gradableItems.map((item: any, index: number) => {
                                const isGraded = item.graderaw !== null;

                                const gradeDisplay = isGraded
                                    ? `${item.graderaw} / ${item.grademax}`
                                    : "—";

                                const rangeDisplay =
                                    `${item.grademin ?? 0} – ${item.grademax ?? "—"}`;

                                let contribution: string | null = null;

                                if (isGraded && item.weightformatted) {
                                    const scorePct =
                                        (item.graderaw / item.grademax) * 100;

                                    const weight = parseFloat(item.weightformatted);
                                    contribution =
                                        ((scorePct * weight) / 100).toFixed(2);
                                }

                                return (
                                    <tr
                                        key={item.id}
                                        className={`border-t ${index % 2 === 0
                                            ? "bg-background"
                                            : "bg-muted/40"
                                            } hover:bg-muted transition-colors`}
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            {item.itemname}
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            {isGraded ? gradeDisplay : (
                                                <span className="italic text-muted-foreground">
                                                    Not graded
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            {rangeDisplay}
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            {isGraded
                                                ? item.percentageformatted
                                                : "—"}
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            {item.weightformatted ?? "—"}
                                        </td>

                                        <td className="px-4 py-3 text-right font-semibold">
                                            {isGraded && contribution
                                                ? `${contribution}%`
                                                : "—"}
                                        </td>
                                    </tr>
                                );
                            })}

                            {/* AGGREGATE ROW */}
                            {allItemsGraded && courseAggregate && (
                                <tr className="border-t bg-muted font-semibold">
                                    <td className="px-4 py-4">
                                        {courseAggregate.itemname || "Course total"}
                                    </td>

                                    <td className="px-4 py-4 text-right">
                                        {courseAggregate.graderaw !== null
                                            ? `${courseAggregate.graderaw} / ${courseAggregate.grademax}`
                                            : "—"}
                                    </td>

                                    <td className="px-4 py-4 text-right">
                                        {`${courseAggregate.grademin ?? 0} – ${courseAggregate.grademax}`}
                                    </td>

                                    <td className="px-4 py-4 text-right">
                                        {courseAggregate.percentageformatted}
                                    </td>

                                    <td className="px-4 py-4 text-right">
                                        100%
                                    </td>

                                    <td className="px-4 py-4 text-right">
                                        {courseAggregate.percentageformatted}
                                    </td>
                                </tr>
                            )}

                            {gradableItems.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No gradable items available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}


import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { addListener } from "process";

export default function CourseSidebar({ course, courseData, toggleSection, editSection, deleteSection, expandedSections, handleModuleClick, editModule, deleteModule, addSection }) {
    return (
        < div className="flex flex-col w-84 space-y-6 border-r hide-scrollbar overflow-y-auto transition-colors duration-300" >
            <nav className="space-y-2">
                {/* Course Header */}
                <h3 className="p-4 border-b font-semibold text-lg">{course?.fullname}</h3>

                {/* Course Sections */}
                {courseData?.map((section: any, index: number) => (
                    <div key={section.id} className="space-y-4">
                        <div
                            className="px-4 py-2 w-full text-left border-b cursor-pointer"
                            onClick={() => toggleSection(section.id)}
                        >
                            <div className="flex w-full justify-between">
                                <div>
                                    <p className="text-sm">Module {index + 1}</p>
                                    <p className="text-base font-semibold">{new DOMParser().parseFromString(section.name, 'text/html').body.textContent}</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex gap-2">
                                        <button onClick={() => editSection(section)}>✏️</button>
                                        <button onClick={() => deleteSection(section.id)}>🗑</button>
                                    </div>

                                    {/* Chevron icon for collapsed/expanded state */}
                                    {expandedSections.has(section.id) ? (
                                        <ChevronUp className="h-5 w-5" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5" />
                                    )}
                                </div>
                            </div>
                            {/* Expanded Modules */}
                            {expandedSections.has(section.id) && section.modules.length > 0 && (
                                <>
                                    <div className="px-4 pt-6 pb-4 space-y-2">
                                        {section.modules.map((module: any) => (
                                            <div className="flex justify-between space-x-3" key={module.id}>
                                                <div onClick={() => handleModuleClick(module)} className="cursor-pointer">
                                                    <p className="text-sm font-semibold">{module.name}</p>
                                                    <p className="text-sm">
                                                        {module.modname.charAt(0).toUpperCase() + module.modname.slice(1)} • 10 min
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => editModule(module)}>✏️</button>
                                                    <button onClick={() => deleteModule(module.id)}>🗑</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-4 border-t">
                                        <Button size="sm" className="mt-auto w-full">
                                            + Add Activity
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </nav>
            <div className="p-4 border-t">
                <Button size="sm" className="mt-auto w-full" onClick={addSection}>
                    + Add Section
                </Button>
            </div>
        </div >
    );
}

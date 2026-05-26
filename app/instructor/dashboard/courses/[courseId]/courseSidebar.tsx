import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Edit, Trash2, Plus, FileText, ClipboardList, Video, MessageCircle, FileQuestion, Layout, Check, X } from "lucide-react";
import AddActivityModal from "./addActivityModal";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function CourseSidebar({
    course,
    courseData,
    toggleSection,
    editSection,
    deleteSection,
    expandedSections,
    handleModuleClick,
    editModule,
    deleteModule,
    addSection,
    addActivity,
    open,
    onClose,
    onSubmit,
    updateSectionName
}) {
    const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
    const [editingSectionName, setEditingSectionName] = useState("");
    const [sectionId, setSectionId] = useState<number>(null);

    const getModuleIcon = (modname: string) => {
        switch (modname) {
            case 'page':
                return <FileText className="h-4 w-4 text-blue-500" />;
            case 'assign':
                return <ClipboardList className="h-4 w-4 text-purple-500" />;
            case 'quiz':
                return <FileQuestion className="h-4 w-4 text-green-500" />;
            case 'forum':
                return <MessageCircle className="h-4 w-4 text-orange-500" />;
            case 'bigbluebuttonbn':
                return <Video className="h-4 w-4 text-red-500" />;
            default:
                return <Layout className="h-4 w-4 text-gray-500" />;
        }
    };

    const handleStartEditSection = (section: any, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingSectionId(section.id);
        setEditingSectionName(new DOMParser().parseFromString(section.name, 'text/html').body.textContent || "");
    };

    const handleSaveSectionName = async (section: any) => {
        if (!editingSectionName.trim()) return;

        await updateSectionName(section, editingSectionName);
        setEditingSectionId(null);
        setEditingSectionName("");
    };

    const handleCancelEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingSectionId(null);
        setEditingSectionName("");
    };

    const handleKeyPress = (e: React.KeyboardEvent, section: any) => {
        if (e.key === 'Enter') {
            handleSaveSectionName(section);
        } else if (e.key === 'Escape') {
            setEditingSectionId(null);
            setEditingSectionName("");
        }
    };

    return (
        <>
            <div className="w-72 flex-shrink-0 border-r overflow-y-auto transition-colors duration-300 h-screen sticky top-0">
                <nav className="h-full">
                    {/* Course Header - Sticky */}
                    <div className="sticky top-0 z-10 border-b">
                        <h3 className="px-4 py-4 font-semibold text-lg truncate">
                            {course?.fullname}
                        </h3>
                    </div>

                    {/* Course Sections */}
                    {courseData?.map((section: any, index: number) => (
                        <div key={section.id} className="border-b last:border-b-0">
                            <div
                                className="px-4 py-3 w-full text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                                onClick={() => {
                                    toggleSection(section.id);
                                    setSectionId(section.section);
                                }}
                            >
                                <div className="flex w-full justify-between items-start gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Module {index + 1}</p>

                                        {/* Inline editing mode */}
                                        {editingSectionId === section.id ? (
                                            <div className="flex items-center gap-2 mt-1" onClick={(e) => e.stopPropagation()}>
                                                <Input
                                                    value={editingSectionName}
                                                    onChange={(e) => setEditingSectionName(e.target.value)}
                                                    onKeyDown={(e) => handleKeyPress(e, section)}
                                                    className="text-sm font-semibold h-8"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={() => handleSaveSectionName(section)}
                                                    className="p-1 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition-colors"
                                                >
                                                    <Check className="h-4 w-4 text-green-600" />
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                                                >
                                                    <X className="h-4 w-4 text-red-600" />
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="text-sm font-semibold truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {new DOMParser().parseFromString(section.name, 'text/html').body.textContent}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            {/* Edit Section Button */}
                                            <button
                                                onClick={(e) => handleStartEditSection(section, e)}
                                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                            >
                                                <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteSection(section.id);
                                                }}
                                                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </button>
                                        </div>
                                        {expandedSections.has(section.id) ? (
                                            <ChevronUp className="h-4 w-4 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4 flex-shrink-0" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Modules */}
                            {expandedSections.has(section.id) && (
                                <>
                                    {section.modules.length > 0 && (
                                        <div className="px-4 pb-2 space-y-1">
                                            {section.modules.map((module: any) => (
                                                <div
                                                    key={module.id}
                                                    className="flex justify-between items-center py-2 px-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group/item"
                                                    onClick={() => handleModuleClick(module)}
                                                >
                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        {getModuleIcon(module.modname)}
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium truncate group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                                                                {module.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {module.modname.charAt(0).toUpperCase() + module.modname.slice(1)} • 10 min
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                editModule(module);
                                                            }}
                                                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                                        >
                                                            <Edit className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteModule(module.id);
                                                            }}
                                                            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                                                        >
                                                            <Trash2 className="h-3 w-3 text-red-500" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="px-4 pb-4 pt-2">
                                        <Button
                                            size="sm"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                                            onClick={() => addActivity(section.section)}
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Activity
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}

                    {/* Add Section Button */}
                    <div className="p-4 border-t sticky bottom-0">
                        <Button
                            size="default"
                            className="w-full bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                            onClick={addSection}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Section
                        </Button>
                    </div>
                </nav>
            </div>

            <AddActivityModal
                sectionId={sectionId}
                open={open}
                onClose={onClose}
                onSubmit={onSubmit}
            />
        </>
    );
}

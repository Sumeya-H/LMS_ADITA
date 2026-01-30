import { useState, useEffect } from "react";
import QuizTimer from "./quizTimer";

interface Question {
    slot: number;
    number: number;
    page: number;
    html: string;
    flagged: boolean;
    type: string;
    sequencecheck: number;
}

interface Props {
    quiz: any;
    timelimit: number;
    questions: Question[];
    currentPage: number;
    pages: number;
    onNavigate: (page: number, answers: { [questionId: number]: { value: string, sequencecheck: number } }) => void;
    onSubmit: (answers: { [questionId: number]: { value: string, sequencecheck: number } }, finished: number) => void; // Function to handle submitting answers
}

const ConfirmationModal = ({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-muted p-8 rounded-xl shadow-lg max-w-lg w-full transform transition-all duration-300 ease-out scale-95 hover:scale-100">
            <h3 className="text-2xl font-semibold text-adita-brown text-center mb-6">
                Are you sure you want to submit your answers?
            </h3>
            <div className="text-adita-brown text-sm text-center mb-6">
                Once you submit, you won’t be able to change your answers. Please make sure you are ready.
            </div>
            <div className="flex justify-center gap-6">
                <button
                    onClick={onConfirm}
                    className="bg-adita-brown text-adita-cream px-6 py-3 rounded-lg shadow-md hover:bg-adita-cream hover:text-adita-brown transition-colors duration-200 ease-in-out"
                >
                    Yes, Submit
                </button>
                <button
                    onClick={onCancel}
                    className="bg-muted text-adita-brown px-6 py-3 rounded-lg shadow-md hover:bg-adita-brown hover:text-adita-cream transition-colors duration-200 ease-in-out"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

export default function QuizView({ pages, quiz, questions, timelimit, currentPage, onNavigate, onSubmit }: Props) {
    const q = questions.find((q) => q.page === currentPage);
    if (!q)
        return <></>

    const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: { value: string, sequencecheck: number } }>({}); // Store answers
    const [showModal, setShowModal] = useState(false); // State for showing the modal

    // Function to submit answers
    const handleSubmit = () => {
        setShowModal(true); // Show confirmation modal
    };

    // Handle the confirmation of submission
    const handleConfirmSubmit = () => {
        onSubmit(selectedAnswers, 1); // Proceed with submission
        setShowModal(false); // Close the modal
    };

    // Handle canceling the submission
    const handleCancelSubmit = () => {
        setShowModal(false); // Close the modal
    };

    // Extract question content
    const extractQuestionContent = (html: string) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html;
        const qtext = wrapper.querySelector(".qtext");
        return qtext ? qtext.innerHTML : html;
    };

    // Extract the answer options from the HTML for different question types
    const extractQuestionInput = (html: string) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html;
        const answer = wrapper.querySelector(".answer");
        console.log(answer);
        return answer ? answer.innerHTML : html;
    };

    // Handle multiple choice selection
    const handleAnswerSelect = (questionId: string, value: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: { value: value, sequencecheck: q.sequencecheck }, // Save answer for this question
        }));
    };

    // Handle true/false selection
    const handleTrueFalseSelect = (questionId: string, value: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: { value: value, sequencecheck: q.sequencecheck },  // Save true/false answer
        }));
    };

    // Handle short answer input
    const handleShortAnswerChange = (questionId: string, value: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: { value: value, sequencecheck: q.sequencecheck }, // Save short answer
        }));
    };

    // Use effect to manage initial answer setting based on question type
    useEffect(() => {
        if (!q) return;

        if (q.type === "multichoice") {
            const multichoice_wrapper = document.createElement("div");
            multichoice_wrapper.innerHTML = q.html;
            const options = Array.from(multichoice_wrapper.querySelectorAll("div.r0, div.r1")).map(
                (div, index) => {
                    const radioInput = div.querySelector("input") as HTMLInputElement;
                    const label = div.querySelector("p") as HTMLElement;
                    return {
                        value: radioInput.value,
                        label: label ? label.innerText.trim() : `Option ${index + 1}`,
                        name: radioInput.name,
                        checked: radioInput.checked,
                    };
                }
            );
            const checkedOption = options.find((option) => option.checked);
            if (checkedOption && !selectedAnswers[checkedOption.name]) {
                handleAnswerSelect(checkedOption.name, checkedOption.value);
            }
        } else if (q.type === "truefalse") {
            const true_false_wrapper = document.createElement("div");
            true_false_wrapper.innerHTML = q.html;
            const options = Array.from(true_false_wrapper.querySelectorAll("div.r0, div.r1")).map(
                (div, index) => {
                    const radioInput = div.querySelector("input") as HTMLInputElement;
                    const label = div.querySelector("label") as HTMLElement;
                    return {
                        value: radioInput.value,
                        label: label ? label.innerText.trim() : `Option ${index + 1}`,
                        name: radioInput.name,
                        checked: radioInput.checked,
                    };
                }
            );
            const checkedOption = options.find((option) => option.checked);
            if (checkedOption && !selectedAnswers[checkedOption.name]) {
                handleTrueFalseSelect(checkedOption.name, checkedOption.value);
            }
        } else if (q.type === "shortanswer") {
            const short_answer_wrapper = document.createElement("div");
            short_answer_wrapper.innerHTML = q.html;
            const inputField = short_answer_wrapper.querySelector('input[type="text"]') as HTMLInputElement;
            if (inputField && !selectedAnswers[inputField.name]) {
                handleShortAnswerChange(inputField.name, inputField.value);
            }
        }
    }, [q]); // Re-run effect when q changes or selectedAnswers changes

    const renderQuestionInput = (q: Question) => {
        const wrappers = document.createElement("div");
        wrappers.innerHTML = q.html;
        const answer = wrappers.querySelector(".answer");
        console.log(answer);

        switch (q.type) {
            case "multichoice":
                const multichoice_wrapper = document.createElement("div");
                multichoice_wrapper.innerHTML = q.html;
                const options = Array.from(multichoice_wrapper.querySelectorAll("div.r0, div.r1")).map(
                    (div, index) => {
                        const radioInput = div.querySelector("input") as HTMLInputElement;
                        const label = div.querySelector("p") as HTMLElement;
                        return {
                            value: radioInput.value,
                            label: label ? label.innerText.trim() : `Option ${index + 1}`,
                            name: radioInput.name,
                            checked: radioInput.checked,
                        };
                    }
                );
                return (
                    <div className="prose max-w-none">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id={`q${q.slot}_answer${index}`}
                                    name={`q${q.slot}_answer`}
                                    value={option.value || ""}
                                    checked={selectedAnswers[option.name]?.value === option.value}
                                    onChange={() => handleAnswerSelect(option.name, option.value)}
                                />
                                <label htmlFor={`q${q.slot}_answer${index}`} className="ml-2">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                );

            case "truefalse":
                const true_false_wrapper = document.createElement("div");
                true_false_wrapper.innerHTML = q.html;
                const true_false_options = Array.from(true_false_wrapper.querySelectorAll("div.r0, div.r1")).map(
                    (div, index) => {
                        const radioInput = div.querySelector("input") as HTMLInputElement;
                        const label = div.querySelector("label") as HTMLElement;
                        return {
                            value: radioInput.value,
                            label: label ? label.innerText.trim() : `Option ${index + 1}`,
                            name: radioInput.name,
                            checked: radioInput.checked,
                        };
                    }
                );
                return (
                    <div className="prose max-w-none">
                        {true_false_options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id={`q${q.slot}_answer${index}`}
                                    name={`q${q.slot}_answer`}
                                    value={option.value || ""}
                                    checked={selectedAnswers[option.name]?.value === option.value}
                                    onChange={() => handleTrueFalseSelect(option.name, option.value)}
                                />
                                <label htmlFor={`q${q.slot}_answer${index}`} className="ml-2">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                );

            case "shortanswer":
                const short_answer_wrapper = document.createElement("div");
                short_answer_wrapper.innerHTML = q.html;
                const inputField = short_answer_wrapper.querySelector('input[type="text"]') as HTMLInputElement;
                return (
                    <div className="flex gap-4">
                        <input
                            type="text"
                            className="p-2 border rounded"
                            placeholder="Type your answer"
                            value={selectedAnswers[inputField.name]?.value || ""}
                            onChange={(e) => handleShortAnswerChange(inputField.name, e.target.value)}
                        />
                    </div>
                );

            default:
                return (
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: extractQuestionInput(q.html),
                        }}
                    />
                );
        }
    };

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr,260px] gap-6">
            {/* ---------------- LEFT: QUESTION ---------------- */}
            <div className="space-y-6">
                <div className="bg-muted p-4 border rounded-lg flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">Question {q?.number}</h2>
                        <p className="text-sm text-muted-foreground mt-1">{q?.stateclass}</p>
                    </div>

                    <button
                        className={`px-3 py-1 rounded text-sm border transition ${q?.flagged
                            ? "bg-yellow-300 border-yellow-500"
                            : "bg-muted border-muted-foreground hover:bg-accent"
                            }`}
                    >
                        {q?.flagged ? "⚑ Flagged" : "⚐ Flag Question"}
                    </button>
                </div>

                {/* -------- MAIN QUESTION CONTENT -------- */}
                <div className="bg-card border rounded-lg shadow p-6">
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: q ? extractQuestionContent(q.html) : "",
                        }}
                    />
                    {/* Render question-specific input */}
                    {q && renderQuestionInput(q)}
                </div>
            </div>

            {/* ---------------- RIGHT: NAVIGATION ---------------- */}
            <div className="bg-card p-4 border rounded-lg shadow h-fit">
                <QuizTimer timestart={quiz.attempt.timestart} timelimit={timelimit} />
                <h3 className="text-lg font-semibold mb-3">Navigation</h3>
                <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: pages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => onNavigate(index, selectedAnswers)}
                            className={`p-3 rounded border text-sm font-medium transition ${index === currentPage
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-muted hover:bg-accent"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                {/* Submit button */}
                <div className="mt-4">
                    <button
                        className="btn btn-success border border-primary rounded-lg py-3 mt-8 hover:bg-accent w-full"
                        onClick={handleSubmit}
                    >
                        Submit Quiz
                    </button>
                </div>
            </div>
            {
                showModal && (
                    <ConfirmationModal onConfirm={handleConfirmSubmit} onCancel={handleCancelSubmit} />
                )
            }
        </div>
    );
}

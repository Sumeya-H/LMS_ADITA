"use client";

import { approveFinanceRegistration, fetchFinanceRegistrations } from "@/services/courseService";
import { useEffect, useState } from "react";

export default function FinancePage() {
    const [data, setData] = useState<any[]>([]);
    const [selected, setSelected] = useState<any | null>(null);

    const loadData = async () => {
        const res = await fetchFinanceRegistrations();
        setData(res);
    };

    const handleApprove = async (id: string) => {
        await approveFinanceRegistration(id);
        setSelected(null);
        loadData();
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Finance Approvals</h1>

            {/* LIST */}
            <div className="grid gap-3">
                {data.map((reg) => (
                    <div
                        key={reg.id}
                        onClick={() => setSelected(reg)}
                        className="border p-4 rounded cursor-pointer hover:bg-gray-50"
                    >
                        <p className="font-semibold">{reg.course.title}</p>
                        <p>{reg.student?.user?.first_name}</p>
                        <p className="text-sm text-gray-500">{reg.status}</p>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {selected && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-[400px]">
                        <h2 className="text-lg font-bold mb-2">
                            {selected.course.title}
                        </h2>

                        <p className="mb-2">
                            Student: {selected.student?.user?.first_name}
                        </p>

                        <p className="mb-2">Status: {selected.status}</p>

                        <img
                            src={selected.receipt_image}
                            className="w-full mb-4 rounded"
                        />

                        <div className="flex justify-between">
                            <button
                                onClick={() => setSelected(null)}
                                className="px-3 py-1 border rounded"
                            >
                                Close
                            </button>

                            <button
                                onClick={() => handleApprove(selected.id)}
                                className="bg-green-600 text-white px-4 py-1 rounded"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

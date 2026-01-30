type Feature = {
    name: string
    isenabled: boolean
}

type MeetingDetailsProps = {
    meeting: {
        cmid: number
        meetingid: string
        statusrunning: boolean
        statusclosed: boolean
        statusopen: boolean
        statusmessage: string
        canjoin: boolean
        ismoderator: boolean
        joinurl: string
        guestaccessenabled: boolean
        features: Feature[]
    },
    meetingUrl: { join_url: string };
}

export default function MeetingDetails({ meeting, meetingUrl }: MeetingDetailsProps) {
    return (
        <section className="max-w-3xl mx-auto">
            <div className="bg-card text-card-foreground rounded-lg shadow-md border p-6 space-y-6">

                {/* Header */}
                <div>
                    <h2 className="text-2xl font-semibold text-primary">
                        Meeting Details
                    </h2>
                    <p className="text-sm text-muted-foreground break-all">
                        ID: {meeting?.meetingid}
                    </p>
                </div>

                {/* Status */}
                <div className="flex flex-wrap gap-3">
                    <StatusBadge
                        label={meeting?.statusopen ? "Open" : "Closed"}
                        active={meeting?.statusopen}
                    />
                    <StatusBadge
                        label={meeting?.statusrunning ? "Running" : "Not Running"}
                        active={meeting?.statusrunning}
                    />
                    <StatusBadge
                        label={meeting?.ismoderator ? "Moderator" : "Participant"}
                        active={meeting?.ismoderator}
                    />
                </div>

                {/* Status Message */}
                <div className="bg-muted rounded-md p-4 text-sm">
                    {meeting?.statusmessage}
                </div>

                {/* Features */}
                <div>
                    <h3 className="font-medium mb-2">Features</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {meeting?.features.map((feature) => (
                            <li
                                key={feature.name}
                                className="flex items-center justify-between bg-background border rounded-md px-3 py-2 text-sm"
                            >
                                <span className="capitalize">
                                    {feature.name.replace(/([A-Z])/g, " $1")}
                                </span>
                                <span
                                    className={`font-medium ${feature.isenabled
                                        ? "text-green-600"
                                        : "text-destructive"
                                        }`}
                                >
                                    {feature.isenabled ? "Enabled" : "Disabled"}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Join Button */}
                {meeting?.canjoin && (
                    <div className="pt-4">
                        <a
                            href={meetingUrl?.join_url}
                            target="_blank"
                            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-primary-foreground font-medium hover:opacity-90 transition"
                        >
                            Join Meeting
                        </a>
                    </div>
                )}
            </div>
        </section>
    )
}

/* ---------- Helper Component ---------- */

function StatusBadge({
    label,
    active,
}: {
    label: string
    active: boolean
}) {
    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${active
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-muted text-muted-foreground border-border"
                }`}
        >
            {label}
        </span>
    )
}

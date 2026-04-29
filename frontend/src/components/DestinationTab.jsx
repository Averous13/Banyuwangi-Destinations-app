import { useState } from "react";
import { Button } from "./ui/button";

const TABS = [
    { key: "welcome", label: "Selamat Datang"},
    { key: "access", label: "Cara Akses"},
    { key: "time", label: "Waktu wisata"}
]

const DestinationTab = ({destination}) => {
    const [activeTab, setActiveTab] = useState("welcome");

    return (
        <div className="space-y-8">

            <div className="flex gap-3 flex-wrap">
                {TABS.map((tab) => (
                    <Button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={activeTab === tab.key
                            ? "bg-accent hover:bg-accent/90"
                            : "bg-primary"}>
                        {tab.label}
                    </Button>
                ))}
            </div>

            <div className="space-y-6">

                {activeTab === "welcome" && (
                <p className="text-foreground leading-relaxed">
                    {destination.description}
                </p>
                )}

                {/* Cara Akses */}
                {activeTab === "access" && (
                <SectionContent section={destination.access} />
                )}

                {/* Waktu */}
                {activeTab === "time" && (
                <SectionContent section={destination.time} />
                )}

            </div>
        </div>
    )
}

const SectionContent = ({section}) => {
    if (!section) return null;

    return (
        <div className="space-y-6">
            {section.description && (
                <div className="space-y-4"> 
                    {section.description.split("\n\n").map((para, i) => (
                        <p key={i} className="leading-relaxed">
                            {para}
                        </p>
                    ))}
                </div>
            )}

            {section.items?.length > 0 && (
                <ul className="space-y-3">
                {section.items.map((item, i) => (
                    <li key={i} className="flex gap-3">
                    <span className="mt-1 text-muted-foreground">•</span>
                    <span className="text-foreground leading-relaxed">
                        {item.label && (
                        <strong className="font-semibold">{item.label}: </strong>
                        )}
                        {item.detail}
                    </span>
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}


export default DestinationTab;
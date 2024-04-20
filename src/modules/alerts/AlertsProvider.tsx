import React, { useRef } from "react";
import { alertsContext, AlertItem } from "./alertsContext";
import { v4 } from "uuid";

const alertDuration = 3000; // in ms (1s = 1000ms)

const AlertsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const container = useRef<HTMLDivElement>(null);

    function newAlert(a: Omit<AlertItem, "id">) {
        const alertItem: AlertItem = {
            id: `${v4()}-${a.title.replace(/ /g, "")}`,
            title: a.title,
            body: a.body || undefined,
            severity: a.severity || "info",
        };

        const alertElement = document.createElement("div");
        alertElement.id = alertItem.id;
        alertElement.classList.add("alert-container");
        alertElement.classList.add(alertItem.severity as string);

        const alertElementTitle = document.createElement("h5");
        alertElementTitle.innerText = alertItem.title;
        alertElement.appendChild(alertElementTitle);

        if (alertItem.body) {
            const alertElementBody = document.createElement("p");
            alertElementBody.innerText = alertItem.body;
            alertElement.appendChild(alertElementBody);
        }

        if (container.current) {
            container.current.appendChild(alertElement);
        }

        clearAlerts(alertItem.id);
    }

    function clearAlerts(id: string) {
        const alertElement = document.getElementById(id);
        if (!alertElement) return;

        setTimeout(async () => {
            alertElement.style.animationName = "out";
            await new Promise((r) => setTimeout(r, 200));
            alertElement.remove();
        }, alertDuration);
    }

    return (
        <alertsContext.Provider value={{ newAlert }}>
            <div ref={container} className="fixed top-0 right-0 z-[1000] flex flex-col gap-4 p-4"></div>
            {children}
        </alertsContext.Provider>
    );
};

export default AlertsProvider;

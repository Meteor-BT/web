import { createContext, useContext } from "react";

export type AlertItem = {
    id: string;
    title: string;
    body?: string;
};

export type AlertContext = {
    newAlert: (a: Omit<AlertItem, "id">) => void;
};

export const alertsContext = createContext<AlertContext>({
    newAlert() {},
});

export const useAlerts = () => useContext(alertsContext);

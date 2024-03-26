import React, { useEffect, useState } from "react";
import { themeContext } from "@/modules/theme/themeContext";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [darkMode] = useState(true);

    useEffect(() => {
        if (darkMode && !document.body.classList.contains("dark")) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <themeContext.Provider value={{ darkMode }}>
            {children}
        </themeContext.Provider>
    );
};

export default ThemeProvider;

import React from "react";
import { Outlet } from "react-router-dom";
import ThemeProvider from "@/modules/theme/ThemeProvider";

const Root: React.FC = () => {
    return (
        <ThemeProvider>
            <Outlet />
        </ThemeProvider>
    );
};

export default Root;

import React from "react";
import { Outlet } from "react-router-dom";
import ThemeProvider from "@/modules/theme/ThemeProvider";
import NavigationBar from "@/common/NavigationBar";

const Root: React.FC = () => {
    return (
        <ThemeProvider>
            <NavigationBar />
            <Outlet />
        </ThemeProvider>
    );
};

export default Root;

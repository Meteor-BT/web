import React from "react";
import { Outlet } from "react-router-dom";
import ThemeProvider from "@/modules/theme/ThemeProvider";
import NavigationBar from "@/common/NavigationBar";
import Footer from "@/common/Footer";

const Root: React.FC = () => {
    return (
        <ThemeProvider>
            <NavigationBar />
            <Outlet />
            <Footer />
        </ThemeProvider>
    );
};

export default Root;

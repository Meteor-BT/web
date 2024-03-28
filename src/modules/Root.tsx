import React from "react";
import { Outlet } from "react-router-dom";
import ThemeProvider from "@/modules/theme/ThemeProvider";
import NavigationBar from "@/common/NavigationBar";
import Footer from "@/common/Footer";
import WeatherProvider from "@/modules/weather/WeatherProvider";

const Root: React.FC = () => {
    return (
        <ThemeProvider>
            <WeatherProvider>
                <NavigationBar />
                <Outlet />
                <Footer />
            </WeatherProvider>
        </ThemeProvider>
    );
};

export default Root;

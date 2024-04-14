import React from "react";
import { Outlet } from "react-router-dom";
import ThemeProvider from "@/modules/theme/ThemeProvider";
import NavigationBar from "@/common/components/NavigationBar";
import Footer from "@/common/components/Footer";
import WeatherProvider from "@/modules/weather/WeatherProvider";
import AlertsProvider from "@/modules/alerts/AlertsProvider";

const Root: React.FC = () => {
    return (
        <ThemeProvider>
            <AlertsProvider>
                <WeatherProvider>
                    <NavigationBar />
                    <Outlet />
                    <Footer />
                </WeatherProvider>
            </AlertsProvider>
        </ThemeProvider>
    );
};

export default Root;

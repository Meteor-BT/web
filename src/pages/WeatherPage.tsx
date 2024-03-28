import React from "react";
import WeatherNavBar from "@/modules/weather/components/WeatherNavBar";

const WeatherPage: React.FC = () => {
    return (
        <div className="p-root-container flex flex-col">
            <WeatherNavBar />
            <div></div>
        </div>
    );
};

export default WeatherPage;

import React from "react";
import WeatherNavBar from "@/modules/weather/components/WeatherNavBar";
import WeatherTable from "@/modules/weather/WeatherTable";

const WeatherPage: React.FC = () => {
    return (
        <div className="p-root-container flex flex-col mt-[56px]">
            <WeatherNavBar />
            <WeatherTable />
        </div>
    );
};

export default WeatherPage;

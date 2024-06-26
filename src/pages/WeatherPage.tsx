import React from "react";
import WeatherNavBar from "@/modules/weather/components/WeatherNavBar";
import WeatherTable from "@/modules/weather/WeatherTable";
import WeatherCompareChart from "@/modules/weather/WeatherCompareChart";

const WeatherPage: React.FC = () => {
    return (
        <div className="p-root-container flex flex-col mt-[56px]">
            <WeatherNavBar />
            <WeatherCompareChart />
            <hr className="my-6 border-neutral-900" />
            <WeatherTable />
        </div>
    );
};

export default WeatherPage;

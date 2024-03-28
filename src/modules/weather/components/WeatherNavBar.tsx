import React from "react";
import { useWeather } from "@/modules/weather/weatherContext";
import Button from "@/common/Button";
import Dropdown from "@/common/Dropdown";

const WeatherNavBar: React.FC = () => {
    const { showForecasts, setShowForecasts } = useWeather();

    return (
        <nav className="fixed top-[56px] left-0 right-0 h-[56px] bg-black border-b border-b-neutral-900 flex flex-row items-center justify-start p-root-container">
            <div className="flex flex-row gap-2 items-center justify-start">
                <Button
                    variant={showForecasts ? "solid" : "text"}
                    onClick={() => setShowForecasts(true)}
                >
                    Forecasts
                </Button>
                <Button
                    variant={!showForecasts ? "solid" : "text"}
                    onClick={() => setShowForecasts(false)}
                >
                    Actual data
                </Button>
            </div>

            <div className="w-full flex justify-end items-center gap-4">
                <Dropdown label="Country" items={[]} />
                <div>
                    <Button variant="text">City</Button>
                </div>
                <div>
                    <Button variant="text">Year</Button>
                </div>
                <div>
                    <Button variant="text">Month</Button>
                </div>
                <div>
                    <Button variant="text">Day</Button>
                </div>
            </div>
        </nav>
    );
};

export default WeatherNavBar;

import React, { useState } from "react";
import { useWeather, WeatherViewType } from "@/modules/weather/weatherContext";
import Button from "@/common/components/Button";
import Dropdown from "@/common/components/Dropdown";
import { FaChevronLeft, FaX } from "react-icons/fa6";
import useCitiesInfo from "@/common/hooks/useCitiesInfo";
import dayjs from "dayjs";

const WeatherNavBar: React.FC = () => {
    const { showForecasts, setShowForecasts, viewType, setViewType, timeFilters } = useWeather();
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const { locationFilters, setLocationFilters } = useWeather();

    const { countries, cities } = useCitiesInfo(locationFilters.country);

    return (
        <>
            <nav className="fixed z-[1] top-[56px] left-0 right-0 h-[56px] bg-black border-b border-b-neutral-900 flex flex-row items-center justify-start p-root-container">
                <div className="flex flex-row gap-2 items-center justify-start">
                    <Button variant={showForecasts ? "solid" : "text"} onClick={() => setShowForecasts(true)}>
                        Forecasts
                    </Button>
                    <Button variant={!showForecasts ? "solid" : "text"} onClick={() => setShowForecasts(false)}>
                        Actual data
                    </Button>
                </div>

                <div className="w-full hidden invisible md:visible md:flex justify-end items-center gap-4">
                    <Dropdown
                        expand
                        selectedId={locationFilters.country}
                        label="Country"
                        items={countries.map((c) => ({
                            label: c,
                            id: c,
                            onClick: (id) => setLocationFilters((p) => ({ ...p, country: id, city: "" })),
                        }))}
                    />
                    <Dropdown
                        expand
                        selectedId={locationFilters.city}
                        label="Cities"
                        items={cities.map((c) => ({
                            label: c.name,
                            id: c.name,
                            onClick: (id) => setLocationFilters((p) => ({ ...p, city: id })),
                        }))}
                    />
                </div>
                <Button variant="text" className="md:hidden md:invisible ml-auto" onClick={() => setShowFilterPanel((p) => !p)}>
                    {!showFilterPanel ? <FaChevronLeft /> : <FaX />}
                    Filters
                </Button>

                <div
                    className={`min-w-max md:hidden md:invisible visible flex flex-col justify-start items-start gap-4 fixed top-[112px] right-0 bottom-0 bg-neutral-900 p-6 transition-transform
                ${showFilterPanel ? "" : "translate-x-[120%]"}`}
                >
                    <Dropdown
                        expand
                        selectedId={locationFilters.city}
                        label="Country"
                        items={countries.map((c) => ({
                            label: c,
                            id: c,
                            onClick: (id) => setLocationFilters((p) => ({ ...p, country: id })),
                        }))}
                    />
                    <Dropdown
                        expand
                        selectedId={locationFilters.city}
                        label="Cities"
                        items={cities.map((c) => ({
                            label: c.name,
                            id: c.name,
                            onClick: (id) => setLocationFilters((p) => ({ ...p, city: id })),
                        }))}
                    />
                </div>
            </nav>

            <div className="w-full min-h-max py-6 flex flex-col gap-8">
                <div className="flex flex-row gap-4 items-center justify-start">
                    {["Daily", "Weekly", "Monthly", "Custom"].map((t) => (
                        <Button
                            key={t}
                            size="sm"
                            variant={viewType === t.toLowerCase() ? "solid" : "text"}
                            color={t === "Custom" ? "primary" : "normal"}
                            onClick={() => setViewType(t.toLowerCase() as WeatherViewType)}
                        >
                            {t === "Custom" ? "Choose" : t}
                        </Button>
                    ))}
                </div>

                <div className="w-full flex flex-col">
                    <h3 className="text-xl text-neutral-200">
                        Weather {showForecasts ? "forecasts" : "info"}{" "}
                        {dayjs(timeFilters.from).isSame(timeFilters.to, "day") && (
                            <>
                                of <span className="text-teal-500">{new Date().toDateString()}</span>
                            </>
                        )}
                        {!dayjs(timeFilters.from).isSame(timeFilters.to, "day") && (
                            <>
                                from{" "}
                                <button disabled={viewType !== "custom"} className="text-teal-500">
                                    {dayjs(Date.now()).format("MMM DD YYYY")}
                                </button>
                                {" to "}
                                <button disabled={viewType !== "custom"} className="text-teal-500">
                                    {dayjs(Date.now())
                                        .add(viewType === "weekly" ? 7 : 30, "day")
                                        .format("MMM DD YYYY")}
                                </button>
                            </>
                        )}
                    </h3>
                </div>
            </div>
        </>
    );
};

export default WeatherNavBar;

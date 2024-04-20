import React, { useState } from "react";
import { useWeather, WeatherComparisonType, WeatherDurationType } from "@/modules/weather/weatherContext";
import Button from "@/common/components/Button";
import Dropdown from "@/common/components/Dropdown";
import { FaChevronLeft, FaX } from "react-icons/fa6";
import useCitiesInfo from "@/common/hooks/useCitiesInfo";
import dayjs from "dayjs";
import { startCase } from "lodash";

const durationTypes = ["daily", "weekly", "monthly" /* "custom" */];
const comparisonTypes = ["temperature", "humidity" /* "precipitation" */];

const WeatherNavBar: React.FC = () => {
    const [showFilterPanel, setShowFilterPanel] = useState(false);

    const {
        showForecasts,
        durationType,
        timeFilters,
        locationFilters,
        comparisonType,
        combinedView,
        busy: weatherApiBusy,
        setDurationType,
        setLocationFilters,
        setComparisonType,
        setCombinedView,
    } = useWeather();
    const { countries, cities, gettingCitiesInfo } = useCitiesInfo(locationFilters.country);

    return (
        <>
            <nav className="fixed z-[1] top-[56px] left-0 right-0 h-[56px] bg-black border-b border-b-neutral-900 flex flex-row items-center justify-start p-root-container">
                <div className="flex flex-row gap-2 items-center justify-start">
                    <Button variant={combinedView ? "solid" : "text"} onClick={() => setCombinedView(true)}>
                        Combined
                    </Button>
                    <Button variant={!combinedView ? "solid" : "text"} onClick={() => setCombinedView(false)}>
                        Error Rate
                    </Button>
                </div>

                <div className="w-full invisible hidden md:visible md:flex justify-end items-center gap-4">
                    <Dropdown
                        expand
                        selectedId={comparisonType}
                        label="Compare"
                        items={comparisonTypes.map((t) => ({
                            label: startCase(t),
                            id: t,
                            onClick: () => setComparisonType(t as WeatherComparisonType),
                        }))}
                        loading={weatherApiBusy}
                    />
                    <Dropdown
                        expand
                        selectedId={durationType}
                        label="Duration"
                        items={durationTypes.map((t) => ({
                            label: startCase(t),
                            id: t,
                            onClick: () => setDurationType(t as WeatherDurationType),
                        }))}
                        loading={weatherApiBusy}
                    />
                    <Dropdown
                        expand
                        selectedId={locationFilters.country}
                        label="Country"
                        items={countries.map((c) => ({
                            label: c,
                            id: c,
                            onClick: (id) => setLocationFilters((p) => ({ ...p, country: id, city: "" })),
                        }))}
                        loading={gettingCitiesInfo || weatherApiBusy}
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
                        loading={gettingCitiesInfo || weatherApiBusy}
                    />
                </div>

                <Button variant="text" className="md:hidden md:invisible ml-auto" onClick={() => setShowFilterPanel((p) => !p)}>
                    {!showFilterPanel ? <FaChevronLeft /> : <FaX />}
                    Filters
                </Button>

                {/* mobile filter panel */}
                <div
                    className={`min-w-max md:hidden md:invisible visible flex flex-col justify-start items-start gap-4 fixed top-[112px] right-0 bottom-0 bg-neutral-950 p-6 transition-transform
                    ${showFilterPanel ? "" : "translate-x-[120%]"}`}
                >
                    <Dropdown
                        expand
                        selectedId={comparisonType}
                        label="Type"
                        items={comparisonTypes.map((t) => ({
                            label: startCase(t),
                            id: t,
                            onClick: () => setComparisonType(t as WeatherComparisonType),
                        }))}
                        loading={weatherApiBusy}
                    />
                    <Dropdown
                        expand
                        selectedId={durationType}
                        label="Duration"
                        items={durationTypes.map((t) => ({
                            label: t,
                            id: t,
                            onClick: () => setDurationType(t.toLowerCase() as WeatherDurationType),
                        }))}
                        loading={weatherApiBusy}
                    />
                    <Dropdown
                        expand
                        selectedId={locationFilters.city}
                        label="Country"
                        items={countries.map((c) => ({
                            label: c,
                            id: c,
                            onClick: (id) => setLocationFilters((p) => ({ ...p, country: id })),
                        }))}
                        loading={gettingCitiesInfo || weatherApiBusy}
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
                        loading={gettingCitiesInfo || weatherApiBusy}
                    />
                </div>
            </nav>

            <div className="w-full min-h-max py-6 flex flex-col gap-8">
                <div className="w-full flex flex-col">
                    <h3 className="text-xl text-neutral-200">
                        Weather info{" "}
                        {dayjs(timeFilters.from).isSame(timeFilters.to, "day") && (
                            <>
                                of <span className="text-teal-500">{new Date().toDateString()}</span>
                            </>
                        )}
                        {!dayjs(timeFilters.from).isSame(timeFilters.to, "day") && (
                            <>
                                from{" "}
                                <button disabled={durationType !== "custom"} className="text-teal-500">
                                    {dayjs(timeFilters.from).format("MMM DD YYYY")}
                                </button>
                                {" to "}
                                <button disabled={durationType !== "custom"} className="text-teal-500">
                                    {dayjs(timeFilters.to).format("MMM DD YYYY")}
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

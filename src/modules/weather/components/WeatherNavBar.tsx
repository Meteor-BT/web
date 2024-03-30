import React, { useState, useEffect } from "react";
import { useWeather } from "@/modules/weather/weatherContext";
import Button from "@/common/components/Button";
import Dropdown from "@/common/components/Dropdown";
import locationFilters from "@/assets/locaitonFilter.json";

type LocFilter = {
    name: string;
};

const WeatherNavBar: React.FC = () => {
    const { showForecasts, setShowForecasts } = useWeather();
    const [countries, setCountries] = useState<LocFilter[]>([]);
    const [cities, setCities] = useState<LocFilter[]>([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        setCountries(locationFilters);
        setSelectedCountry(locationFilters[0].name);
    }, []);

    useEffect(() => {
        const country = locationFilters.find((c) => c.name === selectedCountry);
        if (country) {
            setCities(country.cities);
            setSelectedCity(country.cities[0].name);
        } else {
            setCities([]);
        }
    }, [selectedCountry]);

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
                <Dropdown
                    expand
                    selectedId={selectedCountry}
                    label="Country"
                    items={countries.map((c) => ({
                        label: c.name,
                        id: c.name,
                        onClick: (id) => setSelectedCountry(id),
                    }))}
                />
                <Dropdown
                    expand
                    selectedId={selectedCity}
                    label="Cities"
                    items={cities.map((c) => ({
                        label: c.name,
                        id: c.name,
                        onClick: (id) => setSelectedCity(id),
                    }))}
                />
            </div>
        </nav>
    );
};

export default WeatherNavBar;

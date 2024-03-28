import type { ActualWeatherInfo, ForecastWeatherInfo } from "@/types";
import React, { useState } from "react";
import {
    weatherContext,
    WeatherTimeFilters,
    WeatherLocationFilters,
} from "@/modules/weather/weatherContext";

const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [actualWeatherInfo, setActualWeatherInfo] = useState<
        ActualWeatherInfo[]
    >([]);
    const [forecastWeatherInfo, setForecastWeatherInfo] = useState<
        ForecastWeatherInfo[]
    >([]);
    const [locationFilters, setLocationFilters] =
        useState<WeatherLocationFilters>({
            city: "",
            country: "",
            long: 0.0,
            latt: 0.0,
        });
    const [timeFilters, setTimeFilters] = useState<WeatherTimeFilters>({
        hour: new Date().getHours(),
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
    });
    const [busy, setBusy] = useState(false);
    const [showForecasts, setShowForecasts] = useState(true);

    async function getActualWeatherInfo() {
        setActualWeatherInfo([]);
    }

    async function getForecastWeatherInfo() {
        setForecastWeatherInfo([]);
    }

    async function getPreciseLocation() {}

    return (
        <weatherContext.Provider
            value={{
                actualWeatherInfo,
                forecastWeatherInfo,
                locationFilters,
                timeFilters,
                busy,
                showForecasts,
                setLocationFilters,
                setTimeFilters,
                setBusy,
                setShowForecasts,
                getActualWeatherInfo,
                getForecastWeatherInfo,
                getPreciseLocation,
            }}
        >
            {children}
        </weatherContext.Provider>
    );
};

export default WeatherProvider;

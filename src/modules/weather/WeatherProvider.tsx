import type { ActualWeatherInfo, ForecastWeatherInfo } from "@/types";
import React, { useEffect, useState } from "react";
import type {
    WeatherTimeFilters,
    WeatherLocationFilters,
    WeatherViewType,
} from "@/modules/weather/weatherContext";
import { weatherContext } from "@/modules/weather/weatherContext";
import { http } from "@/utils";

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
            lati: 0.0,
        });
    const [timeFilters, setTimeFilters] = useState<WeatherTimeFilters>({
        hour: new Date().getHours(),
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
    });
    const [busy, setBusy] = useState(false);
    const [showForecasts, setShowForecasts] = useState(true);
    const [viewType, setViewType] = useState<WeatherViewType>("daily");

    useEffect(() => {
        getPreciseLocation();
    }, []);

    useEffect(() => {
        getActualWeatherInfo();
    }, [locationFilters, timeFilters]);

    async function getActualWeatherInfo() {
        if (!locationFilters.country || !locationFilters.city) {
            return;
        }
        try {
            const res = await http().get("weather/actuals", {
                params: {
                    ...locationFilters,
                },
            });
            setActualWeatherInfo(res.data.data);
        } catch (err: any) {
            console.error(err?.response || err);
            setActualWeatherInfo([]);
        }
    }

    async function getForecastWeatherInfo() {
        setForecastWeatherInfo([]);
    }

    async function getPreciseLocation() {
        if (!window.navigator.geolocation) {
            console.error("location services are not available");
            return;
        }
        window.navigator.geolocation.getCurrentPosition(
            (pos) => {
                if (pos.coords.latitude && pos.coords.longitude) {
                    setLocationFilters({
                        country: "USA",
                        city: "New York",
                        long: pos.coords.longitude,
                        lati: pos.coords.latitude,
                    });
                }
                console.log(pos);
            },
            (err) => {
                console.error(err);
            },
        );
    }

    return (
        <weatherContext.Provider
            value={{
                actualWeatherInfo,
                forecastWeatherInfo,
                locationFilters,
                timeFilters,
                busy,
                viewType,
                setViewType,
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

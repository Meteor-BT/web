import type { ActualWeatherInfo, ForecastWeatherInfo } from "@/types";
import React, { useEffect, useState } from "react";
import type { WeatherTimeFilters, WeatherLocationFilters, WeatherViewType } from "@/modules/weather/weatherContext";
import { weatherContext } from "@/modules/weather/weatherContext";
import { http } from "@/utils";
import axios, { AxiosError } from "axios";

const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [actualWeatherInfo, setActualWeatherInfo] = useState<ActualWeatherInfo[]>([]);
    const [forecastWeatherInfo, setForecastWeatherInfo] = useState<ForecastWeatherInfo[]>([]);
    const [locationFilters, setLocationFilters] = useState<WeatherLocationFilters>({
        city: "",
        country: "",
        lon: 0.0,
        lat: 0.0,
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
    }, [locationFilters, timeFilters, viewType]);

    async function getActualWeatherInfo() {
        if (!locationFilters.country || !locationFilters.city) {
            return;
        }
        try {
            setBusy(true);
            const res = await http().get("weather/actuals", {
                params: {
                    ...locationFilters,
                    type: viewType,
                },
            });
            setActualWeatherInfo(res.data.data);
        } catch (err: any) {
            console.error(err?.response || err);
            setActualWeatherInfo([]);
        } finally {
            setBusy(false);
        }
    }

    async function getForecastWeatherInfo() {
        if (new Date().getTime() > 10_000) return;
        if (!locationFilters.country || !locationFilters.city) {
            return;
        }
        try {
            setBusy(true);
            const res = await http().get("weather/forecasts", {
                params: { ...locationFilters },
            });
            setForecastWeatherInfo(res.data.data);
        } catch (err: any) {
            console.error(err?.response || err);
            setForecastWeatherInfo([]);
        } finally {
            setBusy(false);
        }
    }

    async function getPreciseLocation() {
        if (!window.navigator.geolocation) {
            console.error("location services are not available");
            return;
        }
        window.navigator.geolocation.getCurrentPosition(geoPositionSuccess, (err) => {
            console.error(err);
        });
    }

    async function geoPositionSuccess(pos: GeolocationPosition) {
        const cacheKey = `meteorbt.location_cache-${pos.coords.longitude.toFixed(2)}:${pos.coords.latitude.toFixed(2)}`;
        const cache = localStorage.getItem(cacheKey);
        if (cache) {
            const data = JSON.parse(cache) as { address: { city: string; country: string } };
            if (data.address && data.address.city) {
                setLocationFilters({
                    country: data.address.country,
                    city: data.address.city,
                    lon: pos.coords.longitude,
                    lat: pos.coords.latitude,
                });
                return;
            }
        }
        try {
            const url = new URL("/reverse", "https://nominatim.openstreetmap.org");
            url.searchParams.set("lat", pos.coords.latitude.toString());
            url.searchParams.set("lon", pos.coords.longitude.toString());
            url.searchParams.set("format", "json");
            const res = await axios.get(url.toString());
            localStorage.setItem(cacheKey, JSON.stringify(res.data));
        } catch (err) {
            console.error((err as AxiosError).response);
        }
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

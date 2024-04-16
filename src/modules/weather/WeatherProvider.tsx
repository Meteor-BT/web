import type { WeatherInfo } from "@/types";
import React, { useEffect, useState } from "react";
import type { WeatherTimeFilters, WeatherLocationFilters, WeatherViewType, WeatherComparisonType } from "@/modules/weather/weatherContext";
import { weatherContext } from "@/modules/weather/weatherContext";
import useHttp from "@/common/hooks/useHttp";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";

const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [weatherInfo, setWeatherInfo] = useState<WeatherInfo[]>([]);
    const [actualWeatherInfo, setActualWeatherInfo] = useState<WeatherInfo[]>([]);
    const [forecastWeatherInfo, setForecastWeatherInfo] = useState<WeatherInfo[]>([]);
    const [locationFilters, setLocationFilters] = useState<WeatherLocationFilters>({
        city: "",
        country: "",
        lon: 0.0,
        lat: 0.0,
    });
    const [timeFilters, setTimeFilters] = useState<WeatherTimeFilters>({
        from: new Date().toISOString(),
        to: new Date().toISOString(),
    });
    const [busy, setBusy] = useState(false);
    const [showForecasts, setShowForecasts] = useState(true);
    const [viewType, setViewType] = useState<WeatherViewType>("daily");
    const [comparisonType, setComparisonType] = useState<WeatherComparisonType>("temperature");
    const { http } = useHttp();

    useEffect(() => {
        getPreciseLocation();
    }, []);

    useEffect(() => {
        const forecastList: WeatherInfo[] = [];
        const actualList: WeatherInfo[] = [];
        for (let i = 0; i < weatherInfo.length; i++) {
            const w = weatherInfo[i];
            if (w.forecast) {
                forecastList.push(w);
            } else {
                actualList.push(w);
            }
        }
        setActualWeatherInfo(actualList);
        setForecastWeatherInfo(forecastList);
    }, [weatherInfo]);

    useEffect(() => {
        if (weatherInfo.length < 1) {
            getWeatherInfo();
        }
    }, [showForecasts]);

    useEffect(() => {
        getWeatherInfo();
    }, [locationFilters, timeFilters, viewType]);

    useEffect(() => {
        const t = {
            from: new Date().toISOString(),
            to: "",
        };
        switch (viewType.toLowerCase()) {
            case "daily":
                t.to = t.from;
                break;
            case "weekly":
                t.to = dayjs(t.from).add(1, "week").toISOString();
                break;
            case "monthly":
                t.to = dayjs(t.from).add(1, "month").toISOString();
                break;
        }
        setTimeFilters(t);
    }, [viewType]);

    async function getWeatherInfo() {
        if (!locationFilters.country || !locationFilters.city) {
            return;
        }
        try {
            setBusy(true);
            const res = await http().get("weather/combined", {
                params: {
                    country: locationFilters.country,
                    city: locationFilters.city,
                    from: timeFilters.from,
                    to: timeFilters.to,
                },
            });
            setWeatherInfo(res.data.data);
        } catch (err: any) {
            console.error(err?.response || err);
            setWeatherInfo([]);
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
                weatherInfo,
                actualWeatherInfo,
                forecastWeatherInfo,
                locationFilters,
                timeFilters,
                busy,
                viewType,
                comparisonType,
                setComparisonType,
                setViewType,
                showForecasts,
                setLocationFilters,
                setTimeFilters,
                setBusy,
                setShowForecasts,
                getWeatherInfo,
                getPreciseLocation,
            }}
        >
            {children}
        </weatherContext.Provider>
    );
};

export default WeatherProvider;

import type { ForecastWeatherInfo, ActualWeatherInfo } from "@/types";
import { createContext, useContext } from "react";

export type WeatherViewType = "daily" | "monthly" | "weekly" | "custom";

export type WeatherTimeFilters = {
    from: string;
    to: string;
};

export type WeatherLocationFilters = {
    city: string;
    country: string;
    lon: number;
    lat: number;
};

export type WeatherContext = {
    actualWeatherInfo: ActualWeatherInfo[];
    forecastWeatherInfo: ForecastWeatherInfo[];
    locationFilters: WeatherLocationFilters;
    timeFilters: WeatherTimeFilters;
    busy: boolean;
    showForecasts: boolean;
    viewType: WeatherViewType;
    setViewType: (v: WeatherViewType | ((p: WeatherViewType) => WeatherViewType)) => void;
    setLocationFilters: (v: WeatherLocationFilters | ((p: WeatherLocationFilters) => WeatherLocationFilters)) => void;
    setTimeFilters: (v: WeatherTimeFilters | ((p: WeatherTimeFilters) => WeatherTimeFilters)) => void;
    setBusy: (v: boolean | ((p: boolean) => boolean)) => void;
    setShowForecasts: (v: boolean | ((p: boolean) => boolean)) => void;
    getForecastWeatherInfo: () => Promise<void>;
    getActualWeatherInfo: () => Promise<void>;
    getPreciseLocation: () => Promise<void>;
};

export const weatherContext = createContext<WeatherContext>({
    actualWeatherInfo: [],
    forecastWeatherInfo: [],
    locationFilters: {
        city: "",
        country: "",
        lon: 0.0,
        lat: 0.0,
    },
    timeFilters: {
        from: new Date().toISOString(),
        to: new Date().toISOString(),
    },
    showForecasts: true,
    busy: false,
    viewType: "daily",
    setViewType() {},
    setLocationFilters() {},
    setTimeFilters() {},
    setBusy() {},
    setShowForecasts() {},
    async getForecastWeatherInfo() {},
    async getActualWeatherInfo() {},
    async getPreciseLocation() {},
});

export const useWeather = () => useContext(weatherContext);

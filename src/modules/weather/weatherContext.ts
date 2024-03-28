import type { ForecastWeatherInfo, ActualWeatherInfo } from "@/types";
import { createContext, useContext } from "react";

export type WeatherTimeFilters = {
    hour: number;
    year: number;
    month: number;
};

export type WeatherLocationFilters = {
    city: string;
    country: string;
    long: number;
    latt: number;
};

export type WeatherContext = {
    actualWeatherInfo: ActualWeatherInfo[];
    forecastWeatherInfo: ForecastWeatherInfo[];
    locationFilters: WeatherLocationFilters;
    timeFilters: WeatherTimeFilters;
    busy: boolean;
    showForecasts: boolean;
    setLocationFilters: (v: WeatherLocationFilters) => void;
    setTimeFilters: (v: WeatherTimeFilters) => void;
    setBusy: (v: boolean) => void;
    setShowForecasts: (v: boolean) => void;
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
        long: 0.0,
        latt: 0.0,
    },
    timeFilters: {
        hour: new Date().getHours(),
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
    },
    showForecasts: true,
    busy: false,
    setLocationFilters() {},
    setTimeFilters() {},
    setBusy() {},
    setShowForecasts() {},
    async getForecastWeatherInfo() {},
    async getActualWeatherInfo() {},
    async getPreciseLocation() {},
});

export const useWeather = () => useContext(weatherContext);

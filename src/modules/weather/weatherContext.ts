import type { WeatherInfo } from "@/types";
import { createContext, useContext } from "react";

export type WeatherDurationType = "daily" | "monthly" | "weekly" | "custom";

export type WeatherComparisonType = "temperature" | "precipitation" | "humidity";

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
    weatherInfo: WeatherInfo[];
    actualWeatherInfo: WeatherInfo[];
    forecastWeatherInfo: WeatherInfo[];
    locationFilters: WeatherLocationFilters;
    timeFilters: WeatherTimeFilters;
    busy: boolean;
    showForecasts: boolean;
    durationType: WeatherDurationType;
    comparisonType: WeatherComparisonType;
    combinedView: boolean;
    setCombinedView: (v: boolean | ((p: boolean) => boolean)) => void;
    setComparisonType: (v: WeatherComparisonType | ((p: WeatherComparisonType) => WeatherComparisonType)) => void;
    setDurationType: (v: WeatherDurationType | ((p: WeatherDurationType) => WeatherDurationType)) => void;
    setLocationFilters: (v: WeatherLocationFilters | ((p: WeatherLocationFilters) => WeatherLocationFilters)) => void;
    setTimeFilters: (v: WeatherTimeFilters | ((p: WeatherTimeFilters) => WeatherTimeFilters)) => void;
    setBusy: (v: boolean | ((p: boolean) => boolean)) => void;
    setShowForecasts: (v: boolean | ((p: boolean) => boolean)) => void;
    getWeatherInfo: () => Promise<void>;
    getPreciseLocation: () => Promise<void>;
};

export type ComparableData = {
    date: Date;
    actualTemp: number | null;
    forecastTemp: number | null;
    actualHumidity: number | null;
    forecastHumidity: number | null;
    forecastPrecipitation: number | null;
    actualPrecipitation: number | null;
    errorRate: number;
};

export const weatherContext = createContext<WeatherContext>({
    weatherInfo: [],
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
    durationType: "daily",
    comparisonType: "temperature",
    combinedView: true,
    setCombinedView() {},
    setComparisonType() {},
    setDurationType() {},
    setLocationFilters() {},
    setTimeFilters() {},
    setBusy() {},
    setShowForecasts() {},
    async getWeatherInfo() {},
    async getPreciseLocation() {},
});

export const useWeather = () => useContext(weatherContext);

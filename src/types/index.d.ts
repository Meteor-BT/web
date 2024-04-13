export type WeatherInfo = {
    city_ascii: string;
    country: string;
    temperature_2m: number;
    pressure_msl: number;
    windspeed_10m: number;
    relativehumidity_2m: number;
    date: Date;
    lat: number;
    lon: number;
    forecast: boolean;
};

export type CityInfo = {
    name: string;
    lon: number;
    lat: number;
    country: string;
};

export * from "./dropdown";

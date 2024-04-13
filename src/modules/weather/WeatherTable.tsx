import React from "react";
import Button from "@/common/components/Button";
import { WeatherViewType, useWeather } from "@/modules/weather/weatherContext";
import dayjs from "dayjs";
import { v4 } from "uuid";

const tableHeaders: string[] = ["Temperature", "Feels like", "Min/Max", "Wind speed", "Humidity", "Precepitation", "Pressure"];

const Td: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <td className="p-4 border-r last:border-none" style={{ borderColor: "inherit" }}>
        {children}
    </td>
);

const WeatherTable: React.FC = () => {
    const { actualWeatherInfo, forecastWeatherInfo, showForecasts, viewType, setViewType, busy, timeFilters } = useWeather();

    return (
        <div className="w-full min-h-max py-6 flex flex-col gap-8">
            <div className="flex flex-row gap-4 items-center justify-start">
                {["Daily", "Weekly", "Monthly", "Custom"].map((t) => (
                    <Button
                        key={t}
                        size="sm"
                        variant={viewType === t.toLowerCase() ? "solid" : "text"}
                        color={t === "Custom" ? "primary" : "normal"}
                        onClick={() => setViewType(t.toLowerCase() as WeatherViewType)}
                    >
                        {t === "Custom" ? "Choose" : t}
                    </Button>
                ))}
            </div>
            <div className="w-full flex flex-col">
                <h3 className="text-xl text-neutral-200">
                    Weather {showForecasts ? "forecasts" : "info"}{" "}
                    {dayjs(timeFilters.from).isSame(timeFilters.to, "day") && (
                        <>
                            of <span className="text-teal-500">{new Date().toDateString()}</span>
                        </>
                    )}
                    {!dayjs(timeFilters.from).isSame(timeFilters.to, "day") && (
                        <>
                            from{" "}
                            <button disabled={viewType !== "custom"} className="text-teal-500">
                                {dayjs(Date.now()).format("MMM DD YYYY")}
                            </button>
                            {" to "}
                            <button disabled={viewType !== "custom"} className="text-teal-500">
                                {dayjs(Date.now())
                                    .add(viewType === "weekly" ? 7 : 30, "day")
                                    .format("MMM DD YYYY")}
                            </button>
                        </>
                    )}
                </h3>
            </div>

            <div className="w-full max-w-full overflow-x-auto flex relative">
                <table className={`table-auto w-full min-w-max p-4 text-sm ${busy ? "pointer-events-none opacity-50 saturate-0" : ""}`}>
                    <thead className="">
                        <tr className="text-left">
                            <th className="p-4 border-r border-neutral-900 last:border-none text-xs text-teal-500 uppercase font-normal tracking-wide">
                                {viewType === "daily" && "Time"}
                                {viewType === "weekly" && "Day"}
                                {viewType === "monthly" && "Date"}
                            </th>
                            {tableHeaders.map((th) => (
                                <th key={th} className="p-4 border-r border-neutral-900 last:border-none text-xs text-teal-500 uppercase font-normal tracking-wide">
                                    {th}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {(showForecasts ? forecastWeatherInfo : actualWeatherInfo).map((info) => (
                            <tr key={v4() + info.date} className="odd:bg-neutral-900 text-left border-neutral-900 odd:border-black text-neutral-200">
                                <Td>
                                    {viewType === "daily" && dayjs(info.date).format("hh:mm a")}
                                    {viewType === "weekly" && dayjs(info.date).format("ddd")}
                                    {viewType === "monthly" && dayjs(info.date).format("MMM")}
                                </Td>
                                <Td>{info.temperature_2m}&deg; C</Td>
                                <Td>
                                    {(info.temperature_2m * 1.05).toFixed(0)}
                                    &deg; C
                                </Td>
                                <Td>
                                    {(info.temperature_2m * 0.9).toFixed(0)}
                                    &deg;/
                                    {(info.temperature_2m * 1.1).toFixed(0)}
                                    &deg; C
                                </Td>
                                <Td>{info.windspeed_10m} mi</Td>
                                <Td>{info.relativehumidity_2m} %</Td>
                                <Td>
                                    {(100 - (info.windspeed_10m / info.relativehumidity_2m) * 100).toFixed(0)}
                                    {" %"}
                                </Td>
                                <Td>{info.pressure_msl} mmHg</Td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {busy && (
                    <div className="z-[1] absolute top-0 right-0 left-0 bottom-0 bg-neutral-900/10 backdrop-blur-sm flex justify-center items-center text-neutral-300">
                        Getting weather info...
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherTable;

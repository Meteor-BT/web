import React, { useEffect } from "react";
import Button from "@/common/components/Button";
import { WeatherViewType, useWeather } from "@/modules/weather/weatherContext";
import dayjs from "dayjs";

const tableHeaders: string[] = [
    // "Date",
    "Time",
    "Temperature",
    "Feels like",
    "Min/Max",
    "Wind speed",
    "Humidity",
    "Precepitation",
    "Pressure",
];

const Td: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <td
        className="p-4 border-r last:border-none"
        style={{ borderColor: "inherit" }}
    >
        {children}
    </td>
);

const WeatherTable: React.FC = () => {
    const {
        actualWeatherInfo,
        showForecasts,
        viewType,
        getActualWeatherInfo,
        setViewType,
    } = useWeather();

    useEffect(() => {
        getActualWeatherInfo();
    }, []);

    return (
        <div className="w-full min-h-max py-6 flex flex-col gap-8">
            <div className="flex flex-row gap-4 items-center justify-start">
                {["Daily", "Weekly", "Monthly"].map((t) => (
                    <Button
                        key={t}
                        size="sm"
                        variant={
                            viewType === t.toLowerCase() ? "solid" : "text"
                        }
                        onClick={() =>
                            setViewType(t.toLowerCase() as WeatherViewType)
                        }
                    >
                        {t}
                    </Button>
                ))}
                <Button variant="outline" size="sm" color="secondary">
                    Choose
                </Button>
            </div>
            <div className="w-full flex flex-col">
                <h3 className="text-xl text-neutral-200">
                    Weather {showForecasts ? "forecasts" : "info"}{" "}
                    {viewType === "daily" && (
                        <>
                            of{" "}
                            <span className="text-teal-500">
                                {new Date().toDateString()}
                            </span>
                        </>
                    )}
                    {viewType !== "daily" && (
                        <>
                            from{" "}
                            <span className="text-teal-500">
                                {dayjs(Date.now()).format("MMM DD YYYY")}
                            </span>
                            {" to "}
                            <span className="text-teal-500">
                                {dayjs(Date.now())
                                    .add(viewType === "weekly" ? 7 : 30, "day")
                                    .format("MMM DD YYYY")}
                            </span>
                        </>
                    )}
                </h3>
            </div>

            <div className="w-full max-w-full overflow-x-auto flex">
                <table className="table-auto w-full min-w-max p-4 text-sm">
                    <thead className="">
                        <tr className="text-left">
                            {tableHeaders.map((th) => (
                                <th
                                    key={th}
                                    className="p-4 border-r border-neutral-900 last:border-none text-xs text-teal-500 uppercase font-normal tracking-wide"
                                >
                                    {th}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {actualWeatherInfo.map((info) => (
                            <tr
                                key={info.id}
                                className="odd:bg-neutral-900 text-left border-neutral-900 odd:border-black text-neutral-200"
                            >
                                {/*<Td>{dayjs(info.date).format("MMM, DD, YYYY")}</Td> */}
                                <Td>{dayjs(info.date).format("hh:mm a")}</Td>
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
                                    {(
                                        100 -
                                        (info.windspeed_10m /
                                            info.relativehumidity_2m) *
                                            100
                                    ).toFixed(0)}
                                    {" %"}
                                </Td>
                                <Td>{info.pressure_msl} mmHg</Td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WeatherTable;

import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useWeather } from "@/modules/weather/weatherContext";
import dayjs from "dayjs";
import { colors, windowSize } from "@/constants";
import { startCase } from "lodash";
import CustomTooltip from "@/modules/weather/components/CustomTooltip";
import type { ComparableData } from "@/types";

const WeatherCompareChart: React.FC = () => {
    const [data, setData] = useState<ComparableData[]>([]);
    const [width, setWidth] = useState(1600);
    const [height, setHeight] = useState(400);
    const { weatherInfo, comparisonType } = useWeather();
    const [forecastDataKey, setForecastDataKey] = useState("forecastTemp");
    const [actualDataKey, setActualDataKey] = useState("actualTemp");

    useEffect(() => {
        prepareChartData();
    }, [weatherInfo]);

    useEffect(() => {
        switch (comparisonType) {
            case "humidity":
                setForecastDataKey("forecastHumidity");
                setActualDataKey("actualHumidity");
                break;
            default:
                setForecastDataKey("forecastTemp");
                setActualDataKey("actualTemp");
                break;
        }
    }, [comparisonType, weatherInfo]);

    useEffect(() => {
        calcFrameSize();
        window.addEventListener("resize", calcFrameSize);
        return () => {
            window.removeEventListener("resize", calcFrameSize);
        };
    }, []);

    function prepareChartData() {
        const cd: Record<string, ComparableData> = {};
        const sortedWeatherInfo = weatherInfo.sort((a, b) => {
            if (dayjs(a.date).isBefore(b.date, "h")) return -1;
            return 1;
        });
        for (let i = 0; i < sortedWeatherInfo.length; ++i) {
            const w = sortedWeatherInfo[i];
            const recordKey = dayjs(w.date).format("DD-MM-YYYY-HH");
            if (!cd[recordKey]) {
                cd[recordKey] = {
                    date: w.date,
                    forecastTemp: i === 0 ? w.temperature_2m : null,
                    actualTemp: i === 0 ? w.temperature_2m : null,
                    forecastHumidity: i === 0 ? w.relativehumidity_2m : null,
                    actualHumidity: i === 0 ? w.relativehumidity_2m : null,
                    forecastPrecipitation: null,
                    actualPrecipitation: null,
                };
            }
            if (w.forecast) {
                if (w.temperature_2m) {
                    cd[recordKey].forecastTemp = w.temperature_2m;
                }
                if (w.relativehumidity_2m) {
                    cd[recordKey].forecastHumidity = w.relativehumidity_2m;
                }
            } else {
                if (w.temperature_2m) {
                    cd[recordKey].actualTemp = w.temperature_2m;
                }
                if (w.relativehumidity_2m) {
                    cd[recordKey].actualHumidity = w.relativehumidity_2m;
                }
            }
        }
        setData(Object.values(cd));
    }

    function calcFrameSize() {
        setHeight(window.innerHeight * 0.45);
        if (window.innerWidth >= windowSize.md) {
            setWidth(window.innerWidth - 56 * 2);
        } else if (window.innerWidth >= windowSize.sm) {
            setWidth(window.innerWidth - 40 * 2);
        } else {
            setWidth(window.innerWidth - 24 * 2);
        }
    }

    const xAxisTickFormatter = (value: any, _: number) => {
        return dayjs(value).format("MMM DD");
    };
    function yAxisTickFormatter(v: any, _: number) {
        if (comparisonType === "humidity") {
            return `${v}%`;
        }
        return `${v}° C`;
    }

    return (
        <div className="w-full flex flex-col overflow-hidden">
            <LineChart width={width} height={height} data={data}>
                <Line connectNulls type="monotone" dataKey={actualDataKey} stroke={colors.secondary} dot={<></>} />
                <Line connectNulls type="monotone" dataKey={forecastDataKey} stroke={colors.primary} dot={<></>} />
                <YAxis tickFormatter={yAxisTickFormatter} style={{ fontSize: "12px" }} />
                <XAxis dataKey="date" tickFormatter={xAxisTickFormatter} style={{ fontSize: "12px" }} />
                <Tooltip content={CustomTooltip as any} />
                <Legend formatter={(v) => startCase(v)} />
            </LineChart>
        </div>
    );
};

export default WeatherCompareChart;

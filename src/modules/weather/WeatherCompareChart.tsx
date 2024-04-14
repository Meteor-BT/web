import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useWeather } from "@/modules/weather/weatherContext";
import dayjs from "dayjs";
import { colors, windowSize } from "@/constants";

type ComparableData = {
    actualTemp?: number;
    forecastTemp?: number;
    actualHumidity?: number;
    forecastHumidity?: number;
};

const WeatherCompareChart: React.FC = () => {
    const [data, setData] = useState<ComparableData[]>([]);
    const { weatherInfo } = useWeather();
    const [width, setWidth] = useState(1600);
    const [height, setHeight] = useState(400);

    useEffect(() => {
        const cd: Record<string, ComparableData> = {};
        for (let i = 0; i < weatherInfo.length; ++i) {
            const w = weatherInfo[i];
            const recordKey = dayjs(w.date).format("DD-MM-YYYY-HH");
            if (w.forecast) {
                if (cd[recordKey]) {
                    cd[recordKey].forecastTemp = w.temperature_2m;
                    cd[recordKey].forecastHumidity = w.relativehumidity_2m;
                } else {
                    cd[recordKey] = { forecastTemp: w.temperature_2m };
                }
            } else {
                if (cd[recordKey]) {
                    cd[recordKey].actualTemp = w.temperature_2m;
                } else {
                    cd[recordKey] = { actualTemp: w.temperature_2m };
                }
            }
        }
        setData(Object.values(cd));
    }, [weatherInfo]);

    useEffect(() => {
        calcFrameSize();
        window.addEventListener("resize", calcFrameSize);
        return () => {
            window.removeEventListener("resize", calcFrameSize);
        };
    }, []);

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

    return (
        <div className="w-full flex flex-col">
            <LineChart width={width} height={height} data={data}>
                <Line type="monotone" dataKey="actualTemp" stroke={colors.secondary} />
                <Line type="monotone" dataKey="forecastTemp" stroke={colors.primary} />
                <XAxis />
                <YAxis />
                <Tooltip />
                <Legend />
            </LineChart>
        </div>
    );
};

export default WeatherCompareChart;

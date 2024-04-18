import React from "react";
import dayjs from "dayjs";
import { WeatherComparisonType, useWeather } from "@/modules/weather/weatherContext";
import type { ComparableData } from "@/types";

type Props = {
    active: boolean;
    payload: {
        payload: ComparableData;
    }[];
};

type ChildProps = {
    comparisonType: WeatherComparisonType;
    payload: ComparableData;
};

const CompareValues: React.FC<ChildProps> = ({ comparisonType, payload }) => {
    if (comparisonType === "humidity") {
        return (
            <>
                <p className="p-2 pb-0">
                    Actual: <span className="text-orange-500">{payload.actualHumidity || "- -"}%</span>
                </p>
                <p className="p-2">
                    Forecast: <span className="text-teal-500">{payload.forecastHumidity || "- -"}%</span>
                </p>
            </>
        );
    } else {
        return (
            <>
                <p className="p-2 pb-0">
                    Actual: <span className="text-orange-500">{payload.actualTemp || "- -"}° C</span>
                </p>
                <p className="p-2">
                    Forecast: <span className="text-teal-500">{payload.forecastTemp || "- -"}° C</span>
                </p>
            </>
        );
    }
};

const CustomTooltip: React.FC<Props> = ({ active, payload }) => {
    const data = payload ? payload[0] : null;
    const { comparisonType } = useWeather();

    if (!active || !data) return <></>;

    return (
        <div className="rounded-lg bg-neutral-900 text-xs flex flex-col">
            <p className="p-2 bg-neutral-950 text-neutral-200">{dayjs(data.payload.date).format("MMM DD[ at ]HH:MM a")}</p>
            <CompareValues comparisonType={comparisonType} payload={data.payload} />
        </div>
    );
};

export default CustomTooltip;

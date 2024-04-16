import React from "react";
import dayjs from "dayjs";

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    const data = payload ? payload[0] : null;

    if (!active || !data) return <></>;

    return (
        <div className="rounded-lg bg-neutral-900 text-xs flex flex-col">
            <p className="p-2 bg-neutral-950 text-neutral-200">{dayjs(data.payload.date).format("MMM DD[ at ]HH:MM a")}</p>
            <p className="p-2 pb-0">
                Actual: <span className="text-orange-500">{data.payload.actualTemp || "- -"}° C</span>
            </p>
            <p className="p-2">
                Forecast: <span className="text-teal-500">{data.payload.forecastTemp || "- -"}° C</span>
            </p>
        </div>
    );
};

export default CustomTooltip;

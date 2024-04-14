import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
    {
        name: "Page A",
        uv: 40,
        pv: 24,
    },
    {
        name: "Page B",
        uv: 30,
        pv: 13,
    },
    {
        name: "Page C",
        uv: 20,
        pv: 8,
    },
];

const WeatherCompareChart: React.FC = () => {
    return (
        <div className="w-full flex flex-col">
            <LineChart width={700} height={400} data={data}>
                <Line type="monotone" dataKey="pv" stroke="#14b8a6" />
                <Line type="monotone" dataKey="uv" stroke="#f97316" />
                <XAxis />
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>
    );
};

export default WeatherCompareChart;

import React from 'react'
import './RadarChartComponent.scss'
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from "recharts";

function RadarChartComponent(props) {
    const { radarData } = props
    return (
        <ResponsiveContainer width="95%" height="100%">
            <RadarChart
                cx={150}
                cy={125}
                outerRadius={85}
                data={radarData}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis />
                <Radar
                    name="Mike"
                    dataKey="total"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                />
            </RadarChart>
        </ResponsiveContainer >

    );
}

export default RadarChartComponent
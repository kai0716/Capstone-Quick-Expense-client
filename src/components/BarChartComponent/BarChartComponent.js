import "./BarChartComponent.scss";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { ResponsiveContainer } from 'recharts'

export default function BarChartComponent(props) {
    const { data } = props;
    return (
        <ResponsiveContainer width="95%" height="80%">
            <BarChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="weekday" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="subtotal" stackId="a" fill="#8884d8" />
                <Bar dataKey="gst" stackId="a" fill="#82ca9d" />
                <Bar dataKey="pst" stackId="a" fill="lightblue" />
            </BarChart>
        </ResponsiveContainer>

    );
}

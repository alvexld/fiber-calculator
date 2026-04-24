import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
} from "recharts";
import type { DailyBristolPoint } from "../../../bristol/utils/build-bristol-chart-data";

type BristolChartProps = {
    data: DailyBristolPoint[];
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border bg-white px-3 py-2 shadow-md text-sm">
            <p className="font-semibold">{label}</p>
            <p className="text-gray-600">
                Moyenne : <span className="font-medium text-gray-900">{payload[0].value}</span>
            </p>
            <p className="text-gray-400">
                {payload[0].payload.count} selle{payload[0].payload.count > 1 ? "s" : ""}
            </p>
        </div>
    );
};

export const BristolChart = ({ data }: BristolChartProps) => (
    <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 16, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
            />
            <YAxis
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                domain={[1, 7]}
                ticks={[1, 2, 3, 4, 5, 6, 7]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
                y={3.5}
                stroke="#22c55e"
                strokeDasharray="4 4"
                label={{
                    value: "Zone idéale",
                    fill: "#22c55e",
                    fontSize: 11,
                    position: "insideTopRight",
                }}
            />
            <Line
                type="monotone"
                dataKey="average"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 4, fill: "#f97316", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
            />
        </LineChart>
    </ResponsiveContainer>
);

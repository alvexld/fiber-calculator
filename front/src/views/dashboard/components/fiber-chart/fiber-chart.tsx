import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
} from 'recharts'
import type { DailyFiberPoint } from '../../utils/build-chart-data'

type FiberChartProps = {
    data: DailyFiberPoint[]
}

const DAILY_GOAL = 25 // WHO recommended daily fiber intake (g)

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
        <div className="rounded-lg border bg-white px-3 py-2 shadow-md text-sm">
            <p className="font-semibold">{label}</p>
            <p className="text-gray-600">
                <span className="font-medium text-gray-900">{payload[0].value}g</span> de fibres
            </p>
            <p className="text-gray-400">{payload[0].payload.mealsCount} repas</p>
        </div>
    )
}

export const FiberChart = ({ data }: FiberChartProps) => (
    <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 16, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
            />
            <YAxis
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}g`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
            <ReferenceLine
                y={DAILY_GOAL}
                stroke="#a855f7"
                strokeDasharray="4 4"
                label={{
                    value: `Objectif ${DAILY_GOAL}g`,
                    fill: '#a855f7',
                    fontSize: 11,
                    position: 'insideTopRight',
                }}
            />
            <Bar dataKey="fibers" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
    </ResponsiveContainer>
)

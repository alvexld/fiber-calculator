import { Card } from "@heroui/react/card";
import { FiberChart } from "./components/fiber-chart/fiber-chart";
import { FiberCalendar } from "./components/fiber-calendar/fiber-calendar";
import { BristolChart } from "./components/bristol-chart/bristol-chart";
import type { DailyFiberPoint } from "./utils/build-chart-data";
import type { DailyBristolPoint } from "../bristol/utils/build-bristol-chart-data";
import type { SavedMeal } from "../../types/meal";

type DashboardUIProps = {
    meals: SavedMeal[];
    chartData: DailyFiberPoint[];
    averageDailyFiber: number;
    totalMeals: number;
    daysTracked: number;
    bristolChartData: DailyBristolPoint[];
    averageBristol: number;
    totalBristols: number;
};

export const DashboardUI = ({
    meals,
    chartData,
    averageDailyFiber,
    totalMeals,
    daysTracked,
    bristolChartData,
    averageBristol,
    totalBristols,
}: DashboardUIProps) => (
    <div className="flex flex-col gap-6 px-6 py-8">
        <h1 className="text-2xl font-semibold">Tableau de bord</h1>

        <div className="grid grid-cols-3 gap-4">
            <Card>
                <Card.Content className="pt-6">
                    <p className="text-3xl font-bold tabular-nums">
                        {averageDailyFiber.toFixed(1)}g
                    </p>
                    <p className="mt-1 text-sm text-gray-500">Moyenne fibres / jour</p>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content className="pt-6">
                    <p className="text-3xl font-bold tabular-nums">{totalMeals}</p>
                    <p className="mt-1 text-sm text-gray-500">Repas enregistrés</p>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content className="pt-6">
                    <p className="text-3xl font-bold tabular-nums">{daysTracked}</p>
                    <p className="mt-1 text-sm text-gray-500">Jours suivis</p>
                </Card.Content>
            </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <Card>
                <Card.Content className="pt-6">
                    <p className="text-3xl font-bold tabular-nums">
                        {averageBristol > 0 ? averageBristol.toFixed(1) : "—"}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">Bristol moyen</p>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content className="pt-6">
                    <p className="text-3xl font-bold tabular-nums">{totalBristols}</p>
                    <p className="mt-1 text-sm text-gray-500">Selles enregistrées</p>
                </Card.Content>
            </Card>
        </div>

        <Card>
            <Card.Header>
                <Card.Title>Activité fibres</Card.Title>
                <Card.Description>20 dernières semaines · objectif 25g/jour</Card.Description>
            </Card.Header>
            <Card.Content>
                {meals.length === 0 ? (
                    <p className="py-8 text-center text-sm text-gray-400">
                        Aucune donnée. Sauvegardez des repas pour voir votre activité.
                    </p>
                ) : (
                    <FiberCalendar meals={meals} />
                )}
            </Card.Content>
        </Card>

        <Card>
            <Card.Header>
                <Card.Title>Fibres par jour</Card.Title>
                <Card.Description>
                    Apport journalier · ligne de référence 25g (OMS)
                </Card.Description>
            </Card.Header>
            <Card.Content>
                {chartData.length === 0 ? (
                    <p className="py-12 text-center text-sm text-gray-400">
                        Aucune donnée. Sauvegardez des repas pour voir votre évolution.
                    </p>
                ) : (
                    <FiberChart data={chartData} />
                )}
            </Card.Content>
        </Card>

        <Card>
            <Card.Header>
                <Card.Title>Bristol par jour</Card.Title>
                <Card.Description>Moyenne quotidienne · zone idéale entre 3 et 4</Card.Description>
            </Card.Header>
            <Card.Content>
                {bristolChartData.length === 0 ? (
                    <p className="py-12 text-center text-sm text-gray-400">
                        Aucune donnée. Enregistrez des selles pour voir votre évolution.
                    </p>
                ) : (
                    <BristolChart data={bristolChartData} />
                )}
            </Card.Content>
        </Card>
    </div>
);

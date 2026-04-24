import { Flame, UtensilsCrossed, CalendarDays, Activity, Droplets } from "lucide-react";
import { Card } from "@heroui/react/card";
import { FiberChart } from "./components/fiber-chart/fiber-chart";
import { FiberCalendar } from "./components/fiber-calendar/fiber-calendar";
import { BristolChart } from "./components/bristol-chart/bristol-chart";
import { BristolCalendar } from "./components/bristol-calendar/bristol-calendar";
import type { DailyFiberPoint } from "./utils/build-chart-data";
import type { DailyBristolPoint } from "../bristol/utils/build-bristol-chart-data";
import type { SavedMeal } from "../../types/meal";
import type { Bristol } from "@fc/shared";

type DashboardUIProps = {
    meals: SavedMeal[];
    bristols: Bristol[];
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
    bristols,
    chartData,
    averageDailyFiber,
    totalMeals,
    daysTracked,
    bristolChartData,
    averageBristol,
    totalBristols,
}: DashboardUIProps) => (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-8">
        <h1 className="text-2xl font-semibold">Tableau de bord</h1>

        <div className="grid grid-cols-3 gap-4">
            <Card>
                <Card.Content className="pt-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-3xl font-bold tabular-nums">
                                {averageDailyFiber.toFixed(1)}g
                            </p>
                            <p className="mt-1 text-sm text-gray-500">Moyenne fibres / jour</p>
                        </div>
                        <div className="rounded-lg bg-violet-100 p-2">
                            <Flame className="h-5 w-5 text-violet-600" />
                        </div>
                    </div>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content className="pt-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-3xl font-bold tabular-nums">{totalMeals}</p>
                            <p className="mt-1 text-sm text-gray-500">Repas enregistrés</p>
                        </div>
                        <div className="rounded-lg bg-blue-100 p-2">
                            <UtensilsCrossed className="h-5 w-5 text-blue-600" />
                        </div>
                    </div>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content className="pt-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-3xl font-bold tabular-nums">{daysTracked}</p>
                            <p className="mt-1 text-sm text-gray-500">Jours suivis</p>
                        </div>
                        <div className="rounded-lg bg-emerald-100 p-2">
                            <CalendarDays className="h-5 w-5 text-emerald-600" />
                        </div>
                    </div>
                </Card.Content>
            </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <Card>
                <Card.Content className="pt-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-3xl font-bold tabular-nums">
                                {averageBristol > 0 ? averageBristol.toFixed(1) : "—"}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">Bristol moyen</p>
                        </div>
                        <div className="rounded-lg bg-orange-100 p-2">
                            <Activity className="h-5 w-5 text-orange-600" />
                        </div>
                    </div>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content className="pt-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-3xl font-bold tabular-nums">{totalBristols}</p>
                            <p className="mt-1 text-sm text-gray-500">Selles enregistrées</p>
                        </div>
                        <div className="rounded-lg bg-amber-100 p-2">
                            <Droplets className="h-5 w-5 text-amber-600" />
                        </div>
                    </div>
                </Card.Content>
            </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
                    <Card.Title>Activité Bristol</Card.Title>
                    <Card.Description>20 dernières semaines · zone idéale 3–4</Card.Description>
                </Card.Header>
                <Card.Content>
                    {bristols.length === 0 ? (
                        <p className="py-8 text-center text-sm text-gray-400">
                            Aucune donnée. Enregistrez des selles pour voir votre activité.
                        </p>
                    ) : (
                        <BristolCalendar bristols={bristols} />
                    )}
                </Card.Content>
            </Card>
        </div>

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

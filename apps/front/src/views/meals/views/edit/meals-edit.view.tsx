import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import { Card } from "@heroui/react/card";
import type { MenuIngredient } from "@fc/shared";
import {
    useMealQuery,
    useMealsQuery,
    useUpdateMealMutation,
    type MealQuery,
} from "../../../../gql/generated";
import { useMenu } from "../../hooks/use-menu";
import { computeTotalFiber } from "../../utils/compute-total-fiber";
import { FiberKpi } from "../../components/fiber-kpi/fiber-kpi";
import { IngredientForm } from "../../components/ingredient-form/ingredient-form";
import { IngredientList } from "../../components/ingredient-list/ingredient-list";
import { SaveMeal } from "../../components/save-meal/save-meal";

type MealsEditViewProps = { id: string };

export const MealsEditView = ({ id }: MealsEditViewProps) => {
    const { data } = useMealQuery({ id });
    const meal = data?.meal;

    if (!meal) return null;

    return <MealsEditLoaded meal={meal} id={id} />;
};

type MealData = NonNullable<MealQuery["meal"]>;

const MealsEditLoaded = ({ meal, id }: { meal: MealData; id: string }) => {
    const queryClient = useQueryClient();
    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: useMealsQuery.getKey() });
        queryClient.invalidateQueries({ queryKey: useMealQuery.getKey({ id }) });
    };

    const { mutate: updateMeal } = useUpdateMealMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    const navigate = useNavigate();
    const { ingredients, addIngredient, removeIngredient, updateIngredient, resetMenu } = useMenu(
        meal.ingredients as MenuIngredient[],
    );
    const totalFiberGrams = computeTotalFiber(ingredients);

    const handleSave = (name: string) => {
        updateMeal({
            input: {
                id,
                name,
                ingredients: ingredients.map(
                    ({ id: ingId, ingredientId, name: ingName, quantity }) => ({
                        id: ingId,
                        ingredientId,
                        name: ingName,
                        quantity,
                    }),
                ),
            },
        });
        resetMenu();
        void navigate({ to: "/meals" });
    };

    const handleCancel = () => {
        resetMenu();
        void navigate({ to: "/meals" });
    };

    return (
        <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-8">
            <h1 className="text-2xl font-semibold">{meal.name}</h1>

            <FiberKpi totalFiberGrams={totalFiberGrams} />

            <Card>
                <Card.Header>
                    <Card.Title>Ajouter un ingrédient</Card.Title>
                </Card.Header>
                <Card.Content>
                    <IngredientForm onAdd={addIngredient} />
                </Card.Content>
            </Card>

            <Card>
                <Card.Header>
                    <Card.Title>Menu</Card.Title>
                    <Card.Description>{ingredients.length} ingrédient(s)</Card.Description>
                </Card.Header>
                <Card.Content>
                    <IngredientList
                        ingredients={ingredients}
                        onRemove={removeIngredient}
                        onUpdate={updateIngredient}
                    />
                </Card.Content>
                <Card.Footer>
                    <SaveMeal
                        isDisabled={ingredients.length === 0}
                        isEditing={true}
                        initialName={meal.name}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                </Card.Footer>
            </Card>
        </div>
    );
};

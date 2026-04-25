import { keepPreviousData } from "@tanstack/react-query";
import { useIngredientsQuery } from "../../../gql/generated";

export const useIngredients = ({ query, page }: { query: string; page: number }) =>
    useIngredientsQuery(
        { search: query || undefined, page, perPage: 20 },
        { placeholderData: keepPreviousData, staleTime: 30_000 },
    );

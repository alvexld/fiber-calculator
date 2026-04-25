// @ts-nocheck
class TypedDocumentString<TResult, TVariables> extends String {
    __apiType?: (variables: TVariables) => TResult;
    constructor(value: string, _?: unknown) {
        super(value);
    }
}
import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';
import { fetcher } from '../services/graphql-client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Bristol = {
  __typename?: 'Bristol';
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  time: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type BristolsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateBristolInput = {
  date: Scalars['String']['input'];
  time: Scalars['String']['input'];
  value: Scalars['Int']['input'];
};

export type CreateIngredientInput = {
  defaultQuantity: Scalars['Float']['input'];
  fiberPerUnit: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  unit: Unit;
  unitDisplay?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMealInput = {
  date: Scalars['String']['input'];
  id: Scalars['String']['input'];
  ingredients: Array<MealIngredientInput>;
  name: Scalars['String']['input'];
};

export type DeleteBristolInput = {
  id: Scalars['String']['input'];
};

export type DeleteIngredientInput = {
  id: Scalars['String']['input'];
};

export type DeleteMealInput = {
  id: Scalars['String']['input'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  defaultQuantity: Scalars['Float']['output'];
  fiberPerUnit: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  unit: Unit;
  unitDisplay?: Maybe<Scalars['String']['output']>;
};

export type Meal = {
  __typename?: 'Meal';
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  ingredients: Array<MealIngredient>;
  name: Scalars['String']['output'];
  totalFiberGrams: Scalars['Float']['output'];
};

export type MealIngredient = {
  __typename?: 'MealIngredient';
  fiberGrams: Scalars['Float']['output'];
  fiberPerUnit: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  ingredientId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
  unit: Scalars['String']['output'];
};

export type MealIngredientInput = {
  id: Scalars['String']['input'];
  ingredientId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
};

export type MealsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBristol: Bristol;
  createIngredient: Ingredient;
  createMeal: Meal;
  deleteBristol: Scalars['Boolean']['output'];
  deleteIngredient: Scalars['Boolean']['output'];
  deleteMeal: Scalars['Boolean']['output'];
  updateIngredient: Ingredient;
  updateMeal: Meal;
};


export type MutationCreateBristolArgs = {
  input: CreateBristolInput;
};


export type MutationCreateIngredientArgs = {
  input: CreateIngredientInput;
};


export type MutationCreateMealArgs = {
  input: CreateMealInput;
};


export type MutationDeleteBristolArgs = {
  input: DeleteBristolInput;
};


export type MutationDeleteIngredientArgs = {
  input: DeleteIngredientInput;
};


export type MutationDeleteMealArgs = {
  input: DeleteMealInput;
};


export type MutationUpdateIngredientArgs = {
  input: UpdateIngredientInput;
};


export type MutationUpdateMealArgs = {
  input: UpdateMealInput;
};

export type PaginatedBristols = {
  __typename?: 'PaginatedBristols';
  data: Array<Bristol>;
  total: Scalars['Int']['output'];
};

export type PaginatedIngredients = {
  __typename?: 'PaginatedIngredients';
  data: Array<Ingredient>;
  total: Scalars['Int']['output'];
};

export type PaginatedMeals = {
  __typename?: 'PaginatedMeals';
  data: Array<Meal>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  bristols: PaginatedBristols;
  ingredients: PaginatedIngredients;
  meal: Meal;
  meals: PaginatedMeals;
};


export type QueryBristolsArgs = {
  input?: InputMaybe<BristolsInput>;
};


export type QueryIngredientsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMealArgs = {
  id: Scalars['String']['input'];
};


export type QueryMealsArgs = {
  input?: InputMaybe<MealsInput>;
};

export type Unit =
  | 'HUNDRED_G'
  | 'PIECE';

export type UpdateIngredientInput = {
  defaultQuantity: Scalars['Float']['input'];
  fiberPerUnit: Scalars['Float']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  unit: Unit;
  unitDisplay?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMealInput = {
  id: Scalars['String']['input'];
  ingredients: Array<MealIngredientInput>;
  name: Scalars['String']['input'];
};

export type BristolsQueryVariables = Exact<{
  input?: InputMaybe<BristolsInput>;
}>;


export type BristolsQuery = { __typename?: 'Query', bristols: { __typename?: 'PaginatedBristols', total: number, data: Array<{ __typename?: 'Bristol', id: string, date: string, time: string, value: number }> } };

export type CreateBristolMutationVariables = Exact<{
  input: CreateBristolInput;
}>;


export type CreateBristolMutation = { __typename?: 'Mutation', createBristol: { __typename?: 'Bristol', id: string, date: string, time: string, value: number } };

export type DeleteBristolMutationVariables = Exact<{
  input: DeleteBristolInput;
}>;


export type DeleteBristolMutation = { __typename?: 'Mutation', deleteBristol: boolean };

export type IngredientsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IngredientsQuery = { __typename?: 'Query', ingredients: { __typename?: 'PaginatedIngredients', total: number, data: Array<{ __typename?: 'Ingredient', id: string, name: string, unit: Unit, unitDisplay?: string | null, fiberPerUnit: number, defaultQuantity: number }> } };

export type CreateIngredientMutationVariables = Exact<{
  input: CreateIngredientInput;
}>;


export type CreateIngredientMutation = { __typename?: 'Mutation', createIngredient: { __typename?: 'Ingredient', id: string, name: string, unit: Unit, unitDisplay?: string | null, fiberPerUnit: number, defaultQuantity: number } };

export type UpdateIngredientMutationVariables = Exact<{
  input: UpdateIngredientInput;
}>;


export type UpdateIngredientMutation = { __typename?: 'Mutation', updateIngredient: { __typename?: 'Ingredient', id: string, name: string, unit: Unit, unitDisplay?: string | null, fiberPerUnit: number, defaultQuantity: number } };

export type DeleteIngredientMutationVariables = Exact<{
  input: DeleteIngredientInput;
}>;


export type DeleteIngredientMutation = { __typename?: 'Mutation', deleteIngredient: boolean };

export type MealFieldsFragment = { __typename?: 'Meal', id: string, date: string, name: string, totalFiberGrams: number, ingredients: Array<{ __typename?: 'MealIngredient', id: string, ingredientId: string, name: string, quantity: number, unit: string, fiberPerUnit: number, fiberGrams: number }> };

export type MealsQueryVariables = Exact<{
  input?: InputMaybe<MealsInput>;
}>;


export type MealsQuery = { __typename?: 'Query', meals: { __typename?: 'PaginatedMeals', total: number, data: Array<{ __typename?: 'Meal', id: string, date: string, name: string, totalFiberGrams: number, ingredients: Array<{ __typename?: 'MealIngredient', id: string, ingredientId: string, name: string, quantity: number, unit: string, fiberPerUnit: number, fiberGrams: number }> }> } };

export type MealQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type MealQuery = { __typename?: 'Query', meal: { __typename?: 'Meal', id: string, date: string, name: string, totalFiberGrams: number, ingredients: Array<{ __typename?: 'MealIngredient', id: string, ingredientId: string, name: string, quantity: number, unit: string, fiberPerUnit: number, fiberGrams: number }> } };

export type CreateMealMutationVariables = Exact<{
  input: CreateMealInput;
}>;


export type CreateMealMutation = { __typename?: 'Mutation', createMeal: { __typename?: 'Meal', id: string, date: string, name: string, totalFiberGrams: number, ingredients: Array<{ __typename?: 'MealIngredient', id: string, ingredientId: string, name: string, quantity: number, unit: string, fiberPerUnit: number, fiberGrams: number }> } };

export type UpdateMealMutationVariables = Exact<{
  input: UpdateMealInput;
}>;


export type UpdateMealMutation = { __typename?: 'Mutation', updateMeal: { __typename?: 'Meal', id: string, date: string, name: string, totalFiberGrams: number, ingredients: Array<{ __typename?: 'MealIngredient', id: string, ingredientId: string, name: string, quantity: number, unit: string, fiberPerUnit: number, fiberGrams: number }> } };

export type DeleteMealMutationVariables = Exact<{
  input: DeleteMealInput;
}>;


export type DeleteMealMutation = { __typename?: 'Mutation', deleteMeal: boolean };


export const MealFieldsFragmentDoc = new TypedDocumentString(`
    fragment MealFields on Meal {
  id
  date
  name
  ingredients {
    id
    ingredientId
    name
    quantity
    unit
    fiberPerUnit
    fiberGrams
  }
  totalFiberGrams
}
    `, {"fragmentName":"MealFields"});
export const BristolsDocument = new TypedDocumentString(`
    query Bristols($input: BristolsInput) {
  bristols(input: $input) {
    data {
      id
      date
      time
      value
    }
    total
  }
}
    `);

export const useBristolsQuery = <
      TData = BristolsQuery,
      TError = unknown
    >(
      variables?: BristolsQueryVariables,
      options?: Omit<UseQueryOptions<BristolsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<BristolsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<BristolsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Bristols'] : ['Bristols', variables],
    queryFn: fetcher<BristolsQuery, BristolsQueryVariables>(BristolsDocument, variables),
    ...options
  }
    )};

useBristolsQuery.getKey = (variables?: BristolsQueryVariables) => variables === undefined ? ['Bristols'] : ['Bristols', variables];


useBristolsQuery.fetcher = (variables?: BristolsQueryVariables, options?: RequestInit['headers']) => fetcher<BristolsQuery, BristolsQueryVariables>(BristolsDocument, variables, options);

export const CreateBristolDocument = new TypedDocumentString(`
    mutation CreateBristol($input: CreateBristolInput!) {
  createBristol(input: $input) {
    id
    date
    time
    value
  }
}
    `);

export const useCreateBristolMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateBristolMutation, TError, CreateBristolMutationVariables, TContext>) => {
    
    return useMutation<CreateBristolMutation, TError, CreateBristolMutationVariables, TContext>(
      {
    mutationKey: ['CreateBristol'],
    mutationFn: (variables?: CreateBristolMutationVariables) => fetcher<CreateBristolMutation, CreateBristolMutationVariables>(CreateBristolDocument, variables)(),
    ...options
  }
    )};


useCreateBristolMutation.fetcher = (variables: CreateBristolMutationVariables, options?: RequestInit['headers']) => fetcher<CreateBristolMutation, CreateBristolMutationVariables>(CreateBristolDocument, variables, options);

export const DeleteBristolDocument = new TypedDocumentString(`
    mutation DeleteBristol($input: DeleteBristolInput!) {
  deleteBristol(input: $input)
}
    `);

export const useDeleteBristolMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteBristolMutation, TError, DeleteBristolMutationVariables, TContext>) => {
    
    return useMutation<DeleteBristolMutation, TError, DeleteBristolMutationVariables, TContext>(
      {
    mutationKey: ['DeleteBristol'],
    mutationFn: (variables?: DeleteBristolMutationVariables) => fetcher<DeleteBristolMutation, DeleteBristolMutationVariables>(DeleteBristolDocument, variables)(),
    ...options
  }
    )};


useDeleteBristolMutation.fetcher = (variables: DeleteBristolMutationVariables, options?: RequestInit['headers']) => fetcher<DeleteBristolMutation, DeleteBristolMutationVariables>(DeleteBristolDocument, variables, options);

export const IngredientsDocument = new TypedDocumentString(`
    query Ingredients($search: String, $orderBy: String, $page: Int, $perPage: Int) {
  ingredients(search: $search, orderBy: $orderBy, page: $page, perPage: $perPage) {
    data {
      id
      name
      unit
      unitDisplay
      fiberPerUnit
      defaultQuantity
    }
    total
  }
}
    `);

export const useIngredientsQuery = <
      TData = IngredientsQuery,
      TError = unknown
    >(
      variables?: IngredientsQueryVariables,
      options?: Omit<UseQueryOptions<IngredientsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<IngredientsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<IngredientsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Ingredients'] : ['Ingredients', variables],
    queryFn: fetcher<IngredientsQuery, IngredientsQueryVariables>(IngredientsDocument, variables),
    ...options
  }
    )};

useIngredientsQuery.getKey = (variables?: IngredientsQueryVariables) => variables === undefined ? ['Ingredients'] : ['Ingredients', variables];


useIngredientsQuery.fetcher = (variables?: IngredientsQueryVariables, options?: RequestInit['headers']) => fetcher<IngredientsQuery, IngredientsQueryVariables>(IngredientsDocument, variables, options);

export const CreateIngredientDocument = new TypedDocumentString(`
    mutation CreateIngredient($input: CreateIngredientInput!) {
  createIngredient(input: $input) {
    id
    name
    unit
    unitDisplay
    fiberPerUnit
    defaultQuantity
  }
}
    `);

export const useCreateIngredientMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateIngredientMutation, TError, CreateIngredientMutationVariables, TContext>) => {
    
    return useMutation<CreateIngredientMutation, TError, CreateIngredientMutationVariables, TContext>(
      {
    mutationKey: ['CreateIngredient'],
    mutationFn: (variables?: CreateIngredientMutationVariables) => fetcher<CreateIngredientMutation, CreateIngredientMutationVariables>(CreateIngredientDocument, variables)(),
    ...options
  }
    )};


useCreateIngredientMutation.fetcher = (variables: CreateIngredientMutationVariables, options?: RequestInit['headers']) => fetcher<CreateIngredientMutation, CreateIngredientMutationVariables>(CreateIngredientDocument, variables, options);

export const UpdateIngredientDocument = new TypedDocumentString(`
    mutation UpdateIngredient($input: UpdateIngredientInput!) {
  updateIngredient(input: $input) {
    id
    name
    unit
    unitDisplay
    fiberPerUnit
    defaultQuantity
  }
}
    `);

export const useUpdateIngredientMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateIngredientMutation, TError, UpdateIngredientMutationVariables, TContext>) => {
    
    return useMutation<UpdateIngredientMutation, TError, UpdateIngredientMutationVariables, TContext>(
      {
    mutationKey: ['UpdateIngredient'],
    mutationFn: (variables?: UpdateIngredientMutationVariables) => fetcher<UpdateIngredientMutation, UpdateIngredientMutationVariables>(UpdateIngredientDocument, variables)(),
    ...options
  }
    )};


useUpdateIngredientMutation.fetcher = (variables: UpdateIngredientMutationVariables, options?: RequestInit['headers']) => fetcher<UpdateIngredientMutation, UpdateIngredientMutationVariables>(UpdateIngredientDocument, variables, options);

export const DeleteIngredientDocument = new TypedDocumentString(`
    mutation DeleteIngredient($input: DeleteIngredientInput!) {
  deleteIngredient(input: $input)
}
    `);

export const useDeleteIngredientMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteIngredientMutation, TError, DeleteIngredientMutationVariables, TContext>) => {
    
    return useMutation<DeleteIngredientMutation, TError, DeleteIngredientMutationVariables, TContext>(
      {
    mutationKey: ['DeleteIngredient'],
    mutationFn: (variables?: DeleteIngredientMutationVariables) => fetcher<DeleteIngredientMutation, DeleteIngredientMutationVariables>(DeleteIngredientDocument, variables)(),
    ...options
  }
    )};


useDeleteIngredientMutation.fetcher = (variables: DeleteIngredientMutationVariables, options?: RequestInit['headers']) => fetcher<DeleteIngredientMutation, DeleteIngredientMutationVariables>(DeleteIngredientDocument, variables, options);

export const MealsDocument = new TypedDocumentString(`
    query Meals($input: MealsInput) {
  meals(input: $input) {
    data {
      ...MealFields
    }
    total
  }
}
    fragment MealFields on Meal {
  id
  date
  name
  ingredients {
    id
    ingredientId
    name
    quantity
    unit
    fiberPerUnit
    fiberGrams
  }
  totalFiberGrams
}`);

export const useMealsQuery = <
      TData = MealsQuery,
      TError = unknown
    >(
      variables?: MealsQueryVariables,
      options?: Omit<UseQueryOptions<MealsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<MealsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<MealsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Meals'] : ['Meals', variables],
    queryFn: fetcher<MealsQuery, MealsQueryVariables>(MealsDocument, variables),
    ...options
  }
    )};

useMealsQuery.getKey = (variables?: MealsQueryVariables) => variables === undefined ? ['Meals'] : ['Meals', variables];


useMealsQuery.fetcher = (variables?: MealsQueryVariables, options?: RequestInit['headers']) => fetcher<MealsQuery, MealsQueryVariables>(MealsDocument, variables, options);

export const MealDocument = new TypedDocumentString(`
    query Meal($id: String!) {
  meal(id: $id) {
    ...MealFields
  }
}
    fragment MealFields on Meal {
  id
  date
  name
  ingredients {
    id
    ingredientId
    name
    quantity
    unit
    fiberPerUnit
    fiberGrams
  }
  totalFiberGrams
}`);

export const useMealQuery = <
      TData = MealQuery,
      TError = unknown
    >(
      variables: MealQueryVariables,
      options?: Omit<UseQueryOptions<MealQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<MealQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<MealQuery, TError, TData>(
      {
    queryKey: ['Meal', variables],
    queryFn: fetcher<MealQuery, MealQueryVariables>(MealDocument, variables),
    ...options
  }
    )};

useMealQuery.getKey = (variables: MealQueryVariables) => ['Meal', variables];


useMealQuery.fetcher = (variables: MealQueryVariables, options?: RequestInit['headers']) => fetcher<MealQuery, MealQueryVariables>(MealDocument, variables, options);

export const CreateMealDocument = new TypedDocumentString(`
    mutation CreateMeal($input: CreateMealInput!) {
  createMeal(input: $input) {
    ...MealFields
  }
}
    fragment MealFields on Meal {
  id
  date
  name
  ingredients {
    id
    ingredientId
    name
    quantity
    unit
    fiberPerUnit
    fiberGrams
  }
  totalFiberGrams
}`);

export const useCreateMealMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateMealMutation, TError, CreateMealMutationVariables, TContext>) => {
    
    return useMutation<CreateMealMutation, TError, CreateMealMutationVariables, TContext>(
      {
    mutationKey: ['CreateMeal'],
    mutationFn: (variables?: CreateMealMutationVariables) => fetcher<CreateMealMutation, CreateMealMutationVariables>(CreateMealDocument, variables)(),
    ...options
  }
    )};


useCreateMealMutation.fetcher = (variables: CreateMealMutationVariables, options?: RequestInit['headers']) => fetcher<CreateMealMutation, CreateMealMutationVariables>(CreateMealDocument, variables, options);

export const UpdateMealDocument = new TypedDocumentString(`
    mutation UpdateMeal($input: UpdateMealInput!) {
  updateMeal(input: $input) {
    ...MealFields
  }
}
    fragment MealFields on Meal {
  id
  date
  name
  ingredients {
    id
    ingredientId
    name
    quantity
    unit
    fiberPerUnit
    fiberGrams
  }
  totalFiberGrams
}`);

export const useUpdateMealMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateMealMutation, TError, UpdateMealMutationVariables, TContext>) => {
    
    return useMutation<UpdateMealMutation, TError, UpdateMealMutationVariables, TContext>(
      {
    mutationKey: ['UpdateMeal'],
    mutationFn: (variables?: UpdateMealMutationVariables) => fetcher<UpdateMealMutation, UpdateMealMutationVariables>(UpdateMealDocument, variables)(),
    ...options
  }
    )};


useUpdateMealMutation.fetcher = (variables: UpdateMealMutationVariables, options?: RequestInit['headers']) => fetcher<UpdateMealMutation, UpdateMealMutationVariables>(UpdateMealDocument, variables, options);

export const DeleteMealDocument = new TypedDocumentString(`
    mutation DeleteMeal($input: DeleteMealInput!) {
  deleteMeal(input: $input)
}
    `);

export const useDeleteMealMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteMealMutation, TError, DeleteMealMutationVariables, TContext>) => {
    
    return useMutation<DeleteMealMutation, TError, DeleteMealMutationVariables, TContext>(
      {
    mutationKey: ['DeleteMeal'],
    mutationFn: (variables?: DeleteMealMutationVariables) => fetcher<DeleteMealMutation, DeleteMealMutationVariables>(DeleteMealDocument, variables)(),
    ...options
  }
    )};


useDeleteMealMutation.fetcher = (variables: DeleteMealMutationVariables, options?: RequestInit['headers']) => fetcher<DeleteMealMutation, DeleteMealMutationVariables>(DeleteMealDocument, variables, options);

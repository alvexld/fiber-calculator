const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
const GQL_URL = `${BASE}/graphql`;

export const fetcher =
    <TData, TVariables>(
        query: { toString(): string } | string,
        variables?: TVariables,
        _headers?: RequestInit["headers"],
    ): (() => Promise<TData>) =>
    async () => {
        const res = await fetch(GQL_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ query: query.toString(), variables }),
        });

        if (res.status === 401) {
            window.location.href = "/login";
            throw new Error("Unauthorized");
        }

        const json = (await res.json()) as {
            data: TData;
            errors?: Array<{ message: string }>;
        };
        if (json.errors?.length) throw new Error(json.errors[0].message);
        return json.data;
    };

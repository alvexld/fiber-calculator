import type { CodegenConfig } from "@graphql-codegen/cli";

const typedDocumentString = `
// @ts-nocheck
class TypedDocumentString<TResult, TVariables> extends String {
    __apiType?: (variables: TVariables) => TResult;
    constructor(value: string, _?: unknown) {
        super(value);
    }
}
`.trim();

const config: CodegenConfig = {
    schema: "../back/src/**/*.graphql",
    documents: ["src/**/*.graphql"],
    hooks: {
        afterAllFileWrite: ["node scripts/fix-generated-imports.mjs"],
    },
    generates: {
        "src/gql/generated.ts": {
            plugins: [
                { add: { content: typedDocumentString } },
                "typescript",
                "typescript-operations",
                "typescript-react-query",
            ],
            config: {
                enumsAsTypes: true,
                fetcher: {
                    func: "../services/graphql-client#fetcher",
                    isReactHook: false,
                },
                exposeQueryKeys: true,
                exposeFetcher: true,
                withHooks: true,
                reactQueryVersion: 5,
            },
        },
    },
};

export default config;

import { readFileSync, writeFileSync } from "fs";

const file = "src/gql/generated.ts";
const content = readFileSync(file, "utf8").replace(
    /import \{ useQuery, useMutation, UseQueryOptions, UseMutationOptions \} from ['"]@tanstack\/react-query['"];/,
    `import { useQuery, useMutation } from '@tanstack/react-query';\nimport type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';`,
);
writeFileSync(file, content);

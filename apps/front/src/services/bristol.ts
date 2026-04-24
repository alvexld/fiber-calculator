import type { Bristol, CreateBristol } from "@fc/shared";
import { apiUrl, jsonBody, request } from "./api-client";

export const getBristols = (): Promise<Bristol[]> => request(apiUrl("/bristol"));

export const addBristol = (data: CreateBristol): Promise<Bristol> =>
    request(apiUrl("/bristol"), jsonBody("POST", data));

export const removeBristol = (id: string): Promise<void> =>
    request(apiUrl(`/bristol/${id}`), { method: "DELETE" });

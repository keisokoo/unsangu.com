import { QueryClient } from "@tanstack/query-core";
import { cache } from "react";
import { queryClientOption } from "./queryClientOptions";
const getQueryClient = cache(() =>
  new QueryClient(queryClientOption));
export default getQueryClient;
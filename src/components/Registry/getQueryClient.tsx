import { QueryClient } from "@tanstack/react-query";

const getQueryClient = () => new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
export default getQueryClient;

export const staleTime = 1000 * 30
export const cacheTime = 1000 * 60 * 60 * 24
export const queryClientOption = { defaultOptions: { queries: { staleTime, cacheTime } } }
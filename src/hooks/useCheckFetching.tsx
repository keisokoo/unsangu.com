import { useMemo } from "react";

export const useCheckFetching = (...fetchingArray: boolean[]) => {
  return useMemo(() => {
    return fetchingArray.some((fetching) => fetching);
  }, [fetchingArray]);
};

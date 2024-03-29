import { WorkoutEndpoints } from "@/features/endpoints/workout.endpoints";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useLoadMoreWorkouts() {
  const { data, isLoading, error, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ["useLoadMoreWorkouts"],
    queryFn: WorkoutEndpoints.getByPage,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
  const isNextPage = !!data?.pages[data.pageParams.length - 1].length;
  return { data, isNextPage, isLoading, error, fetchNextPage, refetch };
}

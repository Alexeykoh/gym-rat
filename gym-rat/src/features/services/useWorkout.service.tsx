"use client";
import { WorkoutEndpoints } from "@/features/endpoints/workout.endpoints";
import { UserContext } from "@/lib/context/user-context";
import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import {
  InvalidateQueryFilters,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useContext } from "react";
import { WorkoutService } from "./workouts.service";

export default function useWorkoutService() {
  const user = useContext(UserContext);
  const queryClient = useQueryClient();

  // GET
  const getAll = (enabled: boolean) => {
    const { data, isLoading } = useQuery({
      queryKey: ["UseWorkoutService", "getAll"],
      enabled: enabled,
      queryFn: WorkoutEndpoints.getAll,
    });
    return { data, isLoading };
  };

  const getByPage = (enabled: boolean) => {
    const { data, isLoading, error, fetchNextPage, refetch } = useInfiniteQuery(
      {
        queryKey: ["UseWorkoutService", "getByPage"],
        queryFn: WorkoutEndpoints.getByPage,
        enabled: enabled,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = lastPage.length ? allPages.length + 1 : undefined;
          return nextPage;
        },
      }
    );
    const isNextPage = !!data?.pages[data.pageParams.length - 1].length;
    return { data, isNextPage, isLoading, error, fetchNextPage, refetch };
  };
  const getById = (id: string, enabled: boolean) => {
    const { data, isLoading } = useQuery({
      queryKey: ["UseWorkoutService", "getById"],
      enabled: enabled,
      queryFn: () => WorkoutEndpoints.getById(id),
    });
    return { data, isLoading };
  };

  // POST
  const createWorkout = () => {
    const postWorkout = useMutation({
      mutationKey: ["UseWorkoutService", "post"],
      mutationFn: async (data: iWorkout) => {
        await WorkoutService.postWorkout({
          ...data,
          user_id: user?.userData?._id as string,
        });
      },
      onSuccess() {
        queryClient.invalidateQueries([
          ["UseWorkoutService", "post"],
        ] as InvalidateQueryFilters);
      },
    });
    return postWorkout;
  };

  return {
    get: { getAll, getByPage, getById },
    post: { createWorkout },
    put: {},
    delete: {},
  };
}

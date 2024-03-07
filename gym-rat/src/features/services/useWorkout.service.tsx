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

export default function useWorkoutService() {
  const user = useContext(UserContext);
  const queryClient = useQueryClient();

  // GET
  const useGetAll = (enabled: boolean) => {
    const { data, isLoading } = useQuery({
      queryKey: ["UseWorkoutService", "getAll"],
      enabled: enabled,
      queryFn: WorkoutEndpoints.getAll,
    });
    return { data, isLoading };
  };

  const useGetByPage = (enabled: boolean) => {
    const { data, isLoading, error, fetchNextPage, refetch } = useInfiniteQuery(
      {
        queryKey: ["UseWorkoutService"],
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
  const useGetById = (id: string, enabled: boolean) => {
    const { data, isLoading } = useQuery({
      queryKey: ["UseWorkoutService", "getById"],
      enabled: enabled,
      queryFn: () => WorkoutEndpoints.getById(id),
    });
    return { data, isLoading };
  };
  const useFind = (value: string, enabled: boolean) => {
    const { data, isLoading } = useQuery({
      queryKey: ["UseWorkoutService", "find"],
      enabled: enabled,
      queryFn: () => WorkoutEndpoints.find(value),
    });
    return { data, isLoading };
  };

  // POST
  const useCreateWorkout = () => {
    const mutation = useMutation({
      mutationKey: ["UseWorkoutService", "post"],
      mutationFn: async (data: iWorkout) => {
        await WorkoutEndpoints.postWorkout({
          ...data,
          user_id: user?.userData?._id as string,
        });
      },
      onSuccess() {
        queryClient.invalidateQueries([
          ["UseWorkoutService"],
        ] as InvalidateQueryFilters);
      },
    });
    return mutation;
  };

  // DELETE
  const deleteWorkout = useMutation({
    mutationKey: ["UseWorkoutService", "delete"],
    mutationFn: async (workoutId: string) => {
      await WorkoutEndpoints.deleteWorkout(workoutId);
    },
    onSuccess() {
      queryClient.invalidateQueries([
        ["UseWorkoutService"],
      ] as InvalidateQueryFilters);
    },
  });

  return {
    get: {
      getAll: useGetAll,
      getByPage: useGetByPage,
      getById: useGetById,
      find: useFind,
    },
    post: { createWorkout: useCreateWorkout },
    put: {},
    delete: { deleteWorkout },
  };
}

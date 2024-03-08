'use client'
import { useNavContext } from "@/lib/context/nav-context";

interface iUseWorkoutHook{
}

export default function UseWorkoutHook({}:iUseWorkoutHook){
  const {} = useNavContext("workoutExercise");


}
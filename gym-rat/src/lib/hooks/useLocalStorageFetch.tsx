import { useEffect, useState } from "react";
import { iExercise } from "../interfaces/Exercise.interface";
import { iExerciseOrder } from "../interfaces/ExerciseOrder.interface";
import { iWorkout } from "../interfaces/Workouts.interface";

const useLocalStorageFetch = <T,>(
  name: string,
  fetchFunction: () => Promise<T | null>
) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  //
  const fetchData = async () => {
    try {
      // Check if data is already stored in local storage
      setLoading(true);
      const localData: string | null = localStorage.getItem(name);
      if (localData && localData !== "undefined") {
        console.log(
          `${name}: get data from LocalStorage`,
          JSON.parse(localData)
        );
        setData(JSON.parse(localData));
        setLoading(false);
        //
        updateState();
        //
      } else {
        setLoading(true);
        console.log(`${name}: start fetching...`);
        const response: T | null = await fetchFunction();
        if (response) {
          console.log(
            `${name}: parse data and set to state & storage`,
            response
          );
          localStorage.setItem(name, JSON.stringify(response));
          setData(response);
          setLoading(false);
        } else {
          console.error(`${name}: parse error`);
          setLoading(false);
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  //
  async function updateState() {
    setLoading(true);
    console.log(`${name}: update state & LocalStorage`);
    const response: T | null = await fetchFunction();
    console.log(`${name}: parse data and set to state & storage`, response);
    localStorage.setItem(name, JSON.stringify(response));
    setData(response);
    setLoading(false);
    return response;
  }
  //
  useEffect(() => {
    fetchData();
  }, []);
  //
  return [data, loading, updateState] as [T, Boolean, () => Promise<T>];
};
//
export default useLocalStorageFetch;

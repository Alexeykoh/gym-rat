"use client";
import { RootState } from "@/app/GlobalRegux/store";
import CardLayout from "@/components/cardLayout/cardLayout";
import ActionButton from "@/components/ui/ActionButton";
import { iExercise } from "@/models/exerciseModel";
import { iExerciseType } from "@/models/exerciseTypeModel";
import { iWorkoutExercises } from "@/models/workoutExercisesModel";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

type pageProps = { params: { id: string } };
enum Pages {
  Types = " ",
  Exercises = " -translate-x-[100%] ",
  Confirm = " -translate-x-[200%] ",
}

const WorkoutExercisePage: FC<pageProps> = ({ params }) => {
  const typesData = useSelector((state: RootState) => state.types);
  const exerciseItems = useSelector((state: RootState) => state.exerciseItems);

  const [types, setTypes] = useState<iExerciseType[]>(
    typesData.entities.message
  );
  const [exercises, setExercises] = useState<iExercise[]>([]);
  const [slider, setSlider] = useState<Pages>(Pages.Types);

  const [formData, setFormData] = useState<iWorkoutExercises | null>({
    workout_id: "",
    exercise_id: "",
    name: "",
    order: 0,
  });
  const router = useRouter();
  //

  //
  async function getTypes() {
    fetch("/api/exercises/types")
      .then((res) => res.json())
      .then((data) => {
        setTypes(data?.message);
      });
  }
  function getExerciseByType(type: string | undefined) {
    setExercises(
      exerciseItems.entities.message.filter(
        (item: any) => item.type_id === type
      )
    );
    setSlider(Pages.Exercises);
  }
  async function createNewExercise() {
    axios
      .post("/api/workouts/exercises/" + params.id, {
        ...formData,
      })
      .then(({ data }) => {
        router.push(`/workouts/${params.id}`);
      });
  }
  useEffect(() => {
    // getTypes();
    // getWorkoutExercises();
  }, []);

  return (
    <>
      <div className="w-full overflow-hidden lg:w-1/4">
        <div className={slider + "w-full flex flex-row  duration-200 over"}>
          <section className="flex flex-col gap-6 shrink-0 w-full">
            <div className="flex justify-between">
              <h2 className="text-4xl font-semibold">
                Выберите <br /> группу
              </h2>
              <button
                onClick={() => {
                  router.push(`/workouts/${params.id}`);
                }}
                className="p-4 text-xl bg-gray-700 rounded-2xl"
              >
                Назад
              </button>
            </div>

            <div className="flex w-full flex-col gap-4">
              {typesData.entities.message?.map((el: any, ind: number) => {
                return (
                  <div
                    key={ind}
                    onClick={() => {
                      getExerciseByType(el._id);
                    }}
                  >
                    <CardLayout>
                      <p className="text-3xl">{el.name}</p>
                    </CardLayout>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="flex flex-col gap-6 shrink-0 w-full">
            <div className="flex justify-between">
              <h2 className="text-4xl font-semibold">
                Выберите <br /> упражнение
              </h2>
              <button
                onClick={() => {
                  setSlider(Pages.Types);
                }}
                className="p-4 text-xl bg-gray-700 rounded-2xl"
              >
                Назад
              </button>
            </div>
            <div className="flex w-full flex-col gap-4">
              {!exercises.length
                ? null
                : exercises.map((el, ind) => {
                    return (
                      <div
                        key={ind}
                        onClick={() => {
                          setSlider(Pages.Confirm);
                          setFormData((prevData: any) => {
                            return {
                              ...prevData,
                              exercise_id: el._id,
                              workout_id: params.id,
                              name: el.name,
                              order: ind,
                            };
                          });
                        }}
                      >
                        <CardLayout>
                          <p className="text-3xl">{el.name}</p>
                        </CardLayout>
                      </div>
                    );
                  })}
            </div>
          </section>
          <section className="flex flex-col gap-6 shrink-0 w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-semibold">Подтвердить</h2>
              <button
                onClick={() => {
                  setSlider(Pages.Exercises);
                }}
                className="p-4 text-xl bg-gray-700 rounded-2xl"
              >
                Назад
              </button>
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex gap-2">
                <p>{"Название: "}</p>
                <p>{formData?.name}</p>
              </div>
            </div>
            <ActionButton
              busy={false}
              action={createNewExercise}
              text={"Добавить упражнение"}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default WorkoutExercisePage;

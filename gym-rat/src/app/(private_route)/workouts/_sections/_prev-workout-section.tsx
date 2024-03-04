import CardLayout from "@/components/cardLayout/cardLayout";
import { useIntersection } from "@/lib/hooks/useIntersection";
import AdditionalButton from "@/shared/ui/buttons/AdditionalButton";
import WorkoutCard from "@/shared/ui/cards/workout-card/workout-card";
import { Medal, Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import Title from "../_IU/_title";
import { useLoadMoreWorkouts } from "../_useLoadMoreWorkouts";
import WorkoutCreateForm from "@/features/forms/workoutCreateForm/workout-create-form";
import ActionButton from "@/shared/ui/buttons/ActionButton";
import useModal from "@/widgets/modals/floatModal/_useModal";

export default function PrevWorkoutSection() {
  const { data, isNextPage, fetchNextPage, refetch } = useLoadMoreWorkouts();
  const triggerRef = useRef(null);
  const isVisible = useIntersection({
    element: triggerRef,
    rootMargin: "0px",
  });
  const { modalElement, openModal } = useModal({
    children: <WorkoutCreateForm />,
  });
  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [data, isVisible]);
  return (
    <>
      <section className="flex flex-col gap-4">
        <Title text="Предыдущие" />
        {data?.pages
          ?.flat()
          .map(({ date, description, name, _id }, ind: number) => {
            return (
              <CardLayout key={ind}>
                <WorkoutCard
                  icon={<Medal />}
                  title={name}
                  description={description}
                  date={date}
                  id={_id as string}
                />
              </CardLayout>
            );
          })}
        <span
          ref={triggerRef}
          className={(!isNextPage && " hidden ") + ""}
        ></span>
        <AdditionalButton
          isVisible={isNextPage}
          text={"Показать ещё "}
          action={() => {
            fetchNextPage();
          }}
        />
      </section>
      <span className="fixed bottom-4 right-4 z-40">
        <ActionButton
          action={openModal}
          text={<Plus className="text-rose-400" />}
          color="bg-zinc-700"
        />
      </span>
      {modalElement}
    </>
  );
}
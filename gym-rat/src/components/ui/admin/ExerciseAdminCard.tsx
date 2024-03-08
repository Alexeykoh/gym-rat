"use client";

import { iExercise } from "@/lib/interfaces/Exercise.interface";
import { FilePenLine, Trash2 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import TextBadge, { enumTextBadge } from "../../../shared/ui/badges/TextBadge";
import ContextMenu from "../ContextMenu";

interface ExerciseAdminCardProps extends iExercise {
  removeExercise: () => void;
  updateExercise: () => void;
  isLoading: boolean;
}

const ExerciseAdminCard: FC<ExerciseAdminCardProps> = ({
  _id,
  name,
  description,
  removeExercise,
  updateExercise,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <>
      <li
        className={
          (isVisible ? " opacity-100 " : " opacity-0 ") +
          " duration-300 p-4 bg-gray-100/20 rounded-lg flex items-start justify-between"
        }
      >
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 ">
            <p className="font-semibold text-2xl">{name}</p>
            <TextBadge value={_id as string} type={enumTextBadge.Normal} />
          </div>
          <p>{description}</p>
        </div>
        <ContextMenu
          data={[
            {
              name: "Изменить",
              icon: <FilePenLine />,
              action: () => {
                updateExercise();
              },
            },
            {
              name: "Удалить",
              icon: <Trash2 />,
              action: () => {
                removeExercise();
              },
            },
          ]}
        />
      </li>
    </>
  );
};

export default ExerciseAdminCard;

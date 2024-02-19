"use client";

import { iExercise } from "@/models/exerciseModel";
import { FilePenLine, Trash2 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import Badge, { BadgeType } from "../Badge";
import ContextMenu from "../ContextMenu";

interface ExerciseAdminCardProps extends iExercise {
  removeExercise: () => any;
  updateExercise: () => any;
  isLoading: boolean;
}

const ExerciseAdminCard: FC<ExerciseAdminCardProps> = ({
  _id,
  type_id,
  name,
  description,
  removeExercise,
  updateExercise,
  isLoading,
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
            <Badge value={_id} type={BadgeType.Normal} />
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

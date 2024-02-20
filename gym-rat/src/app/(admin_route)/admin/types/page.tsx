"use client";

import ExerciseTypeForm from "@/components/forms/exerciseType/exerciseTypeForm";
import ActionButton from "@/components/ui/ActionButton";
import Badge, { BadgeType } from "@/components/ui/Badge";
import Search from "@/components/ui/Search";
import Modal from "@/components/widgets/modal/Modal";
import { iExerciseType } from "@/models/exerciseTypeModel";
import { MousePointerClick, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TypesPage() {
  const router = useRouter();
  //
  const [loading, setLoading] = useState<boolean>(false);
  const [types, setTypes] = useState<iExerciseType[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  //
  async function getTypes() {
    setLoading(true);
    fetch("/api/exercises/types")
      .then((res) => res.json())
      .then((data) => {
        setTypes(data?.message);
        setLoading(false);
      });
  }

  async function createType(formData: iExerciseType): Promise<Response> {
    return await fetch("/api/exercises/types", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  }

  //
  useEffect(() => {
    getTypes();
  }, []);
  //

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-evenly">
      <div className="fixed bottom-8 right-8 z-40">
        <ActionButton
          text={<Plus />}
          action={() => {
            setModal(true);
          }}
        />
      </div>
      {/* <Search /> */}
      {!modal ? null : (
        <Modal
          close={function (): void {
            setModal(false);
          }}
        >
          <h2 className="text-2xl font-semibold">Новая категория</h2>
          <br />
          <ExerciseTypeForm
            setTypes={function (el) {
              setTypes((data: any) => [...data, el]);
            }}
            onSuccess={function () {
              setModal(false);
            }}
            submitAction={createType}
          />
        </Modal>
      )}

      <ul className="gap-6 w-full grid grid-cols-1 lg:grid-cols-4">
        {!types ? (
          <p>Loading</p>
        ) : (
          types.map((el, ind) => {
            return (
              <li
                onClick={() => router.push(`types/${el._id}`)}
                key={ind}
                className="p-4 bg-gray-100/20 rounded-lg flex items-start justify-between"
              >
                <div className="flex flex-col gap-2">
                  <Badge value={el._id} type={BadgeType.Info} />
                  <p className="font-semibold text-2xl">{el?.name}</p>
                  <p>{el?.description}</p>
                </div>
                <MousePointerClick />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

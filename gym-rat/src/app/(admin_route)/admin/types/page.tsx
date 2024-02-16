"use client";

import ExerciseTypeForm from "@/components/forms/exerciseType/exerciseTypeForm";
import ContextMenu from "@/components/ui/ContextMenu";
import Search from "@/components/ui/Search";
import Modal from "@/components/widgets/modal/Modal";
import { iExerciseType } from "@/models/exerciseTypeModel";
import { FilePenLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function TypesPage() {
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

  async function updateType(el: iExerciseType) {
    const data: iExerciseType = {
      name: (prompt("Enter new name:", el.name) as string) || el.name,
      description:
        (prompt("Enter new description:", el.description) as string) ||
        el.description,
    };
    const update = await fetch("/api/exercises/types/" + el._id, {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((data: any) => data.json())
      .then((res) => {
        getTypes();
        setLoading(false);
      });
  }
  async function removeType(id: any) {
    const answer = window.confirm("are you sure?");
    if (!answer) {
      return;
    }
    setLoading(true);
    const remove = await fetch("/api/exercises/types/" + id, {
      method: "DELETE",
      body: JSON.stringify("formData"),
    })
      .then((data: any) => data.json())
      .then((res) => {
        getTypes();
        setLoading(false);
      });
  }
  //
  useEffect(() => {
    getTypes();
  }, []);
  //

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-evenly">
      <Search />
      <button
        onClick={() => {
          setModal(true);
        }}
        className="px-4 py-2 w-fit bg-gray-400 rounded-lg self-start"
      >
        add new type
      </button>
      {!modal ? null : (
        <Modal
          close={function (): void {
            setModal(false);
          }}
        >
          <h2 className="text-2xl font-semibold">New type</h2>
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

      <ul className="flex flex-col gap-6 w-full">
        {!types ? (
          <p>Loading</p>
        ) : (
          types.map((el, ind) => {
            return (
              <li
                key={ind}
                className="p-4 bg-gray-100/20 rounded-lg flex items-start justify-between"
              >
                <div className="flex flex-col">
                  <p className="font-semibold text-2xl">{el?.name}</p>
                  <p>{el?.description}</p>
                </div>
                <ContextMenu
                  data={[
                    {
                      name: "Изменить",
                      icon: <FilePenLine />,
                      action: () => {
                        updateType(el);
                      },
                    },
                    {
                      name: "Удалить",
                      icon: <Trash2 />,
                      action: () => {
                        removeType(el._id);
                      },
                    },
                  ]}
                />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

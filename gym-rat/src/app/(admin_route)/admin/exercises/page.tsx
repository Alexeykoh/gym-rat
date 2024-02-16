"use client";
import ExerciseForm from "@/components/forms/exercise/exerciseForm";
import ContextMenu from "@/components/ui/ContextMenu";
import Search from "@/components/ui/Search";
import Modal from "@/components/widgets/modal/Modal";
import { iExercise } from "@/models/exerciseModel";
import { iExerciseType } from "@/models/exerciseTypeModel";
import axios from "axios";
import { FilePenLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ExercisesPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [types, setTypes] = useState<iExerciseType[]>([]);
  const [exercise, setExercise] = useState<iExercise[]>([]);
  //
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
  async function getExercise() {
    setLoading(true);
    fetch("/api/exercises/items")
      .then((res) => res.json())
      .then((data) => {
        setExercise(data?.message);
        setLoading(false);
      });
  }

  async function removeExercise(id: any) {
    const answer = window.confirm("are you sure?");
    if (!answer) {
      return;
    }
    setLoading(true);
    axios
      .delete("/api/exercises/items/" + id, {
        data: JSON.stringify("formData"),
      })
      .then(({ data }) => {
        getExercise();
        setLoading(false);
      });
  }
  async function updateExercise(el: iExercise) {
    const data: iExercise = {
      name: (prompt("Enter new name:", el.name) as string) || el.name,
      description:
        (prompt("Enter new description:", el.description) as string) ||
        el.description,
      type_id: el.type_id,
    };
    const update = await fetch("/api/exercises/items/" + el._id, {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((data: any) => data.json())
      .then((res) => {
        getExercise();
        setLoading(false);
      });
  }
  //
  useEffect(() => {
    getTypes();
    getExercise();
  }, []);
  if (loading) {
    return <p>Loading ...</p>;
  }
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
        add new exercise
      </button>
      {!modal ? null : (
        <Modal
          close={function (): void {
            setModal(false);
          }}
        >
          <h2 className="text-2xl font-semibold">New exercise</h2>
          <br />
          <ExerciseForm
            typeList={types}
            onSuccess={function () {
              setModal(false);
              getExercise();
            }}
          />
        </Modal>
      )}
      <ul className="flex flex-col gap-6 w-full">
        {!types ? (
          <p>Loading</p>
        ) : (
          exercise.map((item, ind) => {
            const type = types.find((el) => {
              return el._id === item.type_id;
            });
            const error = !type;
            return (
              <li
                key={ind}
                className="p-4 bg-gray-100/20 rounded-lg flex items-start justify-between"
              >
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <p
                      className={
                        (error ? " bg-orange-400 " : " bg-gray-100/30 ") +
                        "  text-xs px-2 py-1 w-fit rounded-lg h-fit"
                      }
                    >
                      {type?.name || "type error"}
                    </p>
                    <p className="font-semibold text-2xl">{item?.name}</p>
                  </div>
                  <p>{item?.description}</p>
                </div>
                <ContextMenu
                  data={[
                    {
                      name: "Изменить",
                      icon: <FilePenLine />,
                      action: () => {
                        updateExercise(item);
                      },
                    },
                    {
                      name: "Удалить",
                      icon: <Trash2 />,
                      action: () => {
                        removeExercise(item._id);
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
  //
}

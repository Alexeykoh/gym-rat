"use client";

import ExerciseForm from "@/components/forms/exercise/exerciseForm";
import ActionButton from "@/components/ui/ActionButton";
import BackButton from "@/components/ui/BackButton";
import Badge, { BadgeType } from "@/components/ui/Badge";
import ContextMenu from "@/components/ui/ContextMenu";
import ExerciseAdminCard from "@/components/ui/admin/ExerciseAdminCard";
import Modal from "@/components/widgets/modal/Modal";
import { iExercise } from "@/models/exerciseModel";
import { iExerciseType } from "@/models/exerciseTypeModel";
import axios from "axios";
import { FilePenLine, Plus, RefreshCw, Settings, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

type pageProps = {
  params: any;
};

const Page: FC<pageProps> = ({ params }) => {
  const router = useRouter();
  //
  const [loading, setLoading] = useState<boolean>(false);
  const [types, setTypes] = useState<iExerciseType[]>([]);
  const [exercise, setExercise] = useState<iExercise[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [currentType, setCurrentType] = useState<iExerciseType>();
  //
  function getCurrentType() {
    axios.get("/api/exercises/types/" + params.id).then((res) => {
      setCurrentType(res.data.message);
    });
  }
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
    fetch("/api/exercises/items/" + params.id)
      .then((res) => res.json())
      .then((data) => {
        setExercise(data?.message);
        setLoading(false);
      });
  }
  //
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
        getCurrentType();
        // getTypes();
        setLoading(false);
      });
  }
  //
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
        router.push("/admin/types");
      });
  }
  //
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
        setLoading(false);
        getExercise();
        //
      });
  }
  //
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
    getCurrentType();
    getTypes();
    getExercise();
  }, []);
  //
  return (
    <>
      <div className="fixed bottom-8 left-8 z-40">
        <BackButton
          action={() => {
            router.push(`/admin/types`);
          }}
        />
      </div>
      <div className="fixed bottom-8 right-8 z-40">
        <ActionButton
          text={<Plus />}
          action={() => {
            setModal(true);
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl">{currentType?.name}</h1>
          <Badge value={params.id} type={BadgeType.Normal} />
        </div>
        <ContextMenu
          icon={<Settings className="active:rotate-180 duration-150" />}
          data={[
            {
              name: "Обновить",
              icon: <RefreshCw />,
              action: () => {
                getExercise();
              },
            },
            {
              name: "Изменить",
              icon: <FilePenLine />,
              action: () => {
                updateType(currentType as iExerciseType);
              },
            },
            {
              name: "Удалить",
              icon: <Trash2 />,
              action: () => {
                removeType(params.id);
              },
            },
          ]}
        />
      </div>

      <div className="w-full h-full flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-evenly">
        {!modal ? null : (
          <Modal
            close={function (): void {
              setModal(false);
            }}
          >
            <h2 className="text-2xl font-semibold">Новое упражнение</h2>
            <br />
            <ExerciseForm
              name={currentType?.name as string}
              onSuccess={function () {
                setModal(false);
                getExercise();
              }}
              typeID={params.id}
            />
          </Modal>
        )}
        <ul className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full pb-64 ">
          {!types ? (
            <p>Загрузка...</p>
          ) : (
            exercise.map((el, ind) => {
              const { description, name, _id, type_id } = el;
              return (
                <ExerciseAdminCard
                  key={ind}
                  isLoading={true}
                  type_id={type_id}
                  removeExercise={function () {
                    removeExercise(_id);
                  }}
                  updateExercise={function () {
                    updateExercise(el);
                  }}
                  _id={_id}
                  name={name}
                  description={description}
                />
              );
            })
          )}
        </ul>
      </div>
    </>
  );
};

export default Page;

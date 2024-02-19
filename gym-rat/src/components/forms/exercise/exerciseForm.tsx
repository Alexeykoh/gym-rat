"use client";

import ActionButton from "@/components/ui/ActionButton";
import Badge, { BadgeType } from "@/components/ui/Badge";
import { iExercise } from "@/models/exerciseModel";
import { useState } from "react";
import { iErrors, pageProps } from "./types";

export default function ExerciseForm({ typeID, onSuccess, name }: pageProps) {
  const [busy, setBusy] = useState(false);
  const initialFormData: iExercise = {
    type_id: typeID,
    name: "",
    description: "",
  };
  //
  const [errors, setErrors] = useState<iErrors>({
    type_id: "",
    name: "",
    description: "",
    exist: "",
  });
  const [formData, setFormData] = useState<iExercise>(initialFormData);
  const handleSubmit = async (e: any) => {
    setBusy(true);
    //
    let isValid: boolean = true;
    let newErrors: iErrors = {
      type_id: "",
      name: "",
      exist: "",
      description: "",
    };
    //
    if (!formData.type_id) {
      isValid = false;
      newErrors.type_id = "Type is required";
    }
    if (!formData.name) {
      isValid = false;
      newErrors.name = "Name is required";
    }
    //
    if (!isValid) {
      setErrors(newErrors);
      setBusy(false);
    } else {
      //
      const res = await fetch("/api/exercises/items", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then((data: any) => {
          switch (data.status) {
            case 409:
              throw new Error("This name already exist");
            case 500:
              throw new Error("Something went wrong on server");
            default:
              break;
          }
          return data.json();
        })
        .then((el) => {
          setFormData(initialFormData);
          setErrors(newErrors);
          onSuccess();
          setBusy(false);
        })
        .catch((err) => {
          newErrors.name = err.message;
          setErrors(newErrors);
          setBusy(false);
        });
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <h1 className="text-4xl">{name}</h1>
      <Badge value={typeID} type={BadgeType.Info} />
      <div className="flex flex-col w-full">
        <label className="p-2">
          Название <span className="text-red-400">*</span>
        </label>
        <input
          onChange={handleChange}
          name="name"
          className="text-black px-4 py-2 rounded-lg"
          type="text"
          value={formData.name}
        />
        <div className="error text-red-400">{errors.name}</div>
      </div>
      <div className="flex flex-col w-full">
        <label className="p-2">Описание</label>
        <input
          onChange={handleChange}
          name="description"
          className="text-black px-4 py-2 rounded-lg"
          type="text"
          value={formData.description}
        />
        <div className="error text-red-400">{errors.description}</div>
      </div>
      <div className="error text-red-400">{errors.exist}</div>
      <ActionButton text="Создать упражнение" busy={busy} />
    </form>
  );
}

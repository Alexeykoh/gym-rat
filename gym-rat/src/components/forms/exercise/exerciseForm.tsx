"use client";

import ActionButton from "@/components/ui/ActionButton";
import { iExercise } from "@/models/exerciseModel";
import { useState } from "react";
import { iErrors, pageProps } from "./types";

export default function ExerciseForm({ typeList, onSuccess }: pageProps) {
  const [busy, setBusy] = useState(false);
  const initialFormData: iExercise = {
    type_id: typeList[0]?.name,
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
      const id = typeList.filter((el) => {
        console.log(el.name, formData.type_id);
        return el.name === formData.type_id;
      })[0]?._id;
      //
      const newFormData = {
        ...formData,
        type_id: id,
      };
      //
      const res = await fetch("/api/one_exercise", {
        method: "POST",
        body: JSON.stringify(newFormData),
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
          console.log(el);
          setFormData(initialFormData);
          setErrors(newErrors);
          onSuccess();
        })
        .catch((err) => {
          newErrors.name = err.message;
          setErrors(newErrors);
        })
        .finally(() => {
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
      <div className="flex flex-col w-full">
        <label className="p-2">
          Type <span className="text-red-400">*</span>
        </label>
        <select
          defaultValue=""
          name="type_id"
          onChange={handleChange}
          className="text-black px-4 py-2 rounded-lg"
          value={formData.type_id}
        >
          {!typeList
            ? null
            : typeList.map((el, ind) => {
                return <option key={ind}>{el.name}</option>;
              })}
        </select>
        <div className="error text-red-400">{errors.type_id}</div>
      </div>

      <div className="flex flex-col w-full">
        <label className="p-2">
          Name <span className="text-red-400">*</span>
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
        <label className="p-2">Description</label>
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
      <ActionButton text="Create exercise" busy={busy} />
    </form>
  );
}

"use client";

import ActionButton from "@/components/ui/ActionButton";
import { iExerciseType } from "@/models/exerciseTypeModel";
import { useState } from "react";

type pageProps = {
  setTypes: (el: any) => any;
  onSuccess: () => any;
  externalFormData?: iExerciseType;
  submitAction: (el: any) => Promise<Response>;
};

export default function ExerciseTypeForm({
  setTypes,
  onSuccess,
  externalFormData,
  submitAction,
}: pageProps) {
  const initialFormData: iExerciseType = externalFormData || {
    name: "",
    description: "",
  };
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState<iExerciseType>(initialFormData);
  const [error, setError] = useState<string | null>("");
  const handleSubmit = async (e: any) => {
    setError("");
    submitAction(formData)
      .then((data: any) => {
        switch (data.status) {
          case 409:
            throw new Error("This type already exist");
          case 500:
            throw new Error("Something went wrong on server");
          default:
            break;
        }
        return data.json();
      })
      .then((el) => {
        setTypes(el.newType);
        setFormData(initialFormData);
        onSuccess();
      })
      .catch((err) => {
        setError(err.message);
      });
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
          Name <span className="text-red-400">*</span>
        </label>
        <input
          onChange={handleChange}
          placeholder="example: chest / legs ..."
          name="name"
          className="text-black px-4 py-2 rounded-lg"
          type="text"
          value={formData.name}
        />
      </div>

      <div className="flex flex-col w-full">
        <label className="p-2">Description</label>
        <input
          onChange={handleChange}
          name="description"
          placeholder="description, if needed"
          className="text-black px-4 py-2 rounded-lg"
          type="text"
          value={formData.description}
        />
      </div>
      {error && <p className="text-red-200">{error}</p>}
      <ActionButton text="Create type" busy={busy} />
    </form>
  );
}

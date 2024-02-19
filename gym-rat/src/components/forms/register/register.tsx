"use client";

import ActionButton from "@/components/ui/ActionButton";
import { validatePassword } from "@/lib/helpers";
import { UserPlus } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

type registrationProps = {};
interface iUserInfo {
  name: string;
  email: string;
  password: string;
}

const RegistrationForm: FC<registrationProps> = () => {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
    registration: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Validate form data
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
      registration: "",
    };

    if (!formData.email) {
      isValid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      newErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      isValid = false;
      newErrors.password = "Password is required";
    }

    if (!validatePassword(formData.password)) {
      isValid = false;
      newErrors.password = "Password does not meet the requirements";
    }

    if (formData.password !== formData.repeatPassword) {
      isValid = false;
      newErrors.repeatPassword = "Passwords do not match";
    }

    if (!formData.name) {
      isValid = false;
      newErrors.name = "Name is required";
    }

    if (!isValid) {
      setErrors(newErrors);
    } else {
      // Form is valid, submit data to server
      setBusy(true);
      const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify(formData),
      }).then(async (res: any) => {
        const { email, password } = formData;
        switch (res.status) {
          case 200:
            res.json();
            //
            // auto login
            const sign = await signIn("credentials", {
              email,
              password,
              redirect: false,
            }).then(() => {
              setBusy(false);
              router.replace("/account");
            });
            break;
          case 409:
            newErrors.registration = "User already exist";
            console.log("409");
            setBusy(false);
            break;
          default:
            break;
        }
        if (res.status === 200) {
        }
        //
        setErrors(newErrors);
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-96 w-full flex flex-col gap-8 p-4"
    >
      <h1 className="text-4xl font-bold flex gap-4 items-center">
        <UserPlus size={32} />
        Registration
      </h1>
      <div className="flex flex-col w-full">
        <label className="p-2">Name</label>
        <input
          autoComplete="given-name"
          className="rounded-xl text-black w-full p-3"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <div className="error text-red-400">{errors.name}</div>
      </div>
      <div className="flex flex-col w-full">
        <label className="p-2">Email</label>
        <input
          autoComplete="email"
          className="rounded-xl text-black w-full p-3"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="error text-red-400">{errors.email}</div>
      </div>
      <div className="flex flex-col w-full">
        <label className="p-2">Password</label>

        <input
          autoComplete="new-password"
          className="rounded-xl text-black w-full p-3"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="error text-red-400">{errors.password}</div>
        {errors.password && (
          <div>
            <p className="text-xs text-red-300">
              Ensures minimum length of 8 characters
            </p>
            <p className="text-xs text-red-300">
              Ensures at least one uppercase letter
            </p>
            <p className="text-xs text-red-300 ">
              Ensures at least one lowercase letter
            </p>
            <p className="text-xs text-red-300 hidden">
              Ensures at least one number
            </p>
            <p className="text-xs text-red-300 hidden">
              Ensures at least one special character
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        <label className="p-2">Repeat Password</label>
        <input
          autoComplete="new-password"
          className="rounded-xl text-black w-full p-3"
          type="password"
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
        />
        <div className="error text-red-400">{errors.repeatPassword}</div>
      </div>
      <ActionButton text={"Register"} busy={busy} />
      <div className="error text-red-400">{errors.registration}</div>
    </form>
  );
};

export default RegistrationForm;

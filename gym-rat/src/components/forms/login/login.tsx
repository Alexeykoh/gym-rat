"use client";

import { AppDispatch } from "@/app/GlobalRedux/store";
import { UserService } from "@/services/user.service";
import ActionButton from "@/shared/ui/buttons/ActionButton";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";

type loginProps = {};

const LoginForm: FC<loginProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  //
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { email, password } = formData;

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    login: "",
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
      login: "",
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

    if (!isValid) {
      setErrors(newErrors);
    } else {
      // Form is valid, submit data to server
      setBusy(true);
      const loginUser = await UserService.login({
        email: email,
        password: password,
      });
      console.log("loginUser", loginUser);
      if (loginUser?.error) {
        newErrors.login = "Wrong email or password";
        setErrors(newErrors);
        setBusy(false);
        return;
      }
      //
      router.replace("/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-96 w-full flex flex-col gap-8 p-4"
    >
      <h1 className="text-4xl font-bold flex gap-4 items-center">
        <LogIn size={32} />
        Log in
      </h1>
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
          autoComplete="current-password"
          className="rounded-xl text-black w-full p-3"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="error text-red-400">{errors.password}</div>
      </div>
      <ActionButton text={"Log in"} busy={busy} />
      <div className="error text-red-400">{errors.login}</div>
    </form>
  );
};

export default LoginForm;

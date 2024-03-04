"use client";
import useLoginAuthorization from "@/features/useLoginAuthorization";
import { iUserService } from "@/lib/interfaces/UserService.interface";
import ActionButton from "@/shared/ui/buttons/ActionButton";
import React from "react";
import { useForm } from "react-hook-form";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUserService>();
  const { loading, error, loginIn } = useLoginAuthorization();

  const onSubmit = async (data: iUserService) => {
    loginIn({ ...data });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-96 w-full flex flex-col gap-8 p-4"
    >
      <h1 className="text-4xl font-bold flex gap-4 items-center">Вход</h1>
      <div className="flex flex-col w-full">
        <label>Почта</label>
        <input
          type="text"
          autoComplete="email"
          className="rounded-xl text-black w-full p-3"
          {...register("email", {
            required: "Обязательное поле",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Некорректный адрес электронной почты",
            },
          })}
        />
        {errors.email && (
          <span className="text-red-400">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col w-full">
        <label>Password</label>
        <input
          type="password"
          autoComplete="current-password"
          className="rounded-xl text-black w-full p-3"
          {...register("password", {
            required: "Обязательное поле",
            minLength: {
              value: 6,
              message: "Пароль должен содержать не менее 6 знаков",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-400">{errors.password.message}</span>
        )}
      </div>

      <ActionButton text={"Войти"} busy={loading} />
      {error && <span className="text-red-400">{error}</span>}
    </form>
  );
};

export default LoginForm;

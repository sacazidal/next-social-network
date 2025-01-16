/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InputForm from "@/components/InputForm";
import BtnForm from "@/components/BtnForm";
import FormWrapper from "@/components/FormWrapper";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    setError("");

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        login(data.token);
        router.push("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError(
        "При входе произошла ошибка. Попробуйте еще раз.",
      );
    }
  };

  return (
    <FormWrapper>
      <h1 className="text-3xl font-semibold">Вход</h1>
      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full mt-10"
      >
        <InputForm
          type={"text"}
          id={"username"}
          title={"Логин"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={"Введите логин"}
        />
        <InputForm
          type={"password"}
          id={"password"}
          title={"Пароль"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"Введите пароль"}
        />
        <BtnForm title={"Войти"} />
      </form>
      <div className="text-center mt-3 text-xs mb-4">
        Продолжая, вы соглашаетесь с{" "}
        <Link
          href={"#"}
          className="underline hover:text-zinc-300"
        >
          Условиями использования
        </Link>{" "}
        и<br />
        <Link
          href={"#"}
          className="underline hover:text-zinc-300"
        >
          Политикой конфиденциальности
        </Link>
        .
      </div>
      <div className="flex w-full text-xs justify-center">
        У вас нет учетной записи?
        <Link
          href={"/signup"}
          className="text-neutral-100 font-medium ml-1"
        >
          {" "}
          Зарегистрироваться
        </Link>
      </div>
    </FormWrapper>
  );
};
export default page;

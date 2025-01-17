/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import BtnForm from "@/components/BtnForm";
import EmailVerificationModal from "@/components/EmailVerificationModal";
import FormWrapper from "@/components/FormWrapper";
import InputForm from "@/components/InputForm";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email ||
      !username ||
      !lastName ||
      !firstName ||
      !password
    ) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    setError("");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          firstName,
          lastName,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsModalOpen(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(
        "При регистрации произошла ошибка. Попробуйте еще раз.",
      );
    }
  };

  return (
    <FormWrapper>
      <h1 className="text-3xl font-semibold">
        Регистрация
      </h1>
      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full mt-10"
      >
        <InputForm
          type={"email"}
          id={"email"}
          title={"Почта"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"Введите почту"}
        />
        <InputForm
          type={"text"}
          id={"username"}
          title={"Логин"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={"Введите логин"}
        />
        <div className="flex justify-between gap-x-3 w-full">
          <InputForm
            type={"text"}
            id={"firstName"}
            title={"Имя"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={"Введите имя"}
          />
          <InputForm
            type={"text"}
            id={"lastName"}
            title={"Фамилия"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={"Введите фамилию"}
          />
        </div>
        <InputForm
          type={"password"}
          id={"password"}
          title={"Пароль"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"Введите пароль"}
        />
        <BtnForm title={"Зарегистрироваться"} />
      </form>
      <div className="text-center mt-3 text-xs mb-4">
        Продолжая, вы соглашаетесь с{" "}
        <Link
          href={""}
          className="underline hover:text-zinc-300"
        >
          Условиями использования
        </Link>{" "}
        и<br />
        <Link
          href={""}
          className="underline hover:text-zinc-300"
        >
          Политикой конфиденциальности
        </Link>
        .
      </div>
      <div className="flex w-full text-xs justify-center">
        Уже есть аккаунт?
        <Link
          href={"/signin"}
          className="text-neutral-100 font-medium ml-1"
        >
          {" "}
          Войти
        </Link>
      </div>

      <EmailVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(dalse)}
      />
    </FormWrapper>
  );
};
export default page;

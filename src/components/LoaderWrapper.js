"use client";

import { useState, useEffect } from "react";
import Loader from "./Loader";
import { useAuth } from "@/context/AuthContext";

export default function LoaderWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    let timer;

    if (isLoggedIn !== null) {
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoggedIn]);

  return (
    <>
      {isLoading && <Loader />}{" "}
      {/* Показываем лоадер, если isLoading = true */}
      {children}
    </>
  );
}

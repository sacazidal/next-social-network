"use client";

import Logo from "./Logo";
import ActionHeaderBtn from "./ActionHeaderBtn";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="py-4 px-4 md:px-0 container mx-auto h-[76px]">
      <div className="flex gap-x-5 items-center justify-between">
        <Logo />
        <div className="flex items-center gap-x-3">
          {isLoggedIn ? (
            <ActionHeaderBtn
              title={"Выйти"}
              href={"/signin"}
              onClick={logout}
              classname={"bg-red-500 text-white"}
            />
          ) : (
            <>
              <ActionHeaderBtn
                title={"Войти"}
                href={"/signin"}
              />
              <ActionHeaderBtn
                title={"Зарегистрироваться"}
                href={"/signup"}
                classname={"bg-white text-black"}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;

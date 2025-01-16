import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { supabase } from "@/app/lib/supabaseClient";

export async function POST(request) {
  const { username, password } = await request.json();

  try {
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (userError || !user) {
      return new Response(
        JSON.stringify({
          message: "Неверный логин или пароль",
        }),
        { status: 401 },
      );
    }

    const isValidPassword = await bcrypt.compare(
      password,
      data.password_hash,
    );

    if (!isValidPassword) {
      return new Response(
        JSON.stringify({
          message: "Неверный логин или пароль",
        }),
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return new Response(
      JSON.stringify({ message: "Успешный вход", token }),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Произошла ошибка при входе",
      }),
      { status: 500 },
    );
  }
}

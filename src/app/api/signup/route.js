import { supabase } from "@/app/lib/supabaseClient";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { email, username, password, firstName, lastName } =
    await request.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser, error: insertUser } =
      await supabase
        .from("users")
        .insert([
          {
            email,
            username,
            password_hash: hashedPassword,
            first_name: firstName,
            last_name: lastName,
          },
        ])
        .select();

    if (insertUser) {
      if (insertUser.code === "23505") {
        return new Response(
          JSON.stringify({
            message:
              "Пользователь с таким email или логином уже существует",
          }),
          { status: 409 },
        );
      }
      throw insertUser;
    }

    return new Response(
      JSON.stringify({
        message: "Успешная регистрация",
        user: newUser[0],
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Произошла ошибка при регистрации",
      }),
      { status: 500 },
    );
  }
}

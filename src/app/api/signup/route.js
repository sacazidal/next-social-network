import pool from "@/app/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { email, username, password, firstName, lastName } =
    await request.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
    insert into users (email, username, password_hash, first_name, last_name)
    values ($1, $2, $3, $4, $5)
    returning id, username, email;`;

    const values = [
      email,
      username,
      hashedPassword,
      firstName,
      lastName,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      return new Response(
        JSON.stringify({ message: "Успешная регистрация" }),
        { status: 200 },
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "Ошибка при регистрации",
        }),
        { status: 400 },
      );
    }
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return new Response(
        JSON.stringify({
          message:
            "Пользователь с таким email или логином уже существует",
        }),
        { status: 409 },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Произошла ошибка при регистрации.",
      }),
      { status: 500 },
    );
  }
}

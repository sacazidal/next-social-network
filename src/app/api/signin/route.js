import jwt from "jsonwebtoken";
import pool from "@/app/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { username, password } = await request.json();

  try {
    const query = "select * from users where username = $1";
    const values = [username];

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isValidPassword = await bcrypt.compare(
        password,
        user.password_hash,
      );

      if (isValidPassword) {
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
        );
        return new Response(
          JSON.stringify({
            message: "Успешный вход",
            token,
          }),
          { status: 200 },
        );
      } else {
        return new Response(
          JSON.stringify({
            message: "Неверный логин или пароль",
          }),
          { status: 401 },
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          message: "Неверный логин или пароль",
        }),
        { status: 401 },
      );
    }
  } catch (error) {
    console.error(error);
    return (
      new Response({
        message: "Произошла ошибка при входе",
      }),
      { status: 500 }
    );
  }
}

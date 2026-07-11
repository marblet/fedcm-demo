import type { Context } from "hono";
import { renderToString } from "hono/jsx/dom/server";
import { SignupPage } from "../pages/signup.js";
import { createUser } from "../repository/users.js";

export const handleGetSignup = (c: Context) => {
  return c.html(renderToString(SignupPage({})));
};

export const handlePostSignup = async (c: Context) => {
  const body = await c.req.parseBody();
  const id = String(body.id ?? "");
  const password = String(body.password ?? "");
  const name = String(body.name ?? "");

  if (!id || !password || !name) {
    return c.html(
      renderToString(
        SignupPage({ error: "ID、Password、ユーザ名を入力してください。" }),
      ),
      400,
    );
  }

  const created = createUser({
    id,
    password,
    name,
  });

  if (!created) {
    return c.html(
      renderToString(SignupPage({ error: "同じIDのユーザは作成できません。" })),
      409,
    );
  }

  return c.redirect("/signup/success");
};

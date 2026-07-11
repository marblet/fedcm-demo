import type { Context } from "hono";
import { renderToString } from "hono/jsx/dom/server";
import { SignupSuccessPage } from "../pages/signupSuccess.js";

export const handleGetSignupSuccess = (c: Context) => {
  return c.html(renderToString(SignupSuccessPage()));
};

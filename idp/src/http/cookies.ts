import type { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";

const sessionCookieName = "session";
const sessionMaxAgeSeconds = 60 * 60 * 24;

export const getSessionCookie = (c: Context): string | undefined => {
  return getCookie(c, sessionCookieName);
};

export const setSessionCookie = (c: Context, sessionId: string): void => {
  setCookie(c, sessionCookieName, sessionId, {
    domain: "idp.local",
    expires: new Date(Date.now() + sessionMaxAgeSeconds * 1000),
    httpOnly: true,
    maxAge: sessionMaxAgeSeconds,
    path: "/",
    sameSite: "Lax",
  });
};

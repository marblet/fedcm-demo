import type { Context } from "hono";
import { publicKey } from "../index.js";

export const handleGetJwks = (c: Context) => {
  const jwk = {
    kty: "EC",
    crv: "P-256",
    x: publicKey.export({ format: "jwk" }).x,
    y: publicKey.export({ format: "jwk" }).y,
  };

  return c.json({ keys: [jwk] });
};

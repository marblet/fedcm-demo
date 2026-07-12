import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { readFileSync } from "node:fs";
import { createServer } from "node:https";
import { handleGetConfig } from "./routes/config.js";
import { handleGetLogin, handlePostLogin } from "./routes/login.js";
import {
  handleGetSelectAccount,
  handlePostSelectAccount,
} from "./routes/selectAccount.js";
import { handleGetSignup, handlePostSignup } from "./routes/signup.js";
import { handleGetSignupSuccess } from "./routes/signupSuccess.js";
import { handleGetTop } from "./routes/top.js";
import { handleGetWellKnownWebIdentity } from "./routes/wellKnownWebIdentity.js";

const app = new Hono();
const port = Number(process.env.PORT ?? 3000);
const hostname = process.env.HOSTNAME ?? "idp.local";
const certFile = process.env.HTTPS_CERT_FILE;
const keyFile = process.env.HTTPS_KEY_FILE;

app.get("/", handleGetTop);
app.get("/login", handleGetLogin);
app.post("/login", handlePostLogin);
app.get("/signup", handleGetSignup);
app.post("/signup", handlePostSignup);
app.get("/signup/success", handleGetSignupSuccess);
app.get("/select_account", handleGetSelectAccount);
app.post("/select_account", handlePostSelectAccount);

// FedCM
app.get("/.well-known/web-identity", handleGetWellKnownWebIdentity);
app.get("/config", handleGetConfig);

serve(
  {
    fetch: app.fetch,
    port,
    hostname,
    ...(certFile && keyFile
      ? {
          createServer,
          serverOptions: {
            cert: readFileSync(certFile),
            key: readFileSync(keyFile),
          },
        }
      : {}),
  },
  (info) => {
    const protocol = certFile && keyFile ? "https" : "http";
    console.log(`Server is running on ${protocol}://${hostname}:${info.port}`);
  },
);

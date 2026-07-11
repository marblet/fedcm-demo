import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { readFileSync } from 'node:fs'
import { createServer } from 'node:https'

const app = new Hono()
const port = Number(process.env.PORT ?? 3001)
const hostname = process.env.HOSTNAME ?? 'rp.local'
const certFile = process.env.HTTPS_CERT_FILE
const keyFile = process.env.HTTPS_KEY_FILE

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port,
  hostname,
  ...(certFile && keyFile
    ? {
        createServer,
        serverOptions: {
          cert: readFileSync(certFile),
          key: readFileSync(keyFile)
        }
      }
    : {})
}, (info) => {
  const protocol = certFile && keyFile ? 'https' : 'http'
  console.log(`Server is running on ${protocol}://${hostname}:${info.port}`)
})

import type { Context } from 'hono'
import { renderToString } from 'hono/jsx/dom/server'
import { TopPage } from '../pages/top.js'

export const handleGetTop = (c: Context) => {
  return c.html(renderToString(TopPage()))
}

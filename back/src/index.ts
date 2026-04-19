import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { mealsRouter } from './routes/meals.ts'

const app = new Hono()

app.use('*', cors({ origin: 'http://localhost:5173' }))
app.route('/meals', mealsRouter)

const port = Number(process.env.PORT ?? 3001)
serve({ fetch: app.fetch, port }, (info) => {
    console.log(`API running at http://localhost:${info.port}`)
})

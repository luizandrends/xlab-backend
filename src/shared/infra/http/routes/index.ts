import { Router } from 'express'

const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ hello: 'world' })
})

export default routes;
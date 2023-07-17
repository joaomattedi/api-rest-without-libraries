import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middlewares/json.js'

const server = http.createServer(async (req,res) => {
  const { method, url } = req

  await json(req,res)

  const routeFound = routes.find(route => {
    return route.method === method && route.path === url
  })

  if (routeFound) {
    return routeFound.handler(req,res)
  }

  return res.writeHead(404).end(JSON.stringify('Not Found'))
})

server.listen(3001)
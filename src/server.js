import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middlewares/json.js'

const server = http.createServer(async (req,res) => {
  const { method, url } = req

  await json(req,res)

  const routeFound = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (routeFound) {
    const routeParams = req.url.match(routeFound.path)
    
    return routeFound.handler(req,res)
  }

  return res.writeHead(404).end(JSON.stringify('Not Found'))
})

server.listen(3001)
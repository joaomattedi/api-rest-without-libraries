import http from 'node:http'

const server = http.createServer((req,res) => {
  return res.end('working')
})

server.listen(3001)
const http = require("http")
const Router = require("./router")

class Server extends Router {
  static server = null
  static middlewares = []

  constructor() {
    if (!Server.server) Server.server = http.createServer()
    super(Server.server)
  }

  listen({ port, hostname = "127.0.0.1" }, cb) {
    Server.server.listen(port, hostname, () => cb?.(Server.server.address()))

    Server.server.on("request", (req, res) => {
      let routeHanlder = this._routes[req.method + req.url.toLowerCase()]

      res.send = (payload) => res.end(payload)
      res.json = (payload) => {
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(payload))
      }

      req.on("data", (chunk) => {
        res.body = chunk.toString("utf-8")
      })

      if (routeHanlder) {
        let i = 0
        const next = () => routeHanlder.middlewares?.at(++i)(req, res, next)
        routeHanlder.middlewares?.at(0)(req, res, next)
      } else {
        res.writeHead(404)
        res.end(`${req.url} not found`)
      }
    })
  }
}
module.exports = Server

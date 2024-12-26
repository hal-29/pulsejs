const http = require("http")
const Router = require("./router")

/**
 * Server class that extends Router to handle HTTP server functionalities.
 *
 * @class Server
 * @extends {Router}
 */
class Server extends Router {
  /**
   * Singleton instance of the server.
   *
   * @static
   * @type {http.Server|null}
   */
  static server = null

  /**
   * Array of middlewares to be applied to the server.
   *
   * @static
   * @type {Array<Function>}
   */
  static middlewares = []

  /**
   * Creates an instance of Server.
   * Initializes the server if it hasn't been created yet.
   *
   * @memberof Server
   */
  constructor() {
    if (!Server.server) Server.server = http.createServer()
    super(Server.server)
  }

  /**
   * Starts the server and listens on the specified port and hostname.
   *
   * @param {Object} options - The options for the server.
   * @param {number} options.port - The port number to listen on.
   * @param {string} [options.hostname="127.0.0.1"] - The hostname to listen on.
   * @param {Function} [cb] - The callback function to execute once the server starts listening.
   *
   * @memberof Server
   */
  listen({ port, hostname = "127.0.0.1" }, cb) {
    Server.server.listen(port, hostname, () => cb?.(Server.server.address()))

    Server.server.on("request", (req, res) => {
      let routeHandler = this._routes[req.method + req.url.toLowerCase()]

      /**
       * Sends a plain text response.
       *
       * @param {string} payload - The response payload.
       */
      res.send = (payload) => res.end(payload + "\n")

      /**
       * Sends a JSON response.
       *
       * @param {Object} payload - The response payload.
       */
      res.json = (payload) => {
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(payload) + "\n")
      }

      req.on("data", (chunk) => {
        res.body = chunk.toString("utf-8")
      })

      if (routeHandler) {
        let i = 0
        const next = () => routeHandler.middlewares?.at(++i)(req, res, next)
        routeHandler.middlewares?.at(0)(req, res, next)
      } else {
        res.writeHead(404)
        res.end(`${req.url} not found`)
      }
    })
  }
}
module.exports = Server

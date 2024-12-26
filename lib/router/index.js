/**
 * Router class to handle routing with middlewares.
 */
class Router {
  /**
   * Object to store routes and their associated middlewares.
   * @private
   * @type {Object.<string, {middlewares: Function[]}>}
   */
  _routes = {}

  /**
   * Creates an instance of Router.
   */
  constructor() {}

  /**
   * Adds a route with the specified path, method, and middlewares.
   * @param {string} path - The path for the route.
   * @param {string} [method="get"] - The HTTP method for the route (default is "get").
   * @param {...Function} middlewares - The middlewares to be applied to the route.
   */
  route(path, method = "get", ...middlewares) {
    let url
    if (path.trim()[0] === "/") {
      url = path.trim().toLowerCase()
    } else {
      url = "/" + path.trim().toLowerCase()
    }
    const identifier = method.trim().toUpperCase() + url

    if (this._routes[identifier]) {
      this._routes[identifier].middlewares.concat(middlewares)
    } else {
      this._routes[identifier] = { middlewares }
    }
  }
}

module.exports = Router

class Router {
  _routes = {}

  constructor() {}

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

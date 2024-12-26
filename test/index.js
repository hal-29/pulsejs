const Server = require("../index")

const server = new Server()

server.route("/", "get", (req, res, next) => {
  res.json({ messsage: "welcome to Pulse.js" })
})

server.listen({ port: 6000 }, (address) =>
  console.log("server running on", address)
)

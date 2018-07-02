const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const Guid = require("guid");

const server = jsonServer.create();
const router = jsonServer.router("./db.json");

server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

getDatabase = () => JSON.parse(fs.readFileSync("./db.json", "UTF-8"));

function createToken(email) {
  const database = getDatabase();
  const newGuid = Guid.raw();

  database.users = database.users.map(user => {
    if (user.email !== email) {
      return user;
    }
    user.accessToken = newGuid;
    return user;
  });

  fs.writeFile("./db.json", JSON.stringify(database, null, 2));
  return newGuid;
}

function isAuthenticated({ email, password }) {
  const { users } = getDatabase();
  return users.find(user => user.email === email && user.password === password);
}

server.post("/auth/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = isAuthenticated({ email, password });
    if (!user) {
      const statusCode = 401;
      const message = "Usuário ou senha incorreta.";
      throw { statusCode, message };
    }

    user.accessToken = createToken(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json(error);
  }
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || authorization.split(" ")[0] !== "Bearer") {
      const statusCode = 400;
      const message = "Invalid Authorization Type.";
      throw { statusCode, message };
    }

    if (req.headers.authorization.split(" ")[1]) {
      next();
    } else {
      throw { statusCode: 401, message: "Unauthorized" };
    }
  } catch (error) {
    res.status(error.statusCode || 500).json(error);
  }
});

server.use(router);

server.listen(3000, () => {
  console.log("Run API in port 3000!");
});

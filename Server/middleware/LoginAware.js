import jwt from "jsonwebtoken";
const JWT_TOKEN = "goofd";

const LoginAware = (req, res, next) => {
  const token = req.header("authToken");

  if (!token) {
    return res
      .status(401)
      .send({ Success: false, errors: [{ msg: "invalid token" }] });
  }
  const data = jwt.verify(token, JWT_TOKEN);
  if (!data) {
    return res
      .status(404)
      .send({ Success: false, errors: [{ msg: "invalid token" }] });
  }
  req.user = data.user;

  next();
};

export default LoginAware;

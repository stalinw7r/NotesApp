import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();
const Authentication_token = process.env.JWT_TOKEN;

const LoginAware = (req, res, next) => {
  const token = req.header("authToken");

  if (!token) {
    return res
      .status(401)
      .send({ Success: false, errors: [{ msg: "invalid token" }] });
  }
  const data = jwt.verify(token, Authentication_token);
  if (!data) {
    return res
      .status(404)
      .send({ Success: false, errors: [{ msg: "invalid token" }] });
  }
  req.user = data.user;

  next();
};

export default LoginAware;

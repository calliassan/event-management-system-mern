const jwt = require("jsonwebtoken");
function userAuth(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: "Missing auth" });
  }
  const bearer = authorization.split(" ")[0];
  if (!bearer || bearer !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Missing Bearer or check spelling" });
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Credentials dont match" });
  }
  const user = jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: error.message });
    }
    console.log(decoded);
    req.user = decoded;
    next();
  });
}
module.exports = { userAuth };

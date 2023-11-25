const jwt = require("jsonwebtoken");

const jwtSectet = process.env.JWT_SECRET;
const authorizationHeader = "Authorization";

const authenticateToken = (req, res, next) => {
  const token = req.header(authorizationHeader);
  if (!token) return res.status(401).send("Access denied.");

  jwt.verify(token, jwtSectet, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token.");
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
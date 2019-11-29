const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  // let token = req.cookies.t;

  // Check if not token
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  // Verify token
  try {
    await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({ error: "Token is not valid" });
      } else {
        req.user = decoded.userId;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).send("Server Error");
  }
};

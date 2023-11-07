import jwt from "jsonwebtoken";
import createError from "./error.js";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(createError(401, "You're not authenticated!"));
  }

  jwt.verify(token, process.env.SESSION_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token's not valid!"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export { verifyToken, verifyUser, verifyAdmin };

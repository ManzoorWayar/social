import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const authenticate = (Model) =>
  asyncHandler(async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await Model.findById(decoded.id).select("-password");

        // const user = await Model.findById(decoded.id).select(
        //   "-password +tokenIdentifier"
        // );

        // if (!user || user.tokenIdentifier !== decoded.tokenIdentifier)
        //   throw new Error("Not authorized, token failed");

        // req.user = user;
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  });

const superAdmin = (req, res, next) => {
  if (req.user && req.user.is_super_admin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a Super-Admin");
  }
};

export { authenticate };

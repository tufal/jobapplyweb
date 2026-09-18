import jwt from "jsonwebtoken";

export const authmiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log("TOKEN:", token);
    console.log("SECRET EXISTS:", !!process.env.JWT_SECRET);

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
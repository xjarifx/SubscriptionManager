import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later.",
        });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({
          success: false,
          message: "Access denied. You are a bot.",
        });
      }

      return res.status(403).json({
        success: false,
        message: "Access denied. Please log in.",
      });
    }

    next();
  } catch (e) {
    console.error("Arcjet error: " + e);
    next(e);
  }
};

export default arcjetMiddleware;
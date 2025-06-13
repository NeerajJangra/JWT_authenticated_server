import rateLimit from "express-rate-limit";

export const RateLimiter = (limit)=> rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: limit,
    message: "To Many request from This IP"
})
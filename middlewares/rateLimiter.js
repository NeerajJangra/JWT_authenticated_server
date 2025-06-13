import rateLimit from "express-rate-limit";

// 100 request from single IP address is allowed in 10 min time window
export const RateLimiter = (limit)=> rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: limit,
    message: "To Many request from This IP"
})
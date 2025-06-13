import rateLimit from "express-rate-limit";

// 100 request from single IP address is allowed in 10 min time window
export const RateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 100,
    message: "To Many request from This IP"
})
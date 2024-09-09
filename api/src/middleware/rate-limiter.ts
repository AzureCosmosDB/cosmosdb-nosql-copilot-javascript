import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 1000, // Limit each IP to 1000 requests per `window` (here, per 1 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc.
})

export default limiter;
import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {requested: 1});

        if (decision.isDenied()) {
            const reason = decision.reason;
            let reasonString = "UNKNOWN";
            
            if(reason.isBot()) {
                reasonString = "BOT";
                return res.status(403).json({ success: false, message: "Bot detected", reason: reasonString });
            }
            if(reason.isRateLimit()) {
                reasonString = "RATE_LIMIT";
                return res.status(429).json({ success: false, message: "Rate limit exceeded", reason: reasonString });
            }
            if(reason.isShield()) {
                reasonString = "SHIELD";
                return res.status(403).json({ success: false, message: "Shield detected", reason: reasonString });
            }
            if(reason.isTokenBucket()) {
                reasonString = "TOKEN_BUCKET";
                return res.status(429).json({ success: false, message: "Token bucket exceeded", reason: reasonString });
            }
            return res.status(403).json({ success: false, message: "Access denied", reason: reasonString });
        }

        next();
    } catch (error) {
        console.error('Full Arcjet error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Error name:', error.name);
        
        return res.status(500).json({ 
            success: false, 
            message: "Arcjet middleware error",
            error: error.message,
            name: error.name
        });
    }
};

export default arcjetMiddleware;
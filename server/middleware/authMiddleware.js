import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //Check if token is provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token"});
    }
};

export default authMiddleware;

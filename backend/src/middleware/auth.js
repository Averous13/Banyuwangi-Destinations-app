import { verifyToken } from "../utils/jwt.js";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Authorization Denied"});
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ message: "Token Invalid"});
        }

        const user = await User.findById(decoded.id).select('-__v');

        if (!user) {
            return res.status(401).json({ message: "User Not Found!!!"});
        }

        req.user = user;
        next();


    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        console.error('Error authentication:', error);
        return res.status(500).json({ message: "Internal Server ERROR"
        })
    }

}

export const requireAdmin = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({success: false, message: 'Authorization Denied!'});
    }

    if(req.user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Access Denied'});
    }

    next();
}
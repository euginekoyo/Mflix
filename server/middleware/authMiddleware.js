// middlewares/authMiddleware.js
export const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    return res.status(401).json({ message: 'Not authenticated' });
};

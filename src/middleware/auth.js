const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        // Check if token starts with 'Bearer '
        const tokenPart = token.split(' ')[1];

        if (!tokenPart) {
            return res.status(401).json({ message: 'Invalid token format' });
        }

        const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET);
        req.user = decoded;  // Set the user information to req.user
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = auth;

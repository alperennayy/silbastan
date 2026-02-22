import jwt from 'jsonwebtoken'

const authClient = (req, res, next) => {

    try {
        const { token } = req.cookies;

        if (!token) {
            return res.json({ success: false, message: "Not authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.clientId = decoded.id;

        next();
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export default authClient;
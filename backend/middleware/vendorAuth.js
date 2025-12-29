import jwt from 'jsonwebtoken';

const authVendor = (req, res, next) => {

    try {
        const { token } = req.cookies;

        if (!token) {
            return res.json({ success: false, message: 'Not Authorized Login Again' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Controller'da kullanmak için
        req.vendor = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

export default authVendor;

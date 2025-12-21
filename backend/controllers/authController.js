import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"

export const registerUser = async (req, res) => {

    const { name, email, password, role } = req.body

    // 1️⃣ Temel validation
    if (!name || !email || !password || !role) {
        return res.json({
            success: false,
            message: 'Email, password and role are required'
        })
    }

    // 2️⃣ Role kontrolü (ÇOK ÖNEMLİ)
    if (!['client', 'vendor'].includes(role)) {
        return res.json({
            success: false,
            message: 'Invalid role'
        })
    }

    try {
        // 3️⃣ Kullanıcı var mı?
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.json({
                success: false,
                message: 'User already exists'
            })
        }

        // 4️⃣ Şifre hashleme
        const hashedPassword = await bcrypt.hash(password, 10)

        // 5️⃣ User oluştur
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        // 6️⃣ JWT oluştur
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        // 7️⃣ Cookie’ye koy
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({
            success: true,
            role: user.role
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


export const loginUser = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' })
    }

    try {

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'Invalid email' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' })
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, role: user.role });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

export const logoutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    })

    return res.json({
        success: true,
        message: 'Logged out successfully'
    })
}

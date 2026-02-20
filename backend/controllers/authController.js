import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import clientModel from '../models/clientModel.js'
import vendorModel from '../models/vendorModel.js'

export const registerVendor = async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Email and password are required' })
    }

    try {

        const existingVendor = await vendorModel.findOne({ email })
        if (existingVendor) {
            return res.json({ success: false, message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const vendor = await vendorModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            {
                id: vendor._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )


        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({
            success: true,
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }

}

export const loginVendor = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' })
    }

    try {

        const vendor = await vendorModel.findOne({ email })

        if (!vendor) {
            return res.json({ success: false, message: "Invalid email" })
        }

        const isMatch = bcrypt.compare(password, vendor.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' })
        }

        const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

export const logoutVendor = (req, res) => {
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

export const registerClient = async (req, res) => {

    const { name, email, password } = req.body

    // 1️⃣ Temel validation
    if (!name || !email || !password) {
        return res.json({
            success: false,
            message: 'Email, password and role are required'
        })
    }

    try {
        // 3️⃣ Kullanıcı var mı?
        const existingClient = await clientModel.findOne({ email })

        if (existingClient) {
            return res.json({
                success: false,
                message: 'User already exists'
            })
        }

        // 4️⃣ Şifre hashleme
        const hashedPassword = await bcrypt.hash(password, 10)

        // 5️⃣ User oluştur
        const client = await clientModel.create({
            name,
            email,
            password: hashedPassword,
        })

        // 6️⃣ JWT oluştur
        const token = jwt.sign(
            {
                id: client._id,
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
            success: true
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


export const loginClient = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' })
    }

    try {

        const client = await clientModel.findOne({ email })

        if (!client) {
            return res.json({ success: false, message: 'Invalid email' })
        }

        const isMatch = await bcrypt.compare(password, client.password)

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' })
        }
        const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}


export const logoutClient = (req, res) => {
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

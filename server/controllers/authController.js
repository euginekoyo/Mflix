// controllers/authController.js
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

// Sign Up
export const signUp = async (req, res) => {
    const { username, email, role, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            username,
            email,
            role,
            password,
        });

        req.session.userId = user._id;
        // console.log('Session set:', req.session);
        res.status(201).json({
            isAuthenticated: true,
            _id: user._id,
            isAdmin: user.role === 'admin',
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    // console.log('Session before login:', req.session);
    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.session.userId = user._id;

        res.json({
            isAuthenticated: true,
            _id: user._id,
            isAdmin: user.role === 'admin',
            email: user.email,
        });
        // console.log('Session after login:', req.session);
        //console.log(req.session.userId)
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout
export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

// Check Authentication
export const checkAuth = (req, res) => {
    // console.log('Session during check-auth:', req.session);
    if (req.session.userId) {
        // console.log(req.session.userId)
        res.json({ isAuthenticated: true });
    } else {
        res.json({ isAuthenticated: false });
    }
};

export const getUsers=async(req,res)=>{
    try {
        const users=await User.find();
res.json(users);
    } catch (error) {
        console.log('error finding users', error);
    }
}
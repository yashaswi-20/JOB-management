
import Users from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({ msg: 'All fields are required' })
        }
        const user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role
        })
        return res.status(201).json({ msg: 'User registered successfully' })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ msg: 'All fields are required' })
        }
        let user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }
        if (user.role !== role) {
            return res.status(400).json({ msg: "Account doesn't exist with this role" })
        }

        const tokenData = {
            userId: user._id,
            role: user.role
        }

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            msg: "Welcome back " + user.fullname,
            user: user,
            success: true
        })


    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}

export const logout = async (req, res) => {

    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            msg: "Logged out successfully"
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
       
        //cloudnary will be added here 
        let skillsArray;
        if(skills){
            skillsArray = skills.split(',');
        }
        const userId = req.id;
        let user = await Users.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' })
        }
        //updating data
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;
       
        //resume and profile photo will be updated later

        await user.save();
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            msg: "Profile updated successfully",
            user: user,
            success: true
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
        
    }
}
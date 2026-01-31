/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { generateToken } from "../utils/jwt.js";
import User from "../models/User.js";

class AuthController{


/**
 * @desc    Mulai autentikasi dengan Google
 * @route   GET /api/auth/google
 * @access  Public
 */
    static googleAuth(req, res, next) {

    }

/**
 * @desc    Callback dari Google OAuth
 * @route   GET /api/auth/google/callback
 * @access  Public
 */
    static googleCallback(req, res){
        try {
            if(!req.user) {
                return res.redirect(`${process.env.CLIENT_URL}/login?error=authentication_failed`);
            }

            const token = generateToken(req.user._id);

            //set cookies
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
        } catch(error) {
            console.error('Error in google callback', error)
            res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
        }
    }

    /**
 * @desc    Get current logged in user
 * @route   GET /api/auth/current-user
 * @access  Private
 */
    static async getCurrentUser(req,res){
        try {
            res.status(200).json({
                success: true,
                user: req.user
            });
        } catch(error){
            res.status(500).json({
                success: false,
                message: `internal server error: ${error}`
            });
        }
    }
    

    /**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */

    static logOut(req,res){
        try {
            res.clearCookie('token');

            res.status(200).json({
                success: true,
                message: "Logged out successfully"
            });

        } catch(error) {
            console.error('Error logging out', error);
            res.status(500).json({
                success: false,
                message: "Error logging out"
            });
        }
    }

    /**
 * @desc    Verify JWT token
 * @route   POST /api/auth/verify
 * @access  Private
 */

    static verifyToken(req, res){
        try{
            res.status(200).json({
                success: true,
                valid: true,
                user: req.user
            });
        } catch(error) {
            console.error("Error verifying token:", error);
            res.status(500).json({
                success: false,
                message: "ServerError"
            })
        }
    }

    /**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */

    static async updateProfile(req, res){
        try{
            const { name, alamat, phone, pekerjaan, avatar } = req.body;

            const user = await User.findById(req.use_id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            if (name) user.profile.name = name;
            if (alamat) user.profile.alamat = alamat;
            if (phone) user.profile.phone = phone;
            if (pekerjaan) user.profile.pekerjaan = pekerjaan;
            if (avatar) user.profile.avatar = avatar;

            await user.save();

            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: user
            });
        } catch (error) {
            console.error("Error updating user profile", error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }


    static async updateRoleUser(req, res) {
        try {
            const { userId } = req.params;
            const { role } = req.body;

            const validRoles = ['user', 'admin'];
            if (!validRoles.includes(role)) {
                return res.status(400).json({success: false, message: 'Role invalid!'});
            }

            const user = await findById(userId);

            if (!user) {
                return res.status(404).json({success: false, message: 'User not found!'});
            }

            //tidak boleh mengubah role sendiri
            if (user._id.toString() === req.user._id.toString()){
                return res.status(400).json({success: false, message: 'Cannot change your own role'});
            }

            user.role = role;
            await user.save();

            res.status(200).json({success: true, message: 'Role updated successfully', data: {
                userId: user._id,
                email: user.email,
                role: user.role
            }});
        } catch (error) {
            console.error('Error updating role:', error);
            res.status(500).json({message: 'Internal server Error'});
        }
    }

    static async getAllUsers(req, res) {
        try {
            const { page = 1, limit = 10, role, search } = req.query;

            const query = {};

            if (role) {
                query.role = role;
            }

            if (search) {
                query.$or = [
                    {email: { $regex: search, $options: 'i'}},
                    {'profile.name': {$regex: search, $options: 'i'}},
                    {userName: { $regex: search, $options: 'i'}}
                ];
            }

            const users = await find(query)
                .select('-__v')
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({createdAt: -1})

            const count = await User.countDocuments(query);

            res.status(200).json({
                success: true, 
                data: users,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                totalUsers: count});
        } catch(error) {
            console.error('Error fetching users data: ', error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

    static async deActivatedUser(req, res) {
        try {
            const {userId} = req.params;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({success: false,message: 'User not found!'})
            }

            if (user._id.toString() === req.user._id.toString()){
                return res.status(400).json({success: false, message: 'Cannot deactivated your own account'})
            }

            user.isActive = false;
            await user.save();

            res.status(200).json({success: true, message: 'User deactivated successfully'});
        } catch (error) {
            console.error('Error deactivating users:', error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

}

export default AuthController;
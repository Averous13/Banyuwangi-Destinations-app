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

    /**
 * @desc    Delete user account
 * @route   DELETE /api/auth/account
 * @access  Private
 */

    static async deleteAccount(req, res) {
        try {
            await User.findByIdAndDelete(req.user._id);

            res.clearCookie('token');

            res.status(200).json({
                success: true,
                message: 'Account deleted successfully'
            });        
        }catch(error) {
            console.error('Error deleting account', error);
            res.status(500).json({
                success: false,
                message: 'internal server error'
            });
        }
    }
}

export default AuthController;
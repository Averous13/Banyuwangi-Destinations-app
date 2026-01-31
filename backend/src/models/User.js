import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
    name: String,
    alamat: String,
    phone: String,
    pekerjaan: String,
    avatar: String,
    }, 
    { _id:false})

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    profile: {
        type: profileSchema
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isEmailVerified: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

userSchema.methods.isAdmin = function () {
    return this.role === 'admin';
}


const User = mongoose.model("User", userSchema);

export default User;


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
    }
});

const User = mongoose.model("User", userSchema);

export default User;


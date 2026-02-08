import mongoose from "mongoose";

const articleSchema =  new mongoose.Schema(
    {
        title: {
            type: [String],
            required: true,
            maxLength: 50
        },
        content: {
            type: [String],
            required: true
        },
        excerpt: {
            type: String,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft"
        },
        related: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Destinations"
        },  
    },
    { timestamps: true}
);

export default mongoose.model("Articles", articleSchema);
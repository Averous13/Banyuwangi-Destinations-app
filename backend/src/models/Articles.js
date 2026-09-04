import mongoose from "mongoose";
import ImageSchema from "./Image.js";

const articleSchema =  new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 60
        },
        content: {
            type: String,
            required: true
        },
        excerpt: {
            type: String,
        },
        hero: {
            type: ImageSchema,
        },
        author: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft"
        },
        related: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Destination"
        },
        category: {
            type: String,
            enum: ["populer", "keluarga", "budaya", "event", "kuliner", "petualangan"]
        }  
    },
    { timestamps: true}
);

export default mongoose.model("Articles", articleSchema);
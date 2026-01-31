import multer from "multer";
import { CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "destinations",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        transformation: [
            {width: 1600, crop: "limit"},
            {quality: "auto"},
            {fetch_format: "auto"}
        ],
    },
});

export const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
});
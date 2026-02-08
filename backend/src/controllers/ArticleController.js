import Articles from "../models/Articles.js";
import {rollbackImage} from "../utils/rollbackImage.js";

class ArticleController {
    static async imageHandler(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Tidak ada file yang diupload"
                });
            }
            console.log(req.file);
            res.status(200).json({
                success: true,
                message: "Gambar berhasil diupload",
                url: req.file.path,
                public_id: req.file.filename
            });
        } catch (error) {
            console.error('Error Cloudinary Upload:', error);
            res.status(500).json({message: "Internal server error", error})
        }
    }

    static async imageDelete(req, res) {
        try {
            const { public_id } = req.body; 
            
            if (!public_id) {
                return res.status(404).json({
                    error: "image not found",
                    success: false
                })
            }

            await rollbackImage(public_id);
            return res.status(200).json({
                success: true,
                message: "image deleted successfully"
            });
        } catch (error) {
            console.error('Error deleting image:', error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error
            })
        }
    }
}

export default ArticleController;
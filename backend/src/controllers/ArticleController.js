import Articles from "../models/Articles.js";
import {rollbackImage} from "../utils/rollbackImage.js";
import { generateExcerpt } from "../utils/generateExcerpt.js";

class ArticleController {
    static async imageHandler(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Tidak ada file yang diupload"
                });
            }
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

    static async createArticle(req, res) {
        let publicId = null;
        try{
            const { title, author, status, content, related, category = null} = req.body;
            let hero = null;
            if (req.file) {
                publicId = req.file.filename;

                hero = {
                    url: req.file.path,
                    public_id: publicId
                }
            }

            if (!title || !author || !content) {
                return res.status(400).json({message: "title, content, and author required"});
            }


            const excerpt = generateExcerpt(content);


            const article = new Articles({
                title,
                author,
                status,
                content,
                excerpt,
                hero,
                related,
                category
            });

            const savedArticle = await article.save();

            return res.status(201).json({message: "article created successfully"}, savedArticle);
        } catch (error) {
            console.error("Error creating article:", error);
            return res.status(500).json({message: "Internal server error"});
        }
    }

    static async getArticle(req, res) {
        try {
            const articles = await Articles.find().populate('related', 'name');
            res.status(200).json({articles})
        } catch (error) {
            console.error("Error fetching article:", error);
            res.status(500).json({message: "Internal server error"});
        }
    }

    static async getArticleById(req, res) {
        try {
            const article = await Articles.findById(req.params.id);
            if (!article){
               return res.status(404).json({message: "Article not found"});
            }
            return res.status(200).json(article);
        } catch(error) {
            console.error("Error fetching article:", error);
            return res.status(500).json({message: "Internal Server Error"});
        }
    }

    static async getRelatedArticle(req, res) {
        try {
            const article = await Articles.find({related: req.params.id});
            if (!article || article.length === 0) {
                res.status(404).json({message: "Article not found", success: false});
            }
            res.status(200).json({success: true, data: article});
        } catch(error) {
            console.error("Error fetching article:", error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    static async updateRelatedArticle(req, res) {
        let publicId = null;
        try {
            const {title, author, status, content, related, category} = req.body;
            let hero = null;
            if (req.file) {
                publicId = req.file.filename;

                hero = {
                    url: req.file.path,
                    public_id: publicId
                }
            }

            const excerpt = generateExcerpt(content);

            const updatedArticle = await Articles.findOneAndUpdate(
                {related: related},
                {
                    title,
                    author,
                    status,
                    content,
                    excerpt,
                    hero,
                    related,
                    category
                }, {new: true}
            );
            if (!updatedArticle) {
                return res.status(404).json({message: "article not found"})
            }
            res.status(201).json({message:"Article updated successfully"});
        } catch (error) {
            console.error("Error updating article:", error);
            rollbackImage(publicId);
            return res.status(500).json({message: "Internal server error"})
        }
    }

    static async updateArticle(req, res) {
        console.log(req.file.filename);
        let newImagePublicId = null;
        try {
            const { title, author, status, content, related, category} = req.body;

            const article = await Articles.findById(req.params.id);
            if (!article) {
                return res.status(404).json({message: "Article Not Found"});
            }

            let hero = article.hero;

            if (req.file) {
                newImagePublicId = req.file?.filename;

                hero = {
                    url: req.file?.path,
                    public_id: newImagePublicId
                }

                if(article.hero?.public_id) {
                    await rollbackImage(article.hero.public_id)
                }
            }

            const excerpt = generateExcerpt(content);

            const updatedArticle = await Articles.findByIdAndUpdate(
                req.params.id,
                {
                    title,
                    author,
                    status,
                    content,
                    excerpt,
                    hero,
                    related,
                    category
                }, {new: true}
            )

            if(!updatedArticle) {
                return res.status(404).json({message: "Article not found"});
            }
            res.status(200).json({message: "destination updated successfully", data: updatedArticle})
        } catch (error) {
            console.error("Error fetching data", error);
            await rollbackImage(newImagePublicId);
            res.status(500).json({message: "Internal Server Error"});
        }

    }

    static async deleteArticle(req, res) {
        try {
            const deletedArticle = await Articles.findByIdAndDelete(req.params.id);
            if(!deletedArticle) {
                return res.status(404).json({message: "article not found"})
            }
            await rollbackImage(deletedArticle.hero.public_id)
            return res.status(200).json({message: "Article deleted successfully"})
        } catch (error) {
            console.error("Error deleting article data:", error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}

export default ArticleController;
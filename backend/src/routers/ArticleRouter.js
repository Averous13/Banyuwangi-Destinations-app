import ArticleController from "../controllers/ArticleController.js";
import express from "express";
import { uploadArticle } from "../middleware/upload.js";

const route = express.Router();

route.post('/upload-image', uploadArticle.single("image"), ArticleController.imageHandler);
route.delete('/upload-image', uploadArticle.single("image"), ArticleController.imageDelete);
route.post('/',uploadArticle.none() ,ArticleController.createArticle);
route.get('/', ArticleController.getArticle);
route.get('/:id', ArticleController.getArticleById);
route.get('/destination/:id', ArticleController.getRelatedArticle);
route.put('/:id', uploadArticle.none(), ArticleController.updateRelatedArticle);


export default route;
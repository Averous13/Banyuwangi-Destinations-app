import ArticleController from "../controllers/ArticleController.js";
import express from "express";
import { uploadArticle } from "../middleware/upload.js";

const route = express.Router();

route.post('/upload-image', uploadArticle.single("image"), ArticleController.imageHandler);
route.delete('/upload-image', uploadArticle.single("image"), ArticleController.imageDelete);


export default route;
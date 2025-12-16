/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "./config/passport.js";


import connectDB from "./config/db.js";
import DestinationRouter from "./routers/DestinationRouter.js";
import AuthRouter from "./routers/AuthRouter.js";
import rateLimiterMiddlware from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser());
app.use(rateLimiterMiddlware);
app.use(passport.initialize());
app.use('/api/auth', AuthRouter);
app.use('/api/destination', DestinationRouter);

connectDB().then(() => {
    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    })
})

import express from "express"
import dotenv from "dotenv"

import connectDB from "./config/db.js"
import DestinationRouter from "./routers/DestinationRouter.js"

dotenv.config();

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5001;

app.use(express.json());
app.use('/api/destination', DestinationRouter);

connectDB().then(() => {
    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    })
})

import express from 'express'
import dotenv from 'dotenv'
import { userRoute } from './routes/user.routes.js';

const app = express();

dotenv.config();
app.use(express.json());

const PORT = 3000;

app.use("/api/user", userRoute);

app.get("/", (req, res) => {
res.send("server will be start")
})

app.listen(PORT, () => {
  console.log(`server running on: http://localhost:${PORT}`);
})
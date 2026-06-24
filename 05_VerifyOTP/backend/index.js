import express from 'express'
import dotenv from 'dotenv'
import { userRouter } from './routes/user.routes.js';

const app = express()

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 3000

app.use("/api/user", userRouter)

app.get("/", (req, res) => {
  res.send("server will be start")
})


app.listen(PORT, ()=> {
  console.log(`server running on: http://localhost:${PORT}`);
})
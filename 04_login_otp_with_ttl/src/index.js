import express from 'express'
import Redis from 'ioredis'

const app = express();

app.use(express.json());
const PORT = 3000;

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

function otpKey(phone){
 return `otp:${phone}`
}

/*---------- create otp ----------*/
app.post('/otp', async(req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  await redis.set(otpKey(phone), otp, 'EX', 60) // OTP Valid for only 30 second 
  res.json({message: 'OTP Send', otp})
})

/*-------- verify otp -----------*/
app.post('/otp/verify', async(req, res) => {
  const { phone, otp } = req.body;
  const saveOtp = await redis.get(otpKey(phone));

  if(!saveOtp){
    return res.status(400).json({message: 'OTP expired or not found'})
  }

  if(saveOtp !== otp){
   return res.status(400).json({message: 'Invalid OTP'})
  }

  await redis.del(otpKey(phone));
  res.status(200).json({message: 'OTP verification Successfully'})
})

app.get('/otp/:phone/ttl', async(req, res) => {
  const ttl = await redis.ttl(otpKey(req.params.phone));
  res.json({ttl})
})


app.get("/", (req, res) => {
  res.send("server will be start")
})

app.listen(PORT, () => {
  console.log(`server running on: http://localhost:${PORT}`);
})
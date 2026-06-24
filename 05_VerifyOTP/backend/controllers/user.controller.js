import { response } from 'express';
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

function otpKey(phone){
  return `otp:${phone}`
 }

/*---- create otp -----*/
export const createOtp = async (req, res) => {
 try {
   const { phone } = req.body;
   if(!phone){
     res.status(400).json({success: false, message: "Phone number is required"})
   }
   const otp = Math.floor(100000 + Math.random() * 900000).toString();

   await redis.set(otpKey(phone), otp, 'EX', 60);
   res.status(200).json({success: true, message: "OTP Sent", otp})
 } catch (error) {
   res.status(500).json({success: false, message: error.message})
 }
}

/*----- verify otp ------*/
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone and OTP are required"
      });
    }

    const savedOtp = await redis.get(otpKey(phone));

    if (!savedOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found"
      });
    }

    if (savedOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    await redis.del(otpKey(phone));

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/*---- ttl ------*/
export const ttl = async (req, res) => {
  try {
    const ttl = await redis.ttl(otpKey(req.params.phone));
    res.json({ttl})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}
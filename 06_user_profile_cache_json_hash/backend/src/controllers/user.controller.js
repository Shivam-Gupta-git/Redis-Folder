import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");


export const createUser = async(req, res) => {
  try {
    await redis.set(`user:${req.params.id}: json`, JSON.stringify(req.body));
    return res.status(200).JSON({success: true, message: "user create successfully", savedAs: "json"})
  } catch (error) {
    return res.status(500).JSON({success: false, message: error.message})
  }
}
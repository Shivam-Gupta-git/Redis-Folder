import { json, raw } from 'express';
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");


export const createUserWithJSON = async(req, res) => {
  try {
    await redis.set(`user:${req.params.id}: json`, JSON.stringify(req.body));
    return res.status(200).json({success: true, message: "user create successfully", savedAs: "json"})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}

export const getUserWithJSON = async (req, res) => {
  try {
    const row = await redis.get(`user:${req.params.id}: json`);
    if(!row){
      return res.status(400).json({success: false, message: "row data is not avaiblable"})
    }
    const data = JSON.parse(raw);
    return res.status(200).JSON({success: true, data})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}

export const createUserWithHash = async (req, res) => {
  try {
    await redis.hset(`user:${req.params.id}: hash`, req.body);
    return res.status(200).json({success: true, message: "user create successfully", savedAs: "hash"})
  } catch (error) {
    return res.status({success: false, message: error.message})
  }
}

export const getUserWithHash = async (req, res) => {
  try {
    const user = await redis.hgetall(`user:${req.params.id}:hash`);
    return res.json({user})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}
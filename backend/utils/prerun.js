import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();

export async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    global.db = client.db('Convin');
    console.log("Connected to MongoDB");
    return global.db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    global.db = null;
    return null;
  }
}


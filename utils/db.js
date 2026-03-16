// lib/mongodb.js -> lib/db.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/${process.env.}';

export default dbConnect;

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }
  await mongoose.connect(MONGODB_URI);
  return mongoose;
}

/* https://mongoosejs.com/docs/nextjs.html

Then use it in your API routes or Server Components:

// app/api/users/route.js
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return Response.json({ users });
}
*/
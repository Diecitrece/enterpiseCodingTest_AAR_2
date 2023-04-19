import mongoose from 'mongoose';

async function dbConnect() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable missing');
  }
  mongoose.connect(process.env.MONGODB_URI);
}

export default dbConnect;

import mongoose from 'mongoose';

const USER = env('MONGODB_USER');
const PWD = env('MONGODB_PASSWORD');
const URL = env('MONGODB_URL');
const DB = env('MONGODB_DB');
const DB_URL = process.env.DB_URL `mongodb+srv://${USER}:${PWD}@${URL}/${DB}?retryWrites=true&w=majority&appName=mongodb`;
async function initMongoConnection() {
  try {
    await mongoose.connect(DB_URL);
    console.log('Database connection successfully');
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export { initMongoConnection };

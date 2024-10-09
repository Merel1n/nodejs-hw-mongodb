import mongoose from 'mongoose';


const USER = process.env.MONGODB_USER;
const PWD = process.env.MONGODB_PASSWORD;
const URL = process.env.MONGODB_URL;
const DB = process.env.MONGODB_DB;



async function initMongoConnection() {
  try {
    const DB_URL = `mongodb+srv://${USER}:${PWD}@${URL}/${DB}?retryWrites=true&w=majority&appName=mongodb`;
    await mongoose.connect(DB_URL);
    console.log('Database connection successfully');
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export { initMongoConnection };

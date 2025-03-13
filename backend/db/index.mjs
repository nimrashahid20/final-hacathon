import mongoose from 'mongoose';
import 'dotenv/config'

const url =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@project01.d94oj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Project01`

mongoose.connect(url)
export default mongoose;


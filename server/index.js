
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
const allowedOrigins = [
  'http://localhost:3000', // Frontend URL
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

app.options('*', cors()); // Allow preflight for all routes

app.use('/posts', postRoutes);
app.use("/user", userRouter);

app.get('/', (req, res) => { 
  res.send('Hello, this is the API for a blog application!');
 });

 const CONNECTION_URL = "mongodb+srv://ronnyfarm222:Mongodbitis@123@cluster0.mcp4x.mongodb.net/";
 const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

// export default function handler(req, res) {
//   // Add your logic here
//   res.send('Hello, this is the API for a blog application!');}

export default app;

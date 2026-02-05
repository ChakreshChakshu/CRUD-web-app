import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';

const app = express();


app.use(cors({
  origin: [
    "https://dancing-lolly-9398c4.netlify.app/"
  ],
  credentials: true
}));
app.use(express.json());
app.use('/api/users', userRoutes);




export default app;

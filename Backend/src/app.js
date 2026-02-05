import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';

const app = express();


app.use(cors({
  origin: [
    "https://acceptable-analysis-production.up.railway.app/"
  ],
  credentials: true
}));
app.use(express.json());
app.use('/api/users', userRoutes);




export default app;

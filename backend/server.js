import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import googleReviewRoutes from './routes/googleReviews.js';
import offerRoutes from './routes/offers.js';
import reviewRoutes from './routes/reviews.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/google-reviews', googleReviewRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Review System API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

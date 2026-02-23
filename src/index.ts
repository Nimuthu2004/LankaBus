import express from 'express';
import cors from 'cors';
import authRoutes from './part1_auth';
import businessRoutes from './part2_business';

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Part 1: Authentication & Identity (Team Member 1)
app.use('/api/auth', authRoutes);

// Part 2: Business Logic & Operations (Team Member 2)
app.use('/api', businessRoutes);

app.listen(port, () => {
    console.log(`LankaBus backend Server running on http://localhost:${port}`);
});

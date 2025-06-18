import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
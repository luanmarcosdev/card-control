import express from 'express';
import 'dotenv/config';
import routes from './routes/index.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
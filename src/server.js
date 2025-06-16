import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
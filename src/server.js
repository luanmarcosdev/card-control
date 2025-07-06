import 'dotenv/config';
import express from 'express';
import routes from './routes/index.js';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = process.env.PORT || 3000;
const swaggerJson = JSON.parse(fs.readFileSync('./src/swagger.json', 'utf-8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes';


const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());  // For security
app.use(bodyParser.json());  // Parse incoming JSON requests

// Routes
app.use('/api', router);

export default app;
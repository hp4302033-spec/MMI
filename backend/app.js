import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import investmentRoutes from './routes/investmentRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(hpp());
app.use(morgan(env.nodeEnv === 'development' ? 'dev' : 'combined'));
app.use((req, res, next) => {
  req.app.locals.uploadPath = path.resolve(__dirname, env.uploadPath);
  next();
});

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'MMI API' }));
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

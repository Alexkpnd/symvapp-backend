import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import contractRoutes from './routes/contract.route';
import { pageNotFound } from './middlewares/pageNotFound.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app = express();

app.use(express.json());
app.use(morgan('dev'));


app.use('/api/users', userRoutes)
app.use('/api/contracts', contractRoutes)
app.use('/api/auth', authRoutes);

app.use(pageNotFound)
app.use(errorHandler)
export default app;
import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import contractRoutes from './routes/contract.route';
import { pageNotFound } from './middlewares/pageNotFound.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { setupSwagger } from './swagger';

const app = express();

setupSwagger(app);
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: ['http://localhost:4200']
}))


app.use('/api/users', userRoutes)
app.use('/api/contracts', contractRoutes)
app.use('/api/auth', authRoutes);

app.use(pageNotFound)
app.use(errorHandler)
export default app;
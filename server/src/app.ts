import cookieParser from 'cookie-parser';
import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors';
import { corsMw, errorHandler } from './middleware';
import VotingRoutes from './routes/voting.routes';

const app = express();

app.set('port', process.env.PORT || 5000);
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieParser());
app.use(corsMw);

// Routes
app.use('/', VotingRoutes);

app.all('*', (_, __) => {
  throw new NotFoundError('Ruta inexistente');
});

// Error handler
app.use(errorHandler);

export default app;

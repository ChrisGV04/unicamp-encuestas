import cors, { CorsOptions } from 'cors';
import { CORS_DOMAIN, PRODUCTION } from '../env';

const corsOptions: CorsOptions = {
  optionsSuccessStatus: 200,
  origin: function (origin: any, callback: any) {
    // Allow all origins in development
    if (!PRODUCTION) return callback(null, true);

    // TODO: Add production domain
    if (origin == CORS_DOMAIN) {
      callback(null, true);
    } else {
      callback(new Error(`El dominio "${origin}" no es permitido por CORS`));
    }
  },
  credentials: true,
};

export const corsMw = cors(corsOptions);

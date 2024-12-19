import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
    port: process.env.PORT || 3000,
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost/task-manager'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'fallback_secret_never_use_in_production',
        expiresIn: '24h'
    },
    // env: process.env.NODE_ENV || 'development'
};

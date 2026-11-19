import 'dotenv/config';
import connectDb from './utils/db.js';
import app from './app.js';

const PORT = Number(process.env.PORT) || 8000;
const HOST = process.env.HOST || '0.0.0.0';

const startServer = async () => {
    try {
        await connectDb();

        app.listen(PORT, HOST, () => {
            console.log(`Backend running at http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.error('Backend startup failed:', error.message);
        process.exit(1);
    }
};

startServer();

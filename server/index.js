import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import movieRoutes from './routes/movieRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import helmet from 'helmet';
import authRoutes from './routes/authRoute.js';
import adminRoutes from './routes/adminRoute.js'; // Import the admin routes

dotenv.config();

const app = express();

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to the database
connectDB();

// Middleware
app.use(helmet());
const corsOptions = {
    origin: 'https://mflix-blush.vercel.app', 
    credentials: true, // Allow credentials (cookies) to be sent
};
app.use(cors(corsOptions));
app.use(express.json());

// Session management

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'default-secret',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI || 'mongodb+srv://euginekoyo141:WZHtVTFRwxgd57JQ@cluster0.jbv3i.mongodb.net/',
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        },
    })
);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Check for required environment variables
if (!process.env.SESSION_SECRET || !process.env.MONGO_URI) {
    console.error('Missing required environment variables');
    process.exit(1);
}

// Serve static files for uploads with CORP header
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res) => {
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/movies', movieRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all handler to serve index.html for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

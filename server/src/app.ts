import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectToMongoDb from './frameworks/database/mongodb/connection';
import http from 'http';
import routes from './frameworks/webserver/routes';
import colors from 'colors.ts';
import errorHandlingMiddleware from './frameworks/webserver/middlewares/errorHandling';
import AppError from './utils/appError';
import cors from 'cors';

dotenv.config();
colors?.enable();

const app: Application = express();
const server = http.createServer(app);

// Try different ports if 5050 is not available
const PORT: number = parseInt(process.env.PORT || '5050', 10);
const ALTERNATE_PORTS = [5051, 5052, 5053];

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-refresh-token'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Connect to MongoDB
connectToMongoDb().catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
try {
  routes(app);
  console.log('Routes initialized successfully');
} catch (error) {
  console.error('Error initializing routes:', error);
}

// Error handling
app.use(errorHandlingMiddleware);

// Catch 404 errors
app.all('*', (req, res) => {
  console.log(`404: ${req.method} ${req.url}`);
  res.status(404).json({
    status: 'error',
    message: 'Not found'
  });
});

// Function to check if port is available
const isPortAvailable = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const testServer = http.createServer();
    testServer.once('error', () => {
      resolve(false);
    });
    testServer.once('listening', () => {
      testServer.close();
      resolve(true);
    });
    testServer.listen(port);
  });
};

// Function to find available port
const findAvailablePort = async (ports: number[]): Promise<number> => {
  for (const port of ports) {
    if (await isPortAvailable(port)) {
      return port;
    }
    console.log(`Port ${port} is in use, trying next port...`);
  }
  throw new Error('No available ports found');
};

// Start server
const startServer = async () => {
  try {
    const availablePort = await findAvailablePort([PORT, ...ALTERNATE_PORTS]);
    server.listen(availablePort, () => {
      console.log(`🚀 Server running on port ${availablePort}`);
      console.log(`Test the server at: http://localhost:${availablePort}/test`);
      console.log(`API base URL: http://localhost:${availablePort}/api`);
      console.log(`Frontend URL: http://localhost:3000`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start server
startServer();

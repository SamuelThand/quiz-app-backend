import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import questionsRoutes from './routes/questions';
import subjectRoutes from './routes/subjects';
import quizzesRoutes from './routes/quizzes';
import adminRoutes from './routes/admins';
import expressSession, { SessionOptions } from 'express-session';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

declare module 'express-session' {
  export interface Session {
    user?: any;
  }
}

const allowedOrigins = ['http://localhost:4200', 'https://studenter.miun.se'];

const corsOptions = {
  credentials: true,
  origin: allowedOrigins
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse incoming JSON payloads with express.json
app.use(express.urlencoded({ extended: true })); // Parse incoming requests with urlencoded payloads using express.urlencoded

const session: SessionOptions = {
  secret: 'hemligheten',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: true,
    secure: false,
    httpOnly: true
  }
};

if (process.env.NODE_ENV === 'production') {
  console.log('setting as production');
  app.set('trust proxy', 1);
  if (session.cookie !== undefined) {
    session.cookie.sameSite = 'none';
    session.cookie.secure = true;
  }
}

app.use(expressSession(session));

app.use('/questions', questionsRoutes);
app.use('/subjects', subjectRoutes);
app.use('/quizzes', quizzesRoutes);
app.use('/admins', adminRoutes);

mongoose
  .connect(process.env.DB_SERVER!)
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('db error', error);
    process.exit(1);
  });

// Start the server
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});

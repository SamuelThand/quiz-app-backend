// Include all needed modules
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
// import expressSession from 'express-session';

// import routes
import questionsRoutes from './routes/questions';
import subjectRoutes from './routes/subjects';
import quizzesRoutes from './routes/quizzes';
import adminRoutes from './routes/admins';

//  for testing
import { courseModel } from './models/testing';

//  Configure DOTENV
dotenv.config();

// Create an Express application
const app = express();
app.use(cors()); // CORS-enabled for all origins!

// Define the port the server will accept connections on
const port = process.env.PORT || 3000;

// Tell express to use a express.json, a built-in middleware in Express,
// that parses incoming requests with JSON payloads.
app.use(express.json());

// Tell express to use express.urlencoded, a built-in middleware in Express,
// that parses incoming requests with urlencoded payloads.
// The extended option is required. true is the default value and allows
// for a JSON-like experience with URL-encoded.
app.use(express.urlencoded({ extended: true }));

//  TODO use routes

//  TODO autentisering med express-session

//  test routes

app.get('/', (req: Request, res: Response) => {
  res.send('Testing');
});

app.get('/testing', (req, res) => {
  courseModel.find((error: any, course: any) => {
    if (error) {
      res.send(error);
      return false;
    }
    res.json(course);
    return true;
  });
});

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

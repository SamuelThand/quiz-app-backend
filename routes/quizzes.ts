import Express from 'express';
import { isValidObjectId } from 'mongoose';
import { Quiz } from '../models/quiz';

const quizzesRoutes = Express.Router();

/**
 * Get an array of all quizzes from the database.
 *
 * @route GET /quizzes
 * @returns 200 - An array of quizzes or empty array if no quizzes found.
 */
quizzesRoutes.get('/', function (req: Express.Request, res: Express.Response) {
  Quiz.getQuizzes().then((result) => {
    res.status(200).json(result);
  });
});

// TODO populera alla questions
/**
 * Get a quiz by id.
 *
 * @route GET /quizzes/:id
 * @param id id of the quiz
 * @returns 200 - The quiz, 404 - error, 400 - error
 */
quizzesRoutes.get(
  '/:id',
  function (req: Express.Request, res: Express.Response) {
    const id = req.params.id;
    if (isValidObjectId(id)) {
      Quiz.getQuiz(id).then((result) => {
        if (!result) {
          res.status(404).json({ error: 'Quiz with that id not found' });
          return;
        }
        res.status(200).json(result);
      });
    } else {
      res.status(400).json({ error: 'Invalid id format was sent' });
    }
  }
);

/**
 * Add a new Quiz.
 *
 * @route POST /quizzes
 * @returns 201 - the new quiz, 400 - error
 */
quizzesRoutes.post('/', function (req: Express.Request, res: Express.Response) {
  const newQuiz = new Quiz(req.body);

  Quiz.addQuiz(newQuiz).then((result) => {
    if (!result) {
      res.status(400).json({ error: 'Quiz not added' });
    } else {
      res.status(201).json(result);
    }
  });
});

/**
 * Update a Quiz.
 *
 * @route PUT /quizzes/:id
 * @param id id of the Quiz to update
 * @returns 200 - updated Quiz, 400 - error, 404 - error
 */
quizzesRoutes.put(
  '/:id',
  function (req: Express.Request, res: Express.Response) {
    const id = req.params.id;

    if (isValidObjectId(id)) {
      Quiz.getQuiz(id).then((oldQuiz) => {
        if (!oldQuiz) {
          res.status(404).json({ error: 'Quiz not found' });
          return;
        }
        oldQuiz.name = req.body.name;
        oldQuiz.questions = req.body.questions;
        oldQuiz.level = req.body.level;
        Quiz.updateQuiz(id, oldQuiz).then((newQuiz) => {
          res.status(200).json(newQuiz);
        });
      });
    } else {
      res.status(400).json({ error: 'Invalid id format was sent' });
    }
  }
);

/**
 * Deleta a Quiz.
 *
 * @route DELETE /quizzes/:id
 * @param id id of the Quiz
 * @returns 200 - deleted Quiz, 404 - error, 400 - error
 */
quizzesRoutes.delete(
  '/:id',
  function (req: Express.Request, res: Express.Response) {
    const id = req.params.id;

    if (isValidObjectId(id)) {
      Quiz.deleteQuizById(req.params.id).then((result) => {
        if (!result) {
          res.status(404).json({ error: 'Quiz not found' });
          return;
        }
        res.status(200).json(result);
      });
    } else {
      res.status(400).json({ error: 'Invalid id format was sent' });
    }
  }
);

export default quizzesRoutes;

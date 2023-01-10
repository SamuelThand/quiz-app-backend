import Express from 'express';
import { isValidObjectId } from 'mongoose';
import { Quiz } from '../models/quiz';
import { isAuthenticated } from '../middleware/authentication';

const quizzesRoutes = Express.Router();

/**
 * Get an array of all quizzes from the database.
 *
 * @route GET /quizzes
 * @return 200 - The quizzes, 500 - Error
 */
quizzesRoutes.get('/', function (req: Express.Request, res: Express.Response) {
  Quiz.getQuizzes()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

/**
 * Get a quiz by id.
 *
 * @route GET /quizzes/:id
 * @param id of the quiz
 * @return 200 - The quiz, 404 - Not found, 400 - Invalid, 500 - Error
 */
quizzesRoutes.get(
  '/:id',
  function (req: Express.Request, res: Express.Response) {
    const id = req.params.id;
    if (isValidObjectId(id)) {
      Quiz.getQuiz(id)
        .then((result) => {
          result
            ? res.status(200).json(result)
            : res.status(404).json({ message: 'Quiz not found' });
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(400).json({ error: 'Invalid quiz id' });
    }
  }
);

/**
 * Add a new Quiz.
 *
 * @route POST /quizzes
 * @return 201 - The new quiz, 409 - Conflict, 400 - Invalid, 500 - Error
 */
quizzesRoutes.post('/', function (req: Express.Request, res: Express.Response) {
  const newQuiz = new Quiz(req.body);
  Quiz.addQuiz(newQuiz)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        res
          .status(409)
          .json({ message: 'A quiz already exists with that id.' });
      } else if (error.name === 'ValidationError') {
        res.status(400).json({ message: 'New quiz has an incorrect format' });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});

/**
 * Update a Quiz.
 *
 * @route PUT /quizzes/:id
 * @param id of the Quiz to update
 * @return 200 - The updated question, 404 - Not found, 400 - Invalid, 304 - Not modified, 500 - Error
 */
quizzesRoutes.put(
  '/:id',
  function (req: Express.Request, res: Express.Response) {
    const id = req.params.id;

    if (isValidObjectId(id)) {
      Quiz.getQuiz(id)
        .then(async (oldQuiz) => {
          if (!oldQuiz) {
            res.status(404).json({ error: 'Quiz not found' });
            return;
          }
          try {
            oldQuiz.name = req.body.name;
            oldQuiz.questions = req.body.questions;
            oldQuiz.level = req.body.level;
            oldQuiz.played = req.body.played;
            const result = await Quiz.updateQuiz(id, oldQuiz);
            result
              ? res.status(200).json(result)
              : res.status(304).json({ message: 'Quiz not updated' });
          } catch (error: any) {
            res.status(500).json({ message: error.message });
          }
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(400).json({ error: 'Invalid quiz id' });
    }
  }
);

/**
 * Delete a Quiz.
 *
 * @route DELETE /quizzes/:id
 * @param id of the Quiz
 * @return 202 - The deleted quiz, 404 - Not found, 400 - Invalid, 500 - Error
 */
quizzesRoutes.delete(
  '/:id',
  function (req: Express.Request, res: Express.Response) {
    const id = req.params.id;

    if (isValidObjectId(id)) {
      Quiz.deleteQuizById(req.params.id)
        .then((result) => {
          result
            ? res.status(202).json(result)
            : res.status(404).json({ message: 'Quiz not found' });
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(400).json({ error: 'Invalid id format was sent' });
    }
  }
);

export default quizzesRoutes;

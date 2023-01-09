import Express from 'express';
import { isValidObjectId } from 'mongoose';
import { Question } from '../models/question';

const questionsRoutes = Express.Router();

/**
 * Get an array of all questions from the database.
 *
 * @route GET /questions
 * @return 200 - The quizzes
 */
questionsRoutes.get(
  '/',
  function (req: Express.Request, res: Express.Response) {
    Question.getQuestions()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  }
);

/**
 * Get question by id.
 *
 * @route GET /questions/:id
 * @param id of the question
 * @return 200 - The question, 404 - Not found, 400 - Invalid, 500 - Error
 */
questionsRoutes.get(
  '/:id',
  function (req: Express.Request, res: Express.Response) {
    const id = req.params.id;
    if (isValidObjectId(id)) {
      Question.getQuestion(id)
        .then((result) => {
          result
            ? res.status(200).json(result)
            : res.status(404).json({ message: 'Question not found' });
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(400).json({ error: 'Invalid question id' });
    }
  }
);

/**
 * Add a new question
 *
 * @route POST /questions
 * @return 201 - The new quiz, 400 - Invalid, 409 - Conflict, 500 - Error
 */
questionsRoutes.post(
  '/',
  function (req: Express.Request, res: Express.Response) {
    const newQuestion = new Question(req.body);
    Question.addQuestion(newQuestion)
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        if (error.name === 'MongoServerError' && error.code === 11000) {
          res
            .status(409)
            .json({ message: 'An question already exists with that id.' });
        } else if (error.name === 'ValidationError') {
          res
            .status(400)
            .json({ message: 'New question has an incorrect format' });
        } else {
          res.status(500).json({ message: error.message });
        }
      });
  }
);

/**
 * Update a question
 *
 * @route PUT /questions/:id
 * @param id of the question to update
 * @return 200 - The updated question, 404 - Not found, 400 - Invalid, 304 - Not modified, 500 - Error
 */
questionsRoutes.put(
  '/:id',
  function (req: Express.Request, res: Express.Response) {
    const id = req.params.id;
    const body = req.body;

    if (isValidObjectId(id)) {
      Question.getQuestion(req.params.id)
        .then(async (oldQuestion) => {
          if (!oldQuestion) {
            res.status(404).json({ error: 'Question not found' });
            return;
          }
          try {
            body.name = oldQuestion.name;
            body.creator = oldQuestion.creator;
            body.date = oldQuestion.date;
            const result = await Question.updateQuestion(id, body);
            result
              ? res.status(200).json(result)
              : res.status(304).json({ message: 'Question not updated' });
          } catch (error: any) {
            res.status(500).json({ message: error.message });
          }
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(400).json({ error: 'Invalid question id' });
    }
  }
);

/**
 * Delete a question by id
 *
 * @route DELETE /questions/:id
 * @param id of the question
 * @return 202 - The deleted question, 404 - Not found, 400 - Invalid, 500 - Error
 */
questionsRoutes.delete(
  '/:id',
  async function (req: Express.Request, res: Express.Response) {
    const id = req.params.id;

    if (isValidObjectId(id)) {
      Question.deleteQuestionById(req.params.name)
        .then((result) => {
          result
            ? res.status(202).json(result)
            : res.status(404).json({ message: 'Question not found' });
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(400).json({ error: 'Invalid question id' });
    }
  }
);

export default questionsRoutes;

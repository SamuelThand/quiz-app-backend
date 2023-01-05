import Express from 'express';
import { isValidObjectId } from 'mongoose';
import { Question } from '../models/question';

const questionsRoutes = Express.Router();

/**
 * Get all questions
 *
 * @route GET /questions
 */
questionsRoutes.get(
  '/',
  function (req: Express.Request, res: Express.Response) {
    Question.getQuestions().then((result) => {
      res.status(200).json(result);
    });
  }
);

/**
 * Get question by id
 *
 * @route GET /questions/:id
 */
questionsRoutes.get(
  '/:id',
  function (req: Express.Request, res: Express.Response) {
    const id = req.params.id;

    if (isValidObjectId(id)) {
      Question.getQuestion(id).then((result) => {
        if (!result) {
          res.status(404).json({ error: 'Question not found' });
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
 * Add a new question
 *
 * @route POST /questions
 */
questionsRoutes.post(
  '/',
  function (req: Express.Request, res: Express.Response) {
    const newQuestion = new Question(req.body);
    Question.addQuestion(newQuestion).then((result) => {
      if (!result) {
        res.status(400).json({ error: 'Question not added' });
        return;
      }
      res.status(201).json(result);
    });
  }
);

/**
 * Modify a question
 *
 * @route PUT /questions/:id
 */
questionsRoutes.put(
  '/:id',
  function (req: Express.Request, res: Express.Response) {
    const id = req.params.id;
    const body = req.body;

    if (isValidObjectId(id)) {
      Question.getQuestion(req.params.id).then((oldQuestion) => {
        if (!oldQuestion) {
          res.status(404).json({ error: 'Question not found' });
          return;
        }
        body.name = oldQuestion.name;
        body.creator = oldQuestion.creator;

        Question.updateQuestion(id, body).then((newQuestion) => {
          res.status(200).json(newQuestion);
        });
      });
    } else {
      res.status(400).json({ error: 'Invalid id format was sent' });
    }
  }
);

/**
 * Delete a question by name
 *
 * @route DELETE /questions/:name
 */
questionsRoutes.delete(
  '/:id',
  async function (req: Express.Request, res: Express.Response) {
    const id = req.params.id;

    if (isValidObjectId(id)) {
      Question.deleteQuestionById(req.params.name).then((result) => {
        if (!result) {
          res.status(404).send('Question not found');
        } else {
          res.status(200).json(result);
        }
      });
    } else {
      res.status(400).json({ error: 'Invalid id format was sent' });
    }
  }
);

export default questionsRoutes;

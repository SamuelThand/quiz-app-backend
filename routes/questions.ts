import Express from 'express';
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
      if (result.length === 0) {
        res.status(404).json({ message: 'No questions found' });
        return;
      }
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
    console.log(id);
    Question.getQuestion(id).then((result) => {
      if (!result) {
        res.status(404).json({ message: 'Question not found' });
        return;
      }
      res.status(200).json(result);
    });
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
        res.status(400).json({ message: 'Question not added' });
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
    Question.getQuestion(req.params.id).then((question) => {
      if (!question) {
        res.status(404).json({ message: 'Question not found' });
        return;
      }
      question.name = req.body.name;
      question.creator = req.body.creator;
      question.language = req.body.language;
      Question.updateQuestion(question).then((result) => {
        if (!result) {
          res.status(400).json({ message: 'Question not updated' });
          return;
        }
        res.status(200).json(result);
      });
    });
  }
);

// TODO: Change to delete by id (deleteQuestionById()) when frontend is ready

/**
 * Delete a question by name
 *
 * @route DELETE /questions/:name
 */
questionsRoutes.delete(
  '/:name',
  async function (req: Express.Request, res: Express.Response) {
    Question.deleteQuestionByName(req.params.name).then((result) => {
      if (!result) {
        res.status(404).send('Question not found');
      } else {
        res.status(200).json(result);
      }
    });
  }
);

export default questionsRoutes;

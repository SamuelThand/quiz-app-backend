import Express from 'express';
import { questionModel } from '../models/question';

const questionsRoutes = Express.Router();

questionsRoutes.get(
  '/',
  function (req: Express.Request, res: Express.Response) {
    questionModel.find((error: any, question: any) => {
      if (error) {
        res
          .status(500)
          .send({ message: 'Error when getting question.', error });
        return false;
      } else if (!question) {
        res.status(404).send({ message: 'No question found.' });
        return false;
      }
      res.status(200).json(question);
      return true;
    });
  }
);

// TODO: Remove one of name/code ?

questionsRoutes.get(
  '/:name',
  function (req: Express.Request, res: Express.Response) {
    throw Error('Fool');
  }
);

questionsRoutes.get(
  '/:code',
  function (req: Express.Request, res: Express.Response) {
    throw Error('Fool');
  }
);

questionsRoutes.post(
  '/',
  function (req: Express.Request, res: Express.Response) {
    throw Error('Fool');
  }
);

questionsRoutes.put(
  '/:code',
  function (req: Express.Request, res: Express.Response) {
    throw Error('Fool');
  }
);

questionsRoutes.delete(
  '/:code',
  function (req: Express.Request, res: Express.Response) {
    throw Error('Fool');
  }
);

export = questionsRoutes;

import Express from 'express';
import { questionModel } from '../models/question';

const questionsRoutes = Express.Router();

questionsRoutes.get(
  '/',
  async function (req: Express.Request, res: Express.Response) {
    const respon = await questionModel.getQuestions();
    res.status(200).json(respon);
  }
);

// TODO: Remove one of name/code ?

questionsRoutes.get(
  '/:name',
  function (req: Express.Request, res: Express.Response) {
    const name = req.params.name;
    questionModel.getQuestion(name);
  }
);

// questionsRoutes.get(
//   '/:code',
//   function (req: Express.Request, res: Express.Response) {
//     throw Error('Fool');
//   }
// );

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

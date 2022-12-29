import Express from 'express';
const questionsRoutes = Express.Router();
const Questions = require('../models/questions');

questionsRoutes.get(
  '/',
  function (req: Express.Request, res: Express.Response) {
    Questions.getQuestions().then((obj: [Object]) => {
      res.status(200).send(obj);
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

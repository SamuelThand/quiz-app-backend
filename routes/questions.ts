import Express from 'express';
const routes = Express.Router();
const Questions = require('../models/questions');

routes.get('/', function (req: Express.Request, res: Express.Response) {
  Questions.getQuestions().then((obj: [Object]) => {
    res.status(200).send(obj);
  });
});

// TODO: Remove one name/code

routes.get('/:name', function (req: Express.Request, res: Express.Response) {
  throw Error('Fool');
});

routes.get('/:code', function (req: Express.Request, res: Express.Response) {
  throw Error('Fool');
});

routes.post('/', function (req: Express.Request, res: Express.Response) {
  throw Error('Fool');
});

module.exports = routes;

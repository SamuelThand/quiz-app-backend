import Express from 'express';
const routes = Express.Router();

routes.get('/', function (req: Express.Request, res: Express.Response) {
  throw Error('Fool');
});

routes.get('/:name', function (req: Express.Request, res: Express.Response) {
  throw Error('Fool');
});

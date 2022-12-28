import Express from 'express';
const routes = Express.Router();

routes.get('/', function (req: Express.Request, res: Express.Response) {
  throw Error('Fool');
});

// TODO: Remove one of name/code

routes.get('/:name', function (req: Express.Request, res: Express.Response) {
  throw Error('Fool');
});

routes.get('/:code', function (req: Express.Request, res: Express.Response) {
  throw Error('Fool');
});

routes.post('/', function (req: Express.Request, res: Express.Response) {
  throw Error('Fool');
});

routes.put('/:code', function (req: Express.Request, res: Express.Response) {
  throw Error('Fool');
});

routes.delete('/:code', function (req: Express.Request, res: Express.Response) {
  throw Error('Fool');
});

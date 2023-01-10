import Express from 'express';

export function isAuthenticated(
  req: Express.Request,
  res: Express.Response,
  next: Function
) {
  req.session.user ? next() : next('route'); // TODO vad ska vara här istället för 'route'
}

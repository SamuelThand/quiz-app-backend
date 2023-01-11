import Express from 'express';

export function isAuthenticated(
  req: Express.Request,
  res: Express.Response,
  next: Function
) {
  req.session.user ? next() : res.status(401).json(); // TODO vad ska vara här istället för 'route'
}

import Express from 'express';
import { Subject } from '../models/subject';

const subjectRoutes = Express.Router();

subjectRoutes.get('/', function (req: Express.Request, res: Express.Response) {
  Subject.getSubjects().then((result) => {
    if (result.length === 0) {
      res.status(404).json({ message: 'No subjects found' });
      return;
    }
    res.status(200).json(result);
  });
});

subjectRoutes.get(
  '/:subjectCode',
  function (req: Express.Request, res: Express.Response) {
    const subjectCode = req.params.subjectCode;
    Subject.getSubject(subjectCode).then((result) => {
      if (!result) {
        res.status(404).json({ message: 'Subject not found' });
        return;
      }
      res.status(200).json(result);
    });
  }
);

subjectRoutes.post('/', function (req: Express.Request, res: Express.Response) {
  const subject = req.body;
  Subject.addSubject(subject).then((result) => {
    if (!result) {
      res
        .status(409)
        .json({ message: 'A subject already exists with that subject code.' });
      return;
    }
    res.status(201).json(result);
  });
});

subjectRoutes.put('/', function (req: Express.Request, res: Express.Response) {
  const subject = req.body;
  Subject.updateSubject(subject).then((result) => {
    if (!result) {
      res.status(404).json({ message: 'Subject not found' });
      return;
    }
    res.status(200).json(result);
  });
});

subjectRoutes.delete(
  '/:subjectCode',
  function (req: Express.Request, res: Express.Response) {
    const subjectCode = req.params.subjectCode;
    Subject.deleteSubject(subjectCode).then((result) => {
      if (!result) {
        res.status(404).json({ message: 'Subject not found' });
        return;
      }
      res.status(200).json(result);
    });
  }
);

export = subjectRoutes;

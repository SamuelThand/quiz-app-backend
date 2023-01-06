import Express from 'express';
import { Subject } from '../models/subject';

const subjectRoutes = Express.Router();

/**
 * Get an array of all subjects from the database.
 *
 * @route GET /subjects
 * @return 200 - The subjects, 404 - Not found
 */
subjectRoutes.get('/', function (req: Express.Request, res: Express.Response) {
  Subject.getSubjects().then((result) => {
    if (result.length === 0) {
      res.status(404).json({ message: 'No subjects found' });
      return;
    }
    res.status(200).json(result);
  });
});

/**
 * Get a subject by subjectcode.
 *
 * @route GET /subjects/:subjectCode
 * @param subjectCode of the subject
 * @return 200 - The subject, 404 - Not found
 */
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

/**
 * Add a new subject.
 *
 * @route POST /subjects
 * @return 201 - The new subject, 409 - Conflict
 */
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

/**
 * Update a subject.
 *
 * @route PUT /subjects
 * @return 200 - The subject, 404 - Not found
 */
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

/**
 * Delete a subject by subjectCode.
 *
 * @route DELETE /subjects/:subjectCode
 * @param subjectCode of the subject
 * @return 200 - The deleted subject, 404 - Not found
 */
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

import Express from 'express';
import { Subject } from '../models/subject';

const subjectRoutes = Express.Router();

/**
 * Get an array of all subjects from the database.
 *
 * @route GET /subjects
 * @return 200 - The subjects, 500 - Error
 */
subjectRoutes.get('/', function (req: Express.Request, res: Express.Response) {
  Subject.getSubjects()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
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
    Subject.getSubject(subjectCode)
      .then((result) => {
        result
          ? res.status(200).json(result)
          : res.status(404).json({ message: 'Subject not found' });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
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
  Subject.addSubject(subject)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        res.status(409).json({
          message: 'An subject already exists with that subjectCode.'
        });
      } else if (error.name === 'ValidationError') {
        res
          .status(400)
          .json({ message: 'New subject has an incorrect format' });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});

/**
 * Update a subject.
 *
 * @route PUT /subjects
 * @return 200 - The subject, 304 - Not modified
 */
subjectRoutes.put('/', function (req: Express.Request, res: Express.Response) {
  const subject = req.body;
  Subject.updateSubject(subject)
    .then((result) => {
      result
        ? res.status(200).json(result)
        : res.status(304).json({ message: 'Subject not updated' });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

/**
 * Delete a subject by subjectCode.
 *
 * @route DELETE /subjects/:subjectCode
 * @param subjectCode of the subject
 * @return 202 - The deleted subject, 404 - Not found, 500 - Error
 */
subjectRoutes.delete(
  '/:subjectCode',
  function (req: Express.Request, res: Express.Response) {
    const subjectCode = req.params.subjectCode;
    Subject.deleteSubject(subjectCode)
      .then((result) => {
        result
          ? res.status(202).json(result)
          : res.status(404).json({ message: 'Subject not found' });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  }
);

export = subjectRoutes;

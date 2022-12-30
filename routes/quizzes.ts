import Express from 'express';
import { Quiz } from '../models/quiz';

const quizzesRoutes = Express.Router();

quizzesRoutes.get('/', function (req: Express.Request, res: Express.Response) {
  Quiz.getQuizzes().then((result) => {
    if (result.length === 0) {
      res.status(404).json({ message: 'No quizzes found' });
      return;
    }
    res.status(200).json(result);
  });
});

// TODO: Remove one of name/code

quizzesRoutes.get(
  '/:name',
  function (req: Express.Request, res: Express.Response) {
    const name = req.params.name;
    Quiz.getQuiz(name).then((result) => {
      if (!result) {
        res.status(404).json({ message: 'Quiz not found' });
        return;
      }
      res.status(200).json(result);
    });
  }
);

// quizzesRoutes.get(
//   '/:id',
//   function (req: Express.Request, res: Express.Response) {
//     const id = req.params.id;
//     Quiz.getQuiz(id).then((result) => {
//       if (!result) {
//         res.status(404).json({ message: 'Quiz not found' });
//         return;
//       }
//       res.status(200).json(result);
//     });
//   }
// );

quizzesRoutes.post('/', function (req: Express.Request, res: Express.Response) {
  const newQuiz = new Quiz(req.body);
  Quiz.addQuiz(newQuiz).then((result) => {
    if (!result) {
      res.status(400).json({ message: 'Quiz not added' });
      return;
    }
    res.status(201).json(result);
  });
});

quizzesRoutes.put(
  '/:id',
  function (req: Express.Request, res: Express.Response) {
    Quiz.getQuiz(req.params.id).then((quiz) => {
      if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' });
        return;
      }
      quiz.name = req.body.name;
      quiz.questions = req.body.questions;
      quiz.level = req.body.level;
      Quiz.updateQuiz(quiz).then((result) => {
        if (!result) {
          res.status(400).json({ message: 'Quiz not updated' });
          return;
        }
        res.status(200).json(result);
      });
    });
  }
);

quizzesRoutes.delete(
  '/:name',
  function (req: Express.Request, res: Express.Response) {
    Quiz.deleteQuizByName(req.params.name).then((result) => {
      if (!result) {
        res.status(404).json({ message: 'Quiz not found' });
        return;
      }
      res.status(200).json(result);
    });
  }
);

// quizzesRoutes.delete(
//   '/:id',
//   function (req: Express.Request, res: Express.Response) {
//     Quiz.deleteQuizById(req.params.id).then((result) => {
//       if (!result) {
//         res.status(404).json({ message: 'Quiz not found' });
//         return;
//       }
//       res.status(200).json(result);
//     });
//   }
// );

export default quizzesRoutes;

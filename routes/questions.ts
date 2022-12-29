import Express from 'express';
import { questionModel } from '../models/question';

const questionsRoutes = Express.Router();

// Return all questions
questionsRoutes.get(
  '/',
  async function (req: Express.Request, res: Express.Response) {
    const result = await questionModel.getQuestions();
    res.status(200).json(result);
  }
);

// TODO: Remove one of name/code ?

// Problem with name as parameter
// questionsRoutes.get(
//   '/:name',
//   async function (req: Express.Request, res: Express.Response) {
//     const name = req.params.name;
//     console.log(name);
//     const result = await questionModel.getQuestion(name);
//     res.status(200).json(result);
//   }
// );

questionsRoutes.get(
  '/:id',
  async function (req: Express.Request, res: Express.Response) {
    const id = req.params.id;
    console.log(id);
    const result = await questionModel.getQuestion(id);
    res.status(200).json(result);
  }
);

questionsRoutes.post(
  '/',
  async function (req: Express.Request, res: Express.Response) {
    const creator = req.body.creator;
    const name = req.body.name;
    const question = req.body.question;
    const option1 = req.body.option1;
    const optionX = req.body.optionX;
    const option2 = req.body.option2;
    const correctOption = req.body.correctOption;
    // Skip date and go for default value (Date.now) instead
    // const date = req.body.date;
    const level = req.body.level;
    const subject = req.body.subject;
    const language = req.body.language;

    console.log('creator: ' + creator);

    const result = await questionModel.addQuestion(
      creator,
      name,
      question,
      option1,
      optionX,
      option2,
      correctOption,
      level,
      subject,
      language
    );
    res.status(200).json(result);
  }
);

questionsRoutes.put(
  '/:id',
  function (req: Express.Request, res: Express.Response) {
    throw Error('Fool');
  }
);

// TODO: Possibly keep this one and remove the name one
// questionsRoutes.delete(
//   '/:id',
//   function (req: Express.Request, res: Express.Response) {
//     throw Error('Fool');
//   }
// );

questionsRoutes.delete(
  '/:name',
  async function (req: Express.Request, res: Express.Response) {
    const result = await questionModel.deleteQuestionByName(req.params.name);
    res.status(200).json(result);
  }
);

export = questionsRoutes;

import { model, Model, Schema } from 'mongoose';
import { Question } from './question';
import { Admin } from './admin';

interface IQuiz {
  creator: string;
  name: string;
  questions: string[];
  level: number;
  date: Date;
}

interface IQuizMethods {}

interface QuizModel extends Model<IQuiz, {}, IQuizMethods> {
  getQuizzes(): Promise<IQuiz[]>;
  getQuiz(name: string): Promise<IQuiz>;
  getQuizzesByCreator(creator: string): Promise<IQuiz[]>;
  addQuiz(quiz: IQuiz): Promise<IQuiz>;
  updateQuiz(quiz: IQuiz): Promise<IQuiz>;
  deleteQuizByName(name: string): Promise<IQuiz>;
  deleteQuizById(id: string): Promise<IQuiz>;
}

const quizSchema = new Schema<IQuiz, QuizModel, IQuizMethods>({
  creator: {
    type: String,
    ref: 'admins',
    required: true
  },
  name: {
    String,
    required: true
  },
  questions: [
    {
      type: String,
      ref: 'questions'
    }
  ],
  level: Number,
  date: { type: Date, default: Date.now }
});

export const Quiz = model<IQuiz, QuizModel>('quiz', quizSchema);

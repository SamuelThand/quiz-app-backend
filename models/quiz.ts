import { model, Model, Schema } from 'mongoose';

interface IQuiz {
  creator: string;
  name: string;
  questions: string[];
  level: Number;
  date: Date;
}

interface IQuizMethods {}

interface QuizModel extends Model<IQuiz, {}, IQuizMethods> {}

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
  date: Date
});

export const quizModel = model('quiz', quizSchema);

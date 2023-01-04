import { model, Model, Schema } from 'mongoose';
import { Question } from './question';
import { Admin } from './admin';

interface IQuiz {
  creator: Schema.Types.ObjectId;
  name: string;
  questions: Schema.Types.ObjectId[];
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
  // TODO Problem med att posta en quiz med creator, för att man måste ha ett _ID som refererar till ett
  // admin dokument creator, hämta det _id:t och ange det när man postar frågan i frontend
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
    // type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'question'
    }
  ],
  level: Number,
  date: { type: Date, default: Date.now }
});

// Statics (Model functions)

/**
 * Get all quizzes
 *
 * @returns {Promise<IQuiz[]>} Promise of all quizzes
 */
quizSchema.static('getQuizzes', function () {
  return this.find({});
});

/**
 * Get quiz by name
 * @param {string} name quiz name
 * @returns {Promise<IQuiz>} Promise of quiz
 */
quizSchema.static('getQuiz', function (name: string) {
  return this.findOne({ name });
});

quizSchema.static('getQuizzesByCreator', function (creator: string) {
  return this.find({ creator });
});

quizSchema.static('addQuiz', function (quiz: IQuiz) {
  return this.create(quiz);
});

quizSchema.static('updateQuiz', function (quiz: IQuiz) {
  return this.findOneAndUpdate({ name: quiz.name }, quiz, { new: true });
});

quizSchema.static('deleteQuizByName', function (name: string) {
  return this.findOneAndDelete({ name });
});

quizSchema.static('deleteQuizById', function (id: string) {
  return this.findByIdAndDelete(id);
});

// Methods (Document functions)

export const Quiz = model<IQuiz, QuizModel>('quiz', quizSchema);

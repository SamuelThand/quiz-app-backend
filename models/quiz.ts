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
  updateQuiz(id: string, newQuiz: IQuiz): Promise<IQuiz>;
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

// TODO: Byt ut alla "id: String" till ObjectId om behovet finns.

/**
 * Get all quizzes
 *
 * @returns {Promise<IQuiz[]>} Promise of all quizzes
 */
quizSchema.static('getQuizzes', function () {
  return this.find({});
});

/**
 * Get quiz by id, with its questions.
 *
 * @param {string} id id of the quiz
 * @returns {Promise<IQuiz>} Promise of the quiz
 */
quizSchema.static('getQuiz', function (id: string) {
  return this.findById(id).populate('questions');
});

/**
 * Get quizzes by creator.
 *
 * @param {string} creator id of the creator
 * @returns {Promise<IQuiz[]>} Promise of the quizzes by the creator
 */
quizSchema.static('getQuizzesByCreator', function (creator: string) {
  return this.find({ creator });
});

/**
 * Add a new quiz.
 *
 * @param {IQuiz} quiz quiz to add
 * @returns {Promise<IQuiz>} Promise of the added quiz
 */
quizSchema.static('addQuiz', function (quiz: IQuiz) {
  return this.create(quiz);
});

/**
 * Update a quiz.
 *
 * @param {string} id id of the quiz to update
 * @param {IQuiz} newQuiz new version of the quiz
 * @returns {Promise<IQuiz>} Promise of the new quiz
 */
quizSchema.static('updateQuiz', function (id: string, newQuiz: IQuiz) {
  return this.findByIdAndUpdate(id, newQuiz, { new: true });
});

/**
 * Delete a quiz.
 *
 * @param {string} id id of the quiz to delete
 * @returns {Promise<IQuiz>} Promise of the deleted quiz
 */
quizSchema.static('deleteQuizById', function (id: string) {
  return this.findByIdAndDelete(id);
});

// Methods (Document functions)

export const Quiz = model<IQuiz, QuizModel>('quiz', quizSchema);

import { model, Model, Schema } from 'mongoose';

/**
 * Typescript interface for quiz objects, represents a document in MongoDB.
 */
interface IQuiz {
  creator: Schema.Types.ObjectId;
  name: string;
  questions: Schema.Types.ObjectId[];
  level: number;
  date: Date;
  played?: number;
}

/**
 * Interface for quiz instance methods.
 */
interface IQuizMethods {}

/**
 * Mongoose Model for quiz documents, contains definitions for Mongoose statics, instance and document methods.
 */
interface QuizModel extends Model<IQuiz, {}, IQuizMethods> {
  getQuizzes(): Promise<IQuiz[]>;
  getQuiz(name: string): Promise<IQuiz>;
  getQuizzesByCreator(creator: string): Promise<IQuiz[]>;
  addQuiz(quiz: IQuiz): Promise<IQuiz>;
  updateQuiz(id: string, newQuiz: IQuiz): Promise<IQuiz>;
  deleteQuizById(id: string): Promise<IQuiz>;
}

/**
 * Schema for quizzes, corresponds to the MongoDB document interface.
 * Contains the Typescript IQuiz interface, QuizModel and IQuizMethods.
 */
const quizSchema = new Schema<IQuiz, QuizModel, IQuizMethods>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
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
  date: { type: Date, default: Date.now },
  played: { type: Number, default: 0 }
});

// Statics (Model functions)

/**
 * Get all quizzes with all info about their creator from MongoDB.
 *
 * @returns {Promise<IQuiz[]>} Promise of all quizzes
 */
quizSchema.static('getQuizzes', function () {
  return this.find({}).populate('creator', [
    'userName',
    'firstName',
    'lastName'
  ]);
});

/**
 * Get quiz by id with its questions by id from MongoDB.
 *
 * @param {string} id of the quiz
 * @returns {Promise<IQuiz>} Promise of the quiz
 */
quizSchema.static('getQuiz', function (id: string) {
  return this.findById(id).populate('questions');
});

/**
 * Get quizzes by creator from MongoDB.
 *
 * @param {string} creator id of the creator
 * @returns {Promise<IQuiz[]>} Promise of the quizzes by the creator
 */
quizSchema.static('getQuizzesByCreator', function (creator: string) {
  return this.find({ creator });
});

/**
 * Add a quiz to MongoDB.
 *
 * @param {IQuiz} quiz to add
 * @returns {Promise<IQuiz>} Promise of the added quiz
 */
quizSchema.static('addQuiz', function (quiz: IQuiz) {
  return this.create(quiz);
});

/**
 * Update a quiz by id in MongoDB.
 *
 * @param {string} id of the quiz to update
 * @param {IQuiz} newQuiz new version of the quiz
 * @returns {Promise<IQuiz>} Promise of the new quiz
 */
quizSchema.static('updateQuiz', function (id: string, newQuiz: IQuiz) {
  return this.findByIdAndUpdate(id, newQuiz, { new: true });
});

/**
 * Delete a quiz by id in MongoDB.
 *
 * @param {string} id id of the quiz to delete
 * @returns {Promise<IQuiz>} Promise of the deleted quiz
 */
quizSchema.static('deleteQuizById', function (id: string) {
  return this.findByIdAndDelete(id);
});

export const Quiz = model<IQuiz, QuizModel>('quiz', quizSchema);

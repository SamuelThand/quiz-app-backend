import { model, Model, Schema } from 'mongoose';

/**
 * Typescript interface for question objects, represents a document in MongoDB.
 */
interface IQuestion {
  creator: Schema.Types.ObjectId;
  name: string;
  question: string;
  option1: string;
  optionX: string;
  option2: string;
  correctOption: string;
  date: Date;
  level: number;
  subject: Schema.Types.ObjectId;
  language: string;
}

/**
 * Interface for question instance methods.
 */
interface IQuestionMethods {}

/**
 * Mongoose Model for question documents, contains definitions for Mongoose statics, instance and document methods.
 */
interface QuestionModel extends Model<IQuestion, {}, IQuestionMethods> {
  getQuestions(): Promise<IQuestion[]>;
  getQuestion(name: string): Promise<IQuestion>;
  getQuestionsByCreator(creator: string): Promise<IQuestion[]>;
  addQuestion(question: IQuestion): Promise<IQuestion>;
  updateQuestion(id: string, newQuestion: IQuestion): Promise<IQuestion>;
  deleteQuestionById(id: string): Promise<IQuestion>;
}

/**
 * Schema for questions, corresponds to the MongoDB document interface.
 * Contains the Typescript IQuiz interface, QuizModel and IQuizMethods.
 */
const questionSchema = new Schema<IQuestion, QuestionModel, IQuestionMethods>({
  creator: { type: Schema.Types.ObjectId, required: true, ref: 'admin' },
  name: { type: String, required: true, minlength: 4 },
  question: { type: String, required: true },
  option1: { type: String, required: true },
  optionX: { type: String, required: true },
  option2: { type: String, required: true },
  correctOption: { type: String, required: true },
  date: { type: Date, default: Date.now },
  level: { type: Number, required: true, min: 1, max: 3 },
  subject: { type: Schema.Types.ObjectId, required: true, ref: 'subject' },
  language: { type: String, required: true }
});

// Statics (Model functions)

/**
 * Get all questions from MongoDB.
 *
 * @returns {Promise<IQuestion[]>} Promise of all questions
 */
questionSchema.static('getQuestions', function () {
  return this.find({}).populate('subject', 'name');
});

/**
 * Get question by id from MongoDB.
 *
 * @param {string} id of the question
 * @returns {Promise<IQuestion>} Promise of the question
 */
questionSchema.static('getQuestion', function (id: string) {
  try {
    return this.findById(id);
  } catch (error: any) {
    console.log(error);
    return null;
  }
});

/**
 * Get all questions by creator from MongoDB.
 *
 * @param {string} creator id of creator
 * @returns {Promise<IQuestion[]>} Promise of the questions by the creator
 */
questionSchema.static('getQuestionsByCreator', function (creator: string) {
  return this.find({ creator });
});

/**
 * Add a question to MongoDB.
 *
 * @param {IQuestion} question to add
 * @returns {Promise<IQuestion>} Promise of the added question
 */
questionSchema.static('addQuestion', async function (question: IQuestion) {
  return this.create(question);
});

/**
 * Update a question in MongoDB.
 *
 * @param {IQuestion} question to update
 * @returns {Promise<IQuestion>} Promise of the updated question
 */
questionSchema.static(
  'updateQuestion',
  function (id: string, newQuestion: IQuestion) {
    return this.findByIdAndUpdate(id, newQuestion, { new: true });
  }
);

/**
 * Delete a question by id in MongoDB.
 *
 * @param {string} id of the question to delete
 * @returns {Promise<IQuestion>} Promise of the deleted quiz
 */
questionSchema.static('deleteQuestionById', function (id: string) {
  return this.findByIdAndDelete(id);
});

export const Question = model<IQuestion, QuestionModel>(
  'question',
  questionSchema
);

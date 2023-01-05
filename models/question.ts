import { model, Model, Schema, Query } from 'mongoose';
import { Subject } from './subject';
import { Admin } from './admin';

// TODO: Enter valid scheme
// TODO: Export interfaces needed for routes

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

interface IQuestionMethods {}

/**
 * Question model interface
 */
interface QuestionModel extends Model<IQuestion, {}, IQuestionMethods> {
  getQuestions(): Promise<IQuestion[]>;
  getQuestion(name: string): Promise<IQuestion>;
  getQuestionsByCreator(creator: string): Promise<IQuestion[]>;
  addQuestion(question: IQuestion): Promise<IQuestion>;
  updateQuestion(id: string, newQuestion: IQuestion): Promise<IQuestion>;
  deleteQuestionByName(name: string): Promise<IQuestion>;
  deleteQuestionById(id: string): Promise<IQuestion>;
}

const questionSchema = new Schema<IQuestion, QuestionModel, IQuestionMethods>({
  creator: { type: Schema.Types.ObjectId, required: true, ref: 'admin' },
  name: { type: String, required: true, minlength: 4, unique: true },
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
 * Get all questions
 *
 * @returns {Promise<IQuestion[]>} Promise of all questions
 */
questionSchema.static('getQuestions', function () {
  return this.find({});
});

/**
 * Get question by id
 *
 * @param {string} id - Id of question
 * @returns {Promise<IQuestion>} Promise of question
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
 * Get all questions by a specific creator
 *
 * @param {string} creator - name of creator
 * @returns {Promise<IQuestion[]>} Promise of all questions by the creator
 */
questionSchema.static('getQuestionsByCreator', function (creator: string) {
  return this.find({ creator });
});

/**
 * Add a new question by sentding a question object
 *
 * @param {IQuestion} question - Question object
 * @returns {Promise<IQuestion>} Promise of the added question
 */
questionSchema.static('addQuestion', async function (question: IQuestion) {
  return this.create(question);
});

/**
 * Update a question by sending a question object
 * @param {IQuestion} question - IQuestion object
 * @returns {Promise<IQuestion>} Promise of the updated question
 */
questionSchema.static(
  'updateQuestion',
  function (id: string, newQuestion: IQuestion) {
    return this.findByIdAndUpdate(id, newQuestion, { new: true });
  }
);

/**
 * Delete a question by name
 *
 * @param {string} name - Name of question
 * @returns {Promise<IQuestion>} Promise of the deleted question
 */
questionSchema.static('deleteQuestionByName', function (name: string) {
  return this.findOneAndDelete({ name });
});

questionSchema.static('deleteQuestionById', function (id: string) {
  return this.findByIdAndDelete(id);
});

// Methods (Document functions)

export const Question = model<IQuestion, QuestionModel>(
  'question',
  questionSchema
);

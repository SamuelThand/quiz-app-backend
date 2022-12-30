import { model, Model, Schema, Query } from 'mongoose';

// TODO: Enter valid scheme
// TODO: Export interfaces needed for routes

interface IQuestion {
  creator: string;
  name: string;
  question: string;
  option1: string;
  optionX: string;
  option2: string;
  correctOption: string;
  date: Date;
  level: number;
  subject: string;
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
  updateQuestion(question: IQuestion): Promise<IQuestion>;
  deleteQuestionByName(name: string): Promise<IQuestion>;
  deleteQuestionById(id: string): Promise<IQuestion>;
}

const questionSchema = new Schema<IQuestion, QuestionModel, IQuestionMethods>({
  creator: { type: String, required: true },
  name: { type: String, required: true },
  question: String,
  option1: String,
  optionX: String,
  option2: String,
  correctOption: String, // Referera till en option ovan
  date: { type: Date, default: Date.now },
  level: Number,
  subject: [{ type: String, ref: 'subjects' }],
  language: String
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

// TODO: Possibly return multiple questions by name?

/**
 * Get question by id
 *
 * @param {string} id - Id of question
 * @returns {Promise<IQuestion>} Promise of question
 */
questionSchema.static('getQuestion', function (id: string) {
  try {
    return this.findById(id);
  } catch (error) {
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
questionSchema.static('addQuestion', function (question: IQuestion) {
  return this.create(question);
});

/**
 * Update a question by sending a question object
 * @param {IQuestion} question - IQuestion object
 * @returns {Promise<IQuestion>} Promise of the updated question
 */
questionSchema.static('updateQuestion', function (question: IQuestion) {
  // TODO: Implement this
});

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

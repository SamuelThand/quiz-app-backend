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
  level: Number;
  subject: string;
  language: string;
}

interface IQuestionMethods {}

interface QuestionModel extends Model<IQuestion, {}, IQuestionMethods> {
  //  TODO är detta rätt return type? Eller ska det vara ett Query<> objekt?
  getQuestions(): Promise<IQuestion[]>;
  getQuestion(name: string): Promise<IQuestion>;
  getQuestionsByCreator(creator: string): Promise<IQuestion[]>;
  addQuestion(
    creator: string,
    name: string,
    question: string,
    option1: string,
    optionX: string,
    option2: string,
    correctOption: string,
    level: Number,
    subject: string[],
    language: string
  ): Promise<IQuestion>;
  deleteQuestionByName(name: string): Promise<IQuestion>;
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
questionSchema.static('getQuestions', async function () {
  return this.find({});
});

// TODO: Possibly return multiple questions by name?

/**
 * Get question by id
 *
 * @param {string} id - Id of question
 * @returns {Promise<IQuestion>} Promise of question
 */
questionSchema.static('getQuestion', async function (id: string) {
  return this.findById(id);
});

/**
 * Get all questions by a specific creator
 *
 * @param {string} creator - name of creator
 * @returns {Promise<IQuestion[]>} Promise of all questions by the creator
 */
questionSchema.static(
  'getQuestionsByCreator',
  async function (creator: string) {
    return this.find({ creator });
  }
);

/**
 * Add a new question to the database
 *
 * @param {string} creator - name of creator
 * @param {string} name - name of question
 * @param {string} question - question
 * @param {string} option1 - first option
 * @param {string} optionX - second option
 * @param {string} option2 - third option
 * @param {string} correctOption - correct option
 * @param {number} level - level of question
 * @param {string[]} subject - subject of question
 * @param {string} language - language of question
 * @returns {Promise<IQuestion>} Promise of the new question
 */
questionSchema.static(
  'addQuestion',
  async function (
    creator: string,
    name: string,
    question: string,
    option1: string,
    optionX: string,
    option2: string,
    correctOption: string,
    level: number,
    subject: string[],
    language: string
  ) {
    // TODO: Change name of questionModel to something else, possibly "Question"?
    const newQuestion = new questionModel({
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
    });

    return await newQuestion.save();
  }
);

questionSchema.static('deleteQuestionByName', async function (name: string) {
  return this.findOneAndDelete({ name });
});

// Methods (Document functions)

export const questionModel = model<IQuestion, QuestionModel>(
  'question',
  questionSchema
);

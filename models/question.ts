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
}

const questionSchema = new Schema<IQuestion, QuestionModel, IQuestionMethods>({
  creator: { type: String, required: true },
  name: { type: String, required: true },
  question: String,
  option1: String,
  optionX: String,
  option2: String,
  correctOption: String, // Referera till en option ovan
  date: Date,
  level: Number,
  subject: [{ type: String, ref: 'subjects' }],
  language: String
});

// Statics (Model functions)

//  TODO Ska denna funktion vara async?
questionSchema.static('getQuestions', function () {
  return this.find;
});

// Methods (Document functions)

export const questionModel = model<IQuestion>('question', questionSchema);

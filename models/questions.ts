import { model, Model, Schema, Query } from 'mongoose';

// TODO: Enter valid scheme

interface IQuestions {
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

interface IQuestionsMethods {}

interface QuestionsModel extends Model<IQuestions, {}, IQuestionsMethods> {
  //  TODO är detta rätt return type? Eller ska det vara ett Query<> objekt?
  getQuestions(): Promise<IQuestions[]>;
}

const questionsSchema = new Schema<
  IQuestions,
  QuestionsModel,
  IQuestionsMethods
>({
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
questionsSchema.static('getQuestions', function () {
  return this.find;
});

// Methods (Document functions)

export const questionsModel = model<IQuestions>('questions', questionsSchema);

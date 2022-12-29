import { model, Model, Schema } from 'mongoose';

interface ISubject {
  name: string;
  subjectCode: string;
  description: string;
}

interface ISubjectMethods {}

interface SubjectModel extends Model<ISubject, {}, ISubjectMethods> {}

const subjectSchema = new Schema<ISubject, SubjectModel, ISubjectMethods>({
  name: String,
  subjectCode: {
    type: String,
    uppercase: true,
    minLength: 3,
    maxLength: 3,
    required: true
  },
  description: String
});

export const subjectModel = model<ISubject, SubjectModel>(
  'subject',
  subjectSchema
);

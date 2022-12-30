import { model, Model, Schema } from 'mongoose';

interface ISubject {
  name: string;
  subjectCode: string;
  description: string;
}

interface ISubjectMethods {}

interface SubjectModel extends Model<ISubject, {}, ISubjectMethods> {
  getSubjects(): Promise<ISubject[]>;
  getSubject(subjectCode: string): Promise<ISubject>;
  addSubject(subject: ISubject): Promise<ISubject>;
  updateSubject(subject: ISubject): Promise<ISubject>;
  deleteSubject(subjectCode: string): Promise<ISubject>;
}

const subjectSchema = new Schema<ISubject, SubjectModel, ISubjectMethods>({
  name: String,
  subjectCode: {
    type: String,
    uppercase: true,
    unique: true,
    minLength: 3,
    maxLength: 3,
    required: true
  },
  description: String
});

subjectSchema.static('getSubjects', function () {
  return this.find({});
});

subjectSchema.static('getSubject', function (subjectCode: string) {
  return this.findOne({ subjectCode });
});

subjectSchema.static('addSubject', async function (subject: ISubject) {
  if (await this.findOne({ subjectCode: subject.subjectCode })) {
    return null;
  }
  return this.create(subject);
});

subjectSchema.static('updateSubject', function (subject: ISubject) {
  return this.findOneAndUpdate({ subjectCode: subject.subjectCode }, subject, {
    new: true
  });
});

subjectSchema.static('deleteSubject', function (subjectCode: string) {
  return this.findOneAndDelete({ subjectCode });
});

export const Subject = model<ISubject, SubjectModel>('subject', subjectSchema);

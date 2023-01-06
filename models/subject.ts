import { model, Model, Schema } from 'mongoose';

/**
 * Typescript interface for subject objects, represents a document in MongoDB.
 */
interface ISubject {
  name: string;
  subjectCode: string;
  description: string;
}

/**
 * Interface for subject instance methods.
 */
interface ISubjectMethods {}

/**
 * Mongoose Model for subject documents, contains definitions for Mongoose statics, instance and document methods.
 */
interface SubjectModel extends Model<ISubject, {}, ISubjectMethods> {
  getSubjects(): Promise<ISubject[]>;
  getSubject(subjectCode: string): Promise<ISubject>;
  addSubject(subject: ISubject): Promise<ISubject>;
  updateSubject(subject: ISubject): Promise<ISubject>;
  deleteSubject(subjectCode: string): Promise<ISubject>;
}

/**
 * Schema for subjects, corresponds to the MongoDB document interface.
 * Contains the Typescript ISubject interface, SubjectModel and ISubjectMethods.
 */
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

// Statics (Model functions)

/**
 * Get all subjects from MongoDB.
 *
 * @returns {Promise<ISubject[]>} Promise of all subjects
 */
subjectSchema.static('getSubjects', function () {
  return this.find({});
});

/**
 * Get a subject by subjectCode from MongoDB.
 *
 * @param {string} subjectCode of the subject
 * @returns {Promise<ISubject>} Promise of the subject
 */
subjectSchema.static('getSubject', function (subjectCode: string) {
  return this.findOne({ subjectCode });
});

/**
 * Add a subject to MongoDB.
 *
 * @param {ISubject} subject to add
 * @returns {Promise<ISubject>} Promise of the added subject
 */
subjectSchema.static('addSubject', async function (subject: ISubject) {
  try {
    return await this.create(subject);
  } catch (error) {
    console.log(error);
    return null;
  }
});

/**
 * Update a subject in MongoDB.
 *
 * @param {ISubject} subject to update
 * @returns {Promise<ISubject>} Promise of the new quiz
 */
subjectSchema.static('updateSubject', function (subject: ISubject) {
  return this.findOneAndUpdate({ subjectCode: subject.subjectCode }, subject, {
    new: true
  });
});

/**
 * Delete a subject by subjectCode in MongoDB.
 *
 * @param {string} subjectCode of the subject to delete
 * @returns {Promise<ISubject>} Promise of the deleted subject
 */
subjectSchema.static('deleteSubject', function (subjectCode: string) {
  return this.findOneAndDelete({ subjectCode });
});

export const Subject = model<ISubject, SubjectModel>('subject', subjectSchema);

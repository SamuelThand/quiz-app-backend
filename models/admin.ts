import { model, Model, Schema } from 'mongoose';

/**
 * Typescript interface for admin objects, represents a document in MongoDB.
 */
interface IAdmin {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  date?: Date;
  age?: number;
  sex?: string;
}

/**
 * Interface for admin instance methods.
 */
interface IAdminMethods {}

/**
 * Mongoose Model for admin documents, contains definitions for Mongoose statics, instance and document methods.
 */
interface AdminModel extends Model<IAdmin, {}, IAdminMethods> {
  getAdmins(): Promise<IAdmin[]>;
  getAdminByUsername(userName: string): Promise<IAdmin>;
  addAdmin(admin: IAdmin): Promise<IAdmin>;
  updateAdmin(admin: IAdmin): Promise<IAdmin>;
  deleteAdminByUsername(userName: string): Promise<IAdmin>;
}

/**
 * Schema for admins, corresponds to the MongoDB document interface.
 * Contains the Typescript ISubject interface, SubjectModel and ISubjectMethods.
 */
const adminSchema = new Schema<IAdmin, AdminModel, IAdminMethods>({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now },
  age: Number,
  sex: String
});

// Statics (Model functions)

/**
 * Get all admins from MongoDB.
 *
 * @returns {Promise<IAdmin[]>} Promise of all admins
 */
adminSchema.static('getAdmins', function () {
  return this.find({});
});

/**
 * Get an admin by username from MongoDB.
 *
 * @param {string} username of the admin
 * @returns {Promise<IAdmin>} Promise of the admin
 */
adminSchema.static('getAdminByUsername', function (userName: string) {
  return this.findOne({ userName });
});

/**
 * Add an admin to MongoDB.
 *
 * @param {IAdmin} admin to add
 * @returns {Promise<IAdmin>} Promise of the added admin
 */
adminSchema.static('addAdmin', async function (admin: IAdmin) {
  try {
    return await this.create(admin);
  } catch (error) {
    console.log(error);
    return null;
  }
});

/**
 * Update an admin in MongoDB.
 *
 * @param {IAdmin} admin to update
 * @returns {Promise<IAdmin>} Promise of the new quiz
 */
adminSchema.static('updateAdmin', function (admin: IAdmin) {
  return this.findOneAndUpdate({ userName: admin.userName }, admin, {
    new: true
  });
});

/**
 * Delete an admin by username in MongoDB.
 *
 * @param {string} username of the admin to delete
 * @returns {Promise<IAdmin>} Promise of the deleted admin
 */
adminSchema.static('deleteAdminByUsername', function (userName: string) {
  return this.findOneAndDelete({ userName });
});

export const Admin = model<IAdmin, AdminModel>('admin', adminSchema);

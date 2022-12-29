import { model, Model, Schema } from 'mongoose';

interface IAdmins {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  date?: Date;
  age?: Number;
  sex?: Boolean;
}

interface IAdminsMethods {}

interface AdminsModel extends Model<IAdmins, {}, IAdminsMethods> {}

const adminsSchema = new Schema<IAdmins, AdminsModel, IAdminsMethods>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: Date,
  age: Number,
  sex: Boolean
});

// Statics (Model functions)

// Methods (Document functions)

export const adminsModel = model<IAdmins>('admins', adminsSchema);

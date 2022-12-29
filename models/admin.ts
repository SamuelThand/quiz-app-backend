import { model, Model, Schema } from 'mongoose';

interface IAdmin {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  date?: Date;
  age?: Number;
  sex?: Boolean;
}

interface IAdminMethods {}

interface AdminModel extends Model<IAdmin, {}, IAdminMethods> {}

const adminSchema = new Schema<IAdmin, AdminModel, IAdminMethods>({
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

export const adminModel = model<IAdmin>('admin', adminSchema);
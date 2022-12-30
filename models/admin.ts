import { model, Model, Schema } from 'mongoose';

interface IAdmin {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  date?: Date;
  age?: number;
  sex?: string;
}

interface IAdminMethods {}

interface AdminModel extends Model<IAdmin, {}, IAdminMethods> {
  getAdmins(): Promise<IAdmin[]>;
  getAdminByUsername(userName: string): Promise<IAdmin>;
  addAdmin(admin: IAdmin): Promise<IAdmin>;
  updateAdmin(admin: IAdmin): Promise<IAdmin>;
  deleteAdminByUsername(userName: string): Promise<IAdmin>;
}

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

adminSchema.static('getAdmins', function () {
  return this.find({});
});

adminSchema.static('getAdminByUsername', function (userName: string) {
  return this.findOne({ userName });
});

adminSchema.static('addAdmin', async function (admin: IAdmin) {
  try {
    return await this.create(admin);
  } catch (error) {
    console.log(error);
    return null;
  }
});

adminSchema.static('updateAdmin', function (admin: IAdmin) {
  return this.findOneAndUpdate({ userName: admin.userName }, admin, {
    new: true
  });
});

adminSchema.static('deleteAdminByUsername', function (userName: string) {
  return this.findOneAndDelete({ userName });
});

// Methods (Document functions)

export const Admin = model<IAdmin, AdminModel>('admin', adminSchema);

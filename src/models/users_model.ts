import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
  _id?: string;
  refreshToken?: string[];
  is_doctor?: boolean;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,   
    required: true,
  },
  refreshToken: {
    type: [String],
    default: [],
  },
  is_doctor: {
    type: Boolean,
    default: false,
  }
});

const userModel = mongoose.model<IUser>("Users", userSchema);

export default userModel;
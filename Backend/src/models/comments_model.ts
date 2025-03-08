import mongoose from "mongoose";

export interface IComments {
  comment: string;
  owner: string;
  postId: string;
  isOwnerDoctor: boolean;
}
const commentsSchema = new mongoose.Schema<IComments>({
  comment: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  isOwnerDoctor: {
    type: Boolean,
    required: true,
  },
});

const commentsModel = mongoose.model<IComments>("Comments", commentsSchema);

export default commentsModel;
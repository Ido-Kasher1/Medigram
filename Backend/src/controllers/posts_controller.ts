import postModel, { IPost } from "../models/posts_model";
import { Request, Response } from "express";
import BaseController from "./base_controller";
import mongoose from "mongoose";

class PostsController extends BaseController<IPost> {
  constructor() {
    super(postModel);
  }

  async create(req: Request, res: Response) {
    const userId = req.params.userId;
    const post = {
      ...req.body,
      owner: userId,
    };
    req.body = post;
    super.create(req, res);
  }

  async updatePostFile(req: Request, res: Response) {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const userId = req.params.userId;
    const postId = req.body.postId; // Assuming postId is sent in the body
    const base = `${process.env.DOMAIN_BASE}:${process.env.PORT}/`;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      res.status(400).json({ message: "Invalid postId" });
      return;
    }

    try {
      const updatedPost = await postModel.findByIdAndUpdate(
        postId,
        { $set: { imageName: req.file.filename } },
        { new: true }
      );

      if (!updatedPost) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      res.status(200).send({ url: `${base}public/posts/${userId}/${req.file.filename}` });
      console.log(updatedPost)
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new PostsController();

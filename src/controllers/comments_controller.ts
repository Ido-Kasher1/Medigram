import commentsModel, { IComments } from "../models/comments_model";
import { Request, Response } from "express";
import BaseController from "./base_controller";
import postModel from "../models/posts_model";

class CommentsController extends BaseController<IComments>{
    constructor() {
        super(commentsModel);
    }
    async create(req: Request, res: Response) {
        const postId = req.params.postId;
        const post = await postModel.findById(postId);
        if (!post) {
            res.status(404).send("post not found");
        }
        const comment = {
            ...req.body,
        }
        req.body = comment;
        super.create(req, res);
    }

    async getAllCommentsByPostId(req: Request, res: Response) {
        const postId = req.params.postId;
        const comments = await commentsModel.find({ postId });
        res.status(200).json(comments);
    }
}

export default new CommentsController();
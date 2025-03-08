import userModel, { IUser }  from "../models/users_model";
import { Request, Response } from "express";
import BaseController from "./base_controller";

class UsersController extends BaseController<IUser> {
    constructor() {
        super(userModel);
    }
    async isDoctor(req: Request, res: Response) {
        console.log(req.params.userId)
        const user = await userModel.findById(req.params.userId);
        if (!user) {
            res.status(404).send("user not found");
        }
        res.status(200).json(user?.isDoctor);
    }

}

export default new UsersController();
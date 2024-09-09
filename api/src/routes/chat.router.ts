import { Router } from "express";
import { promptChat } from "../controllers/chat.controller";

const chatRouter = Router();

chatRouter.post('/', promptChat);

export default chatRouter
import express from "express";
import { getUser, getUsers, removeUser } from "../controllers/user.js";

const router = express.Router();

router.get('/getUser', getUser);
router.get('/getAllUsers', getUsers);
router.post('/removeUser', removeUser);


export default router
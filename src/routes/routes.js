import { Router } from "express";
import {router as userRouter} from  '../users/users.route.js';
import {router as repairRouter} from '../repairs/repairs.route.js';

export const router = Router()

//lo que coloque aca se va a concatenar con /api/v1
router.use('/users',userRouter)
router.use('/repairs',repairRouter)
import { Router } from "express";
import {router as userRouter} from  '../modules/users/users.route.js';
import {router as repairRouter} from '../modules/repairs/repairs.route.js';
import { router as authRouter } from "../auth/auth.route.js"
import { protect } from '../auth/auth.middleware.js';


export const router = Router()

//lo que coloque aca se va a concatenar con /api/v1

//router.use(protect)
router.use('/users',userRouter)
router.use('/repairs',repairRouter)
router.use('/user',authRouter)
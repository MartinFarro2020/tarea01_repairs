import { Router } from 'express';

import {
    createRepair,
    findOneRepair,
    findAllRepairs,
    updateRepair,
    deleteRepair,
} from './repairs.controller.js';

export const router = Router()

router
 .route("/")
 .get(findAllRepairs)
 .post(createRepair)

router
 .route("/:id")
 .get(findOneRepair)
 .patch(updateRepair)
 .delete(deleteRepair)
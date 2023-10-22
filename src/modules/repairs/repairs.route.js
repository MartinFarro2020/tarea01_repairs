import { Router } from 'express';

import {
    createRepair,
    findOneRepair,
    findAllRepairs,
    updateRepair,
    deleteRepair,
} from './repairs.controller.js';

import { validExistRepair } from './repairs.middleware.js';
import { protect } from '../../auth/auth.middleware.js';

export const router = Router()

router
 .route("/")
 .get(findAllRepairs)
 .post(createRepair)


router.use('/:id',validExistRepair)


router
 .route("/:id")
 .get(findOneRepair)
 .patch(updateRepair)
 .delete(deleteRepair)
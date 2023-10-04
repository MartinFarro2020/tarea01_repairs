import { Router } from 'express';
import { createRepair } from './repairs.controller.js';
import { findAllRepairs } from './repairs.controller.js';
import { deleteRepair } from './repairs.controller.js'
import { updateRepair } from './repairs.controller.js'

export const router = Router()


router.route("/").post(createRepair)
router.route("/").get(findAllRepairs)
router.route("/:id").delete(deleteRepair)
router.route("/:id").patch(updateRepair)
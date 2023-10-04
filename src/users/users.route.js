import { Router } from 'express'

import {
    findAllUsers,
    createUser,
    findOneUsers,
    updateUser,
    deleteUser
} from './users.controller.js'

export const router = Router();

//init features

//todo->Esta es otra forma de definir las rutas
router
 .route("/")
 .get(findAllUsers)
 .post(createUser)

router
 .route("/:id")
 .get(findOneUsers)
 .patch(updateUser)
 .delete(deleteUser)


//rutas
//endpoint 1: obtener todos los usuarios
//router.get("/users", findAllUsers);

//endpoint 2: crear un nuevo usuario
//router.post("/users", createUser);

//endpoint 3: Obtener un usuario dado su Id
//router.get("/users/:id",findOneUsers);

//endpoint 4: Actualizar la informacion de un usuario

//router.patch("/users/:id",updateUser);

//endpoint 5: eliminar la informacion de un usuario

//router.delete("/users/:id",deleteUser);


//end features



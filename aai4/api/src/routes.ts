import { Router } from "express";
import { alterUserControl, createUserControl, deleteUserControl, listUsersControl } from "./controllers/userController";
import { alterTaskcontrol, createTaskControl, deleteTaskControl, listAllTasksControl } from "./controllers/taskController";

const router = Router()

//user routes
router.post('/createUser/:id_admin', createUserControl)
router.put('/alterUser/', alterUserControl)
router.get('/getAllUsers/:id_admin', listUsersControl)
router.delete('/deleteUser/:id', deleteUserControl)

//tasks routes
router.post('/createTask', createTaskControl)
router.get('/listAllTasks', listAllTasksControl)
router.delete('/deleteTask/:id', deleteTaskControl)
router.put('/alterTask', alterTaskcontrol)

export default router
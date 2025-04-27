import express from 'express'
const router = express.Router();
import tokenVerification from '../Middleware/tokenVerification.mjs'
import {getAlltask,createTask,deleteTask} from '../controller/taskController.mjs'


router.get('/', tokenVerification ,getAlltask)
router.post('/', tokenVerification,createTask)
router.delete('/:id', tokenVerification,deleteTask)

export default router
const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const tasksController = require('../controllers/tasks-controller');

router.get('/user/:uid',tasksController.getTasksByUserId);

router.post('/',check('title').not().isEmpty(),tasksController.createTask);

router.patch('/:tid',[check('title').not().isEmpty(),check('isCompleted').not().isEmpty()],tasksController.updateTask);

router.delete('/:tid',tasksController.deleteTask);

module.exports = router;
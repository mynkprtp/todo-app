const { validationResult } = require("express-validator");
const Task = require("../models/task");
const HttpError = require('../models/HttpError');

const getTasksByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let tasks;
  try {
    tasks = await Task.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("Fetching Tasks Failed, please try again", 500);
    return next(error);
  }
  if(tasks.length===0){
    const error = new HttpError('No tasks, Add new task',404);
    return next(error);
  }
  res.json({ tasks: tasks.map((task) => task.toObject({ getters: true })) });
};

const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data",
      422
    );
    return next(error);
  }
  const { title, creator } = req.body;
  const todayDate = new Date();
  const createdTask = new Task({
    title,
    dateAdded: todayDate,
    isCompleted: false,
    creator,
  });
  
  let user;
  try{
    user = await User.findById(req.userData.userId);
  } catch(err) {
    const error= new HttpError('Creating Task Failed, Please Try again',500);
    return next(error);
  }

  if(!user) {
    const error = new HttpError('Could not find a user for provided UserId',404);
    return next(error);
  }


  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTask.save({session:sess});
    user.tasks.push(createdTask);
    await user.save({session:sess});
    await sess.commmitTransaction();
  } catch (err) {
    const error = new HttpError("Creating Place Failed", 500);
    return next(error);
  }

  res.status(201).json({ task: createdTask.toObject({getters:true}) });
};

const updateTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data",
      422
    );
    return next(error);
  }
  const { title, isCompleted } = req.body;
  const taskId = req.params.tid;

  let task;
  try {
    task = await Task.findById(taskId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update task",
      500
    );
    return next(error);
  }

  task.title = title;
  task.isCompleted = isCompleted;

  try {
    await task.save();
  } catch (err) {
    const error = new HttpError("Updating task failed, please try again", 500);
    return next(error);
  }
  res.json({ task });
};

const deleteTask = async (req, res, next) => {
  const taskId = req.params.tid;
  let task;
  try {
    task = await Task.findById(taskId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not delete the place",
      500
    );
    return next(error);
  }

  if(!task) {
    const error = new HttpError('Could not find a place for the provided id',404);
    return next(error);
  }

  if(task.creator.id !== req.userData.userId){
    const error = new HttpError('You are not authorized to perform this operation',403);
    return next(error);
  }

};

module.exports = {
  getTasksByUserId,
  createTask,
  updateTask,
  deleteTask,
};

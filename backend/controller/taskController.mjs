import express from 'express'
import Task from'../models/user/task.mjs';



const getAlltask = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'username'); 
    res.json(tasks);
    console.log(tasks)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
    console.log(err)
  }
};


const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const newTask = new Task({ title, description, assignedTo });
    await newTask.save();
    res.status(201).json(newTask);
    console.log(newTask)
  } catch (err) {
    res.status(400).json({ message: 'Error creating task' });
  }
};


const deleteTask= async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting task' });
  }
};

export {getAlltask,createTask,deleteTask}




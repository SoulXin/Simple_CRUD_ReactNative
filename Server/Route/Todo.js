const express = require('express');
const router = express.Router();
const todo_Controller = require('../Controller/Todo');

// Admin
router.post('/add_todo',todo_Controller.add_todo);
router.get('/show_todo/:type/:user_id',todo_Controller.todo_list);
router.put('/complete_todo/:id',todo_Controller.complete_todo);
router.delete('/delete_todo/:id',todo_Controller.delete_todo);

module.exports = router;
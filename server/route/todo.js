const express = require('express');
const router = new express.Router();
router.use(express.json({}));
const todoController=require('../controller/todo');


router.post('/',todoController.addTodo);
router.get('/',todoController.viewTodo);
router.put('/:id',todoController.updateTodo);
router.delete('/:id',todoController.deleteTodo);

module.exports = router;

const express = require('express');
const todoRoutes = express.Router();

// Require todo model in our routes module
let Todo = require('./todo.model');

// Defined store route
todoRoutes.route('/add').post(function (req, res) {
  let todo = new Todo(req.body);
  todo.save()
    .then(todo => {
      res.status(200).json({'todo': 'todo in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
todoRoutes.route('/').get(function (req, res) {
    Todo.find(function(err, todos){
    if(err){
      console.log(err);
    }
    else {
      res.json(todos);
    }
  });
});

// Defined edit route
todoRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  todo.findById(id, function (err, todo){
      res.json(todo);
  });
});

//  Defined update route
todoRoutes.route('/update/:id').post(function (req, res) {
    Todo.findById(req.params.id, function(err, todo) {
    if (!todo)
      res.status(404).send("data is not found");
    else {
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.status = req.body.status;

        todo.save().then(todo => {
          res.json('Successfully Updated');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
todoRoutes.route('/delete/:id').get(function (req, res) {
    Todo.findByIdAndRemove({_id: req.params.id}, function(err, todo){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = todoRoutes;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Todos
let Todo = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: String
  }
},{
    collection: 'todo'
});

module.exports = mongoose.model('todo', Todo);
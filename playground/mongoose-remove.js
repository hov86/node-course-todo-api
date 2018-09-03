const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove -> deprecated (use deleteOne or deleteMany)

// Todo.deleteMany({}).then((result) => console.log(result));

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove(); -> deprecated (use findOneAndDelete or findByIdAndDelete)

Todo.findByIdAndDelete('5b8cbc8d295cd34667a364d7').then((todo) => {
    console.log(todo);
});
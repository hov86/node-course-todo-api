// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const assert = require('assert');
const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // insert new doc into Users (name, age, location)
    // db.collection('Users').insertOne({
    //     name: 'John',
    //     age: 32,
    //     location: 'California'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to add user', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Sherlock Holmes',
    //     age: 'Too old',
    //     location: 'London'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to add user', err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    assert.equal(null, err);
    client.close();
});
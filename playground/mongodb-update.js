const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b838ac687cfd4466708399a')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    // Update name and increment age by 1

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b831edd76668249e4cae031')
    }, {
        $set: {
            name: "Jeff"
        },
        $inc: {
            age: 1
        }

    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // client.close();
});
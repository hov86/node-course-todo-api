const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

let users = [{
    email: 'sjobs@apple.com',
    password: 'Wozniak01'
}, {
    email: 'bgates@microsoft.com',
    password: 'Balmer01'
}];

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Create a test todo';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('Get /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non-object IDs', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });
});

describe('Delete /todos/:id', () => {
    it('should remove a todo', (done) => {
        let hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return a 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        let hexId = todos[0]._id.toHexString();
        let text = 'Updated first test todo';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
                expect(res.body.completed).toBe(true);
                expect(res.body.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        let hexId = todos[1]._id.toHexString();
        let text = 'Updated second test todo';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text,
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
                expect(res.body.completed).toBe(false);
                expect(res.body.completedAt).toNotExist();
            })
            .end(done);
    });
});


describe('GET /users', () => {
    it('should get all users', (done) => {
        request(app)
            .get('/users')
            .expect(200)
            .expect((res) => {
                expect(res.body.users.length).toBe(1);
            })
            .end(done);
    });
});
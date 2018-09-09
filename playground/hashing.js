const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc';
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

let hashedPassword = '$2a$10$vp4w5ZXAnOIZWLb.jXNNG.hsCY99U6KysoZPyGCBmS.C.7u1iAeOS';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
})
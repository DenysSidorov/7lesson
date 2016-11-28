var crypto = require('crypto');

var mongoose = require('../config/mongo-connect');
var Schema = mongoose.Schema;

var schemaUser = new Schema({
    username: {
        type: String,
        inique: true,
        required: true
    },
    hashedPassword:{
        type: String,
        required: true
    },
    salt:{
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    }
});
schemaUser.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};


/*Виртуальное поле, которое не сохраяется в  БД но можем вызывать get/set */
schemaUser.virtual('password')
.set(function (password) {
    this._plainPassword = password;
    this.salt = Math.random()+'';
    this.hashedPassword = this.encryptPassword(password); // salt = (salt + password)
})
.get(function () {
    return this._plainPassword;
});

schemaUser.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

exports.User = mongoose.model('User', schemaUser);
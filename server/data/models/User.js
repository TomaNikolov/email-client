var mongoose = require('mongoose');
var encryption = require('../../services/encryption');

module.exports.init = function () {
    var userSchema = mongoose.Schema({
        username: {
            type: String,
            require: '{PATH} is required',
            unique: true
        },
        salt: String,
        hashPass: String,
        roles: [String],
        token: String,
        email: {
           name:{ type: String,
            require: '{PATH} is required'
           },
            password:{
                type: String,
                require: '{PATH} is required'
            }
        },
        accountType:{
            enum:['POP3', 'IMAP']
        },
        incomingMail: {
            server: {
                type: String,
                require: '{PATH} is required'
            },
            port: {
                type: Number,
                require: '{PATH} is required'
            }
        },
        outgoingMail: {
            server: {
                type: String,
                require: '{PATH} is required'
            },
            port: {
                type: Number,
                require: '{PATH} is required'
            }
        }
    });

    userSchema.method({
        authenticate: function (password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            } else {
                return false;
            }
        }
    });

    mongoose.model('user', userSchema);
};

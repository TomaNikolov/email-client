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
        token: String,
        settings: {
            email: {
                name: {
                    type: String,
                    require: '{PATH} is required'
                },
                password: {
                    type: String,
                    require: '{PATH} is required'
                }
            },
            accountType: {
                type: String,
                require: '{PATH} is required'
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

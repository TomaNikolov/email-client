var UsersController = require('./UsersController');
var AdminController = require('./AdminController');
var MailController = require('./MailController');

module.exports = {
    users: UsersController,
    admin: AdminController,
    mail: MailController,
};
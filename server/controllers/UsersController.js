var users = require('../services/users');

var CONTROLLER_NAME = 'users';

module.exports = {
    getLogin: function (req, res) {
        res.render(`${CONTROLLER_NAME}/login`);
    },
    getRegister: function (req, res) {
        res.render(`${CONTROLLER_NAME}/register`);
    },
    postRegister: function (req, res) {
        var newUserData = req.body;
        console.log(newUserData);
        users.create(newUserData)
            .then(function (message) {
                req.session.success = message;
                res.redirect('/');
            })
            .catch(function (err) {
                req.session.error = 'Failed to register new user.' +
                    ' Perhaps already registered.' +
                    '\r\nerror: ' + err.errmsg;
                res.redirect('/');
            })
    },
    getSettings: function(req, res){
        res.render(`${CONTROLLER_NAME}/settings`);
    },
    postSettings: function(req, res){
       var user = req.user;
       var settings = req.body;

        users.setSettings(user._id, settings)
            .then(function(user){
                res.redirect('/');
            })
        .catch(function(err){
            res.redirect('/settings')
        })
    }
};

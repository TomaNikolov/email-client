var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function (app) {
    app.get('/', auth.isAuthenticated, function (req, res) {
        res.render('index');
    });

    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.postRegister);

    // USERS
    app.post('/login', auth.login);
    app.get('/login', controllers.users.getLogin);

    app.get('/logout', auth.isAuthenticated, auth.logout);

    app.get('*', auth.isAuthenticated, function (req, res) {
        res.redirect('/');
    });
};
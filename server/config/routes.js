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
    app.post('/api/sendmail',auth.isAuthenticated, controllers.mail.sendMail);

    app.get('/api/getMailboxes',auth.isAuthenticated, controllers.mail.getMailboxes);
    app.get('/api/getMailboxMessages',auth.isAuthenticated, controllers.mail.getMailboxMessages);
    app.get('/api/getMessage',auth.isAuthenticated, controllers.mail.getMessage);

    app.get('/settings', auth.isAuthenticated, controllers.users.getSettings);
    app.post('/settings',auth.isAuthenticated, controllers.users.postSettings);
    //app.get('*', auth.isAuthenticated, function (req, res) {
    //    res.redirect('/');
    //});
};
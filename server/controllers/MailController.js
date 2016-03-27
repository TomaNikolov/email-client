var smtpMailClient = require('../services/smtp-mail-client');
var imapMailClient = require('../services/imap-mail-client');

module.exports = {
    sendMail: function (req, res) {
        var mailData = req.body;
        var user = req.user._doc;

        smtpMailClient.send(mailData, user.settings)
        .then(function(msg){
            console.log(msg);
            res.json({msg: msg});
        });
    },
    getMailboxes: function(req, res){
        var user = req.user._doc;
        imapMailClient.getMailboxes(user.settings)
        .then(function(mailboxes){
            res.json({result: mailboxes});
        })
        .catch(function(err){
            res.json({err: err});
        });
    },
    getMailboxMessages: function (req, res) {
        var user = req.user._doc;
        var path = req.query.path;

        imapMailClient.getMailboxMessages(path, user.settings)
            .then(function(mailboxMessages){
                res.json({result: mailboxMessages});
            })
            .catch(function(err){
                res.json({err: err});
            });
    },
    getMailboxChildren: function (req, res) {
        var user = req.user._doc;
        var path = req.query.path;

        imapMailClient.getMailboxChildren(path, user.settings)
            .then(function(mailboxChildren){
                res.json({result: mailboxChildren});
            })
            .catch(function(err){
                res.json({err: err});
            });
    },
    getMessage: function (req, res) {
        var user = req.user._doc;
        var path = req.query.path;
        var uid = req.query.uid;

        imapMailClient.getMessage(path, uid, user.settings)
            .then(function(mailboxMessages){
                res.json({result: mailboxMessages});
            })
            .catch(function(err){
                res.json({err: err});
            });
    }
};
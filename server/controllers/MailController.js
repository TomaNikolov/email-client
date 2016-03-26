var mailClient = require('../utils/mail/mail-client');
var imapMailClient = require('../services/imap-mail-client');

var CONTROLLER_NAME = 'mail';

module.exports = {
    sendMail: function (req, res) {
        var mailData = req.body;

        mailClient.send(mailData.recipient, mailData.text)
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
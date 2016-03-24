var mailClient = require('../utils/mail/mail-client');

var CONTROLLER_NAME = 'mail';

module.exports = {
    sendMail: function (req, res) {
        var mailData = req.body;

        mailClient.send(mailData.recipient, mailData.text)
        .then(function(msg){
            console.log(msg);
            res.json({msg: msg});
        });


    }
};
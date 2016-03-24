var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');

var transporter = nodemailer.createTransport(smtpPool({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: 'mailclientapp@gmail.com',
        pass: 'mailclient'
    }
}, {
    from: 'webxserverxplorer@abv.bg',
    headers: {
        'My-Awesome-Header': '123'
    }
}));

module.exports = {
    send: function (to, text) {
        return new Promise(function (resolve, reject) {
            transporter.sendMail({
                from: 'webxserverxplorer@abv.bg',
                to: to,
                subject: '',
                html: text
            }, function (err, message) {
                if (err) {
                    reject(err);
                }

                resolve('Message sent successfully!')
            });
        });
    }
};

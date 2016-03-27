var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');

function getTransporter(settings){
    return nodemailer.createTransport(smtpPool({
        host: settings.outgoingMail.server,
        secure: true,
        port: settings.outgoingMail.port,
        auth: {
            user: settings.email.name,
            pass: settings.email.password
        }
    }, {
        from:  settings.email.name
    }));
}

module.exports = {
    send: function (mailData, settings) {
        return new Promise(function (resolve, reject) {
            var transporter = getTransporter(settings);
            transporter.sendMail({
                from: settings.email.name,
                to: mailData.recipient,
                subject: mailData.subject,
                html: mailData.text
            }, function (err, message) {
                if (err) {
                    reject(err);
                }

                resolve('Message sent successfully!')
            });
        });
    }
};

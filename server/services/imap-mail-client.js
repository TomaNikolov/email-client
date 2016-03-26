var inbox = require('inbox');
var mailParser = require('./mail-parser');

function getClient(settings) {
    return inbox.createConnection(settings.port, settings.incomingMail, {
        secureConnection: true,
        auth: {
            user: settings.email.name,
            pass: settings.email.password
        }
    });
}


module.exports = {
    getMailboxes: function (settings) {
        var client = getClient(settings);

        return new Promise(function (resolve, reject) {
            client.on("connect", function () {
                client.listMailboxes(function (err, mailboxes) {
                    if (err) {
                        reject(err);
                    }

                    client.close();
                    resolve(mailboxes);
                });
            });
        });

        client.connect();
    },
    getMailboxMessages: function (mailboxPath, settings) {
        var client = getClient(settings);

        return new Promise(function (resolve, reject) {
            client.openMailbox(mailboxPath, function (err, info) {
                if (err) {
                    reject(err);
                }

                client.listMessages(0, function (err, messages) {
                    if (err) {
                        reject(err)
                    }

                    resolve(messages)
                });

                client.close();
            });
        });
        client.connect();
    },
    getMessage: function (mailboxPath, uid, settings) {
        var client = getClient(settings);

        return new Promise(function (resolve, reject) {
            client.openMailbox(mailboxPath, function (err, info) {
                if (err) {
                    reject(err);
                }

                var messageStream = client.createMessageStream(uid)
                var data = '';

                messageStream.on('data', function (chunk) {
                    data += chunk;
                });

                messageStream.on('end', function () {
                   mailParser.parse()
                    .then(function(email){
                        resolve(email);
                    })

                });

                client.close();
            });
        });

        client.connect();
    }
};
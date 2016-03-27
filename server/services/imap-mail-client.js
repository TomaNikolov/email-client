var inbox = require('inbox');
var mailParser = require('./mail-parser');

function getClient(settings) {
    return inbox.createConnection(settings.incomingMail.port, settings.incomingMail.server, {
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
        client.connect();
        return new Promise(function (resolve, reject) {
            client.on("connect", function () {
                console.log('connect');
                client.listMailboxes(function (err, mailboxes) {
                    if (err) {
                        reject(err);
                    }

                    for(var i=0, len = mailboxes.length; i<len; i++){
                        if(mailboxes[i].hasChildren){
                            mailboxes[i].listChildren(function(err, children){
                                if(err){
                                    reject(err);
                                }

                                mailboxes[i].children = children;
                            });
                        }
                    }

                    client.close();
                    resolve(mailboxes);
                });
            });
        });
    },
    getMailboxMessages: function (mailboxPath, settings) {
        var client = getClient(settings);
        client.connect();
        return new Promise(function (resolve, reject) {
            client.on("connect", function () {
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
        });
    },
    getMessage: function (mailboxPath, uid, settings) {
        var client = getClient(settings);
        client.connect();

        return new Promise(function (resolve, reject) {
            client.on("connect", function () {
                client.openMailbox(mailboxPath, function (err, info) {
                    if (err) {
                        reject(err);
                    }

                    var messageStream = client.createMessageStream(uid);
                    var data = '';

                    messageStream.on('data', function (chunk) {
                        data += chunk;
                    });

                    messageStream.on('end', function () {
                        client.close();

                        mailParser.parse(data)
                            .then(function (email) {
                                resolve(email);
                            })

                    });
                });
            });
        });
    }
};
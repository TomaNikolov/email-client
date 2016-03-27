var MailParser = require("mailparser").MailParser;

module.exports = {
    parse: function (mail) {
        return new Promise(function (resolve, reject) {
            var mailParser = new MailParser();

            mailParser.write(mail);
            mailParser.end();

            mailParser.on("end", function (mail_object) {
                resolve(mail_object);
            });
        });
    }
};
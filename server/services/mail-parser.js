var MailParser = require("mailparser").MailParser;
var mailparser = new MailParser();

module.exports = {
    parse: function (mail) {
          return new Promise(function (resolve, reject) {
              mailparser.write(mail);
              mailparser.end();

              mailparser.on("end", function(mail_object){
                  resolve(mail_object);
              });

              //mailparser.on("err", function(mail_object){
              //    reject(mail_object);
              //});
          })
    }
};
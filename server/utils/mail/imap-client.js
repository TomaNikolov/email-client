var ImapClient = require('emailjs-imap-client')

var client = new ImapClient('localhost', 143, {
    auth: {
        user: 'testuser',
        pass: 'testpass'
    }
});
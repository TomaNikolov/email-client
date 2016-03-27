(function () {
    'use strict';

    function crypto(cryptoJs) {
        return {
            encode: function (msg) {
                var wordArray = CryptoJS.enc.Utf8.parse(msg);
                return cryptoJs.enc.Base64.stringify(wordArray)
            },
            decode: function (msg) {
                var parsedWordArray = CryptoJS.enc.Base64.parse(msg);
                return parsedWordArray.toString(CryptoJS.enc.Utf8);
            }
        }
    }

    angular.module('myApp.services')
        .factory('crypto', ['CryptoJS', crypto]);
}());


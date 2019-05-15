let cryptico = require("cryptico");
module.exports = function (passPhrase) {
    this.bits = 1024; //2048;
    this.passPhrase = passPhrase;
    this.rsaKey = cryptico.generateRSAKey(this.passPhrase, this.bits);
    this.rsaPublicKey = cryptico.publicKeyString(this.rsaKey);

    this.encrypt = function (message) {
        let result = cryptico.encrypt(message, this.rsaPublicKey);
        return result.cipher;
    };

    this.decrypt = function (message) {
        let result = cryptico.decrypt(message, this.rsaKey);
        return result.plaintext;
    };

    this.getPublicKey = function () {
        return this.rsaPublicKey;
    }
}



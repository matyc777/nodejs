const rsaFunc = require('./rsa');
const localEncryptor = new rsaFunc("text");

module.exports = function (app) {

    app.get('/requestList/:user_id', function(req, res){
        //todo get request list from database by user_id
    });

    app.get('/publicKey', function (req, res) {
        //res.cookie("publicKey", localEncryptor.getPublicKey());
        res.send(localEncryptor.getPublicKey());
    });

    app.post('/authentication', function(req, res) {
        /*let text = "qwerty";
        let enctext = localEncryptor.encrypt(text);
        console.log(enctext);
        console.log(localEncryptor.decrypt(enctext));*/

        if (req.body.login === "nikita" && localEncryptor.decrypt(req.body.password) === "qwerty") res.send("all right");//???
        else res.send("wrong data");
        //todo check for existing user
    });

    app.post('/signup', function(req, res){
        //todo check for existing user

    });

    app.get('*', function(req,res){
        res.sendFile('/home/nikita/WebstormProjects/nodejs/public/index.html');
    });
};
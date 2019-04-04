module.exports = function (app) {

    app.get('/requestList/:user_id', function(req, res){
        //todo get request list from database by user_id
    });

    app.post('/authentication', function(req, res){
        let text = req.body.text;
        //todo check for existing user
        Todo.create(
            //todo try to create new user
        ), function (err) {
            if(err){
                res.send(err);
            }else{
                //todo
            }
        }
    });

    app.post('/signup', function(req, res){
        req.body.text;
        //todo check for existing user

    });

    app.get('*', function(req,res){
        res.sendFile(__dirname + '/tratata/front/index.html');
    });
};
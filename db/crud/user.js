const connection = require('../connection.js');
const mysql = require('mysql');

var User = function (user) {
    this.user = user.user;
};

User.createUser = function create(name, login, password, phone_number) {
    let sql = 'INSERT INTO delivery_service.client (name, login, password, phone_number, role) VALUES (?,?,?,?,?)';
    let insertQuery = mysql.format(sql, [name, login, password, phone_number, 'client']);
    connection.query(insertQuery,
        (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("User added");
        });
};

User.getUser = function get(userId, result) {
    let sql = 'SELECT * FROM delivery_service.client WHERE id=?';
    let selectQuery = mysql.format(sql, [userId]);
    connection.query(selectQuery,
        (err, response) => {
            //console.log(response);
            if (err) {
                console.error(err);
                result(err, null);
            } /*else return response;*/
            result(null, response);
        });
};

User.getUserByLogin = function get(userLogin, result) {
    let sql = 'SELECT * FROM delivery_service.client WHERE login=?';
    let selectQuery = mysql.format(sql, [userLogin]);
    connection.query(selectQuery,
        (err, response) => {
            if (err) {
                console.error(err);
                result(err, null);
            }
            console.log(response);
            result(null, response);
        });
};

User.getAllUsers = function getAll(result) {
    let selectQuery = 'SELECT * FROM delivery_service.client';
    connection.query(selectQuery,
        (err, response) => {
            if (err) {
                console.error(err);
                result(err, null);
            }
            console.log(response);
            result(null, response);
        });
};


User.updateUser = function update(userId, field, value) {
    let sql = 'UPDATE delivery_service.client SET ??=? WHERE id=?';
    let selectQuery = mysql.format(sql, [field, value, userId]);
    connection.query(selectQuery,
        (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("User updated");
        });
};

User.deleteUser = function remove(userId) {
    let sql = 'DELETE FROM delivery_service.client WHERE id=?';
    let deleteQuery = mysql.format(sql, [userId]);
    connection.query(deleteQuery,
        (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("User deleted");
        });
};

module.exports = User;
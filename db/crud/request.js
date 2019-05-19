const connection = require('../connection.js');
const mysql = require('mysql');

var Request = function (request) {
    this.request = request.request;
};

Request.createRequest = function create(point_from, point_to, weight, deadline, client, courier) {
    let sql = 'INSERT INTO delivery_service.request (point_from, point_to, weight, deadline, client, courier) VALUES (?,?,?,?,?,?)';
    let insertQuery = mysql.format(sql, [point_from, point_to, weight, deadline, client, courier]);
    connection.query(insertQuery,
        (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Request added");
        });
};

Request.getRequest = function get(requestId, result) {
    let sql = 'SELECT * FROM delivery_service.request WHERE id=?';
    let selectQuery = mysql.format(sql, [requestId]);
    connection.query(selectQuery,
        (err, response) => {

            if (err) {
                console.error(err);
                result(err, null);
            }
            result(null, response);
        });
};

Request.getRequestByField = function getByField(field, value, result) {
    let sql = 'SELECT * FROM delivery_service.request WHERE ?? = ?';
    let selectQuery = mysql.format(sql, [field, value]);
    connection.query(selectQuery,
        (err, response) => {
            if (err) {
                console.error(err);
                result(err, null);
            }
            result(null, response);
        }
    );
};

Request.getAllRequests = function getAll() {
    let selectQuery = 'SELECT * FROM delivery_service.request';
    connection.query(selectQuery,
        (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(response);
        });
};

Request.updateRequest = function update(requestId, field, value) {
    let sql = 'UPDATE delivery_service.request SET ??=? WHERE id=?';
    let selectQuery = mysql.format(sql, [field, value, requestId]);
    connection.query(selectQuery,
        (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Request updated");
        });
};

Request.deleteRequest = function remove(requestId) {
    let sql = 'DELETE FROM delivery_service.request WHERE id=?';
    let deleteQuery = mysql.format(sql, [requestId]);
    connection.query(deleteQuery,
        (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Request deleted");
        });
};

module.exports = Request;

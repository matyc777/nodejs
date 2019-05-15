const connection = require('../connection.js');
const mysql = require('mysql');

var Courier = function(courier){
    this.courier = courier.courier;
};

Courier.createCourier = function create(name, login, password, phone_number) {
    let sql = 'INSERT INTO delivery_service.courier (name, login, password, phone_number) VALUES (?,?,?,?)';
    let insertQuery = mysql.format(sql,[name, login, password, phone_number]);
    connection.query(insertQuery,
        (err, response) => {
            if(err) {
                console.error(err);
                return;
            }
            console.log("Courier added");
        });
};

Courier.getCourier = function get(courierId) {
    let sql = 'SELECT * FROM delivery_service.courier WHERE id=?';
    let selectQuery = mysql.format(sql, [courierId]);
    connection.query(selectQuery,
        (err, response) => {
            if(err) {
                console.error(err);
                return;
            }
            console.log(response);
        });
};

Courier.getAllCouriers = function getAll() {
    let selectQuery = 'SELECT * FROM delivery_service.courier';
    connection.query(selectQuery,
        (err, response) => {
            if(err) {
                console.error(err);
                return;
            }
            console.log(response);
        });
};


Courier.updateCourier = function update(courierId, field, value) {
    let sql = 'UPDATE delivery_service.courier SET ??=? WHERE id=?';
    let selectQuery = mysql.format(sql, [field, value, courierId]);
    connection.query(selectQuery,
        (err, response) => {
            if(err) {
                console.error(err);
                return;
            }
            console.log("Courier updated");
        });
};

Courier.deleteCourier = function remove(courierId) {
    let sql = 'DELETE FROM delivery_service.courier WHERE id=?';
    let deleteQuery = mysql.format(sql, [courierId]);
    connection.query(deleteQuery,
        (err, response) => {
            if(err) {
                console.error(err);
                return;
            }
            console.log("Courier deleted");
        });
};

module.exports = Courier;
'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/todoListController');

    // todoList Routes
    app.route('/mesures')
        .get(todoList.list_all_mesures)
        .post(todoList.create_a_mesure);


    app.route('/mesure/:mesureId')
        .get(todoList.details)
        .put(todoList.update_a_mesure)
        .delete(todoList.delete_a_mesure);
};
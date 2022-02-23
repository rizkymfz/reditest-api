'use strict';

module.exports = function(app) {
    var controller = require('./controller');

    app.route('/')
        .get(controller.index);
        
    app.route('/orders')
        .get(controller.orders);

    app.route('/users/:id')
        .get(controller.users);

    app.route('/register')
        .post(controller.register);
    
    app.route('/login')    
        .post(controller.login);
};
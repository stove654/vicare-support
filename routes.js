/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {
    app.use('/auth', require('./auth'));
    app.use('/api/users', require('./api/user'));
    app.use('/api/calendars', require('./api/calendar'));
    app.use('/api/things', require('./api/thing'));
    app.use('/api/questions', require('./api/question'));
    app.use('/api/professionals', require('./api/professional'));

    app.route('/:url(api|auth)/*')
        .get(function (req, res) {
            res.json({
                message: 'Hello!!!'
            })
        });

    app.route('/*')
        .get(function( req, res) {
            res.json({
                message: 'Hello!!!'
            })
        });
};

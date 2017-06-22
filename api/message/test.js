var gcm = require('node-gcm');
var sender = new gcm.Sender('AIzaSyAgGn78cOQGWENJ1VY-Xn4QGCxxDa8zaCM');

var message = new gcm.Message({
    notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
    }
});

sender.send(message, { registrationTokens: ['c3YB950cZpU:APA91bHkfCZgnTz0doHSuoSRh50BvDwtPRra0JH-eS0jBkHwPH9rPO_TmegfYYuHDwUSXkP1M6E_jJmKyDg68J1vNZfXmaH8J3pvEfgxf92XGJmT3gzaVe-koSVDq0n6OsN0JWP2TbkN'] }, function (err, response) {
    if (err) console.error('err', err);
    else console.log('done', response);
});
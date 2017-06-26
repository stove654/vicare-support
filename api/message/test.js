var gcm = require('node-gcm');
var sender = new gcm.Sender('AIzaSyAgGn78cOQGWENJ1VY-Xn4QGCxxDa8zaCM');

var message = new gcm.Message({
    notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
    }
});

sender.send(message, { registrationTokens: ['eI0SFTOW5RA:APA91bHNCM4Tlk_LnkmkrMV2e_egQjfUhrW8SZhWp325pgKfTBOL9H4suylZtx1qMbYY5HeprbRW5Mr4SRRpICI3qtaDe-4v4Essvo-QXqNa30hqcVUX2lS1Qvh5j1LGAtIOYrodjR6m'] }, function (err, response) {
    if (err) console.error('err', err);
    else console.log('done', response);
});
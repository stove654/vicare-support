var gcm = require('node-gcm');
var sender = new gcm.Sender('AIzaSyAgGn78cOQGWENJ1VY-Xn4QGCxxDa8zaCM');

var message = new gcm.Message({
    notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
    }
});

sender.send(message, { registrationTokens: ['dNQVf1sifyM:APA91bHN7-Y8qVejeFH6LthuCspW8OnLHgczcY5S4uiRYrqGA8mAjbOji94E1LoLoVW9hjz1mwbcLQQHg6VQCwFRerj1A5A3Yq_dFa3JFTrgN7RE7tCEY_HFq8sNfNUGcbETL5bb-_70'] }, function (err, response) {
    if (err) console.error('err', err);
    else console.log('done', response);
});
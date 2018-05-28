var express = require('express');
var webpush = require('web-push');
var bodyParser = require('body-parser');
var path = require('path');

const app = express();

//set static path
app.use(express.static(path.join(__dirname, 'Client')));

//use body-parser
app.use(bodyParser.json());

//now we create a set of Vapid Keys. Infact Vapid key defines a handshake between our PWA(progressive web app) and the push service. 
//togenerate this keys, we have to navigate to the web-push folder in the node_module folder
const publicVapidKey = 'BMpKOcx38h4BlUyO76KT2FRcs050LcY5MOsC7WNYHskhGrK1ilM6a-3IHC9UTHa-Xnq9PV3seD3yb6C0cJhsEK8';
const privateVapidKey = 'qNxv7vdZqpOIsgNYdOwhCBq1I3RSUZfOlxTm04SYHII';

//set Vapid Details
webpush.setVapidDetails('mailto:example@yourdomain.org', publicVapidKey, privateVapidKey);

//subscribe Route(this is what we get from the client)
app.post('/subscribe', (req, res) => {
    //Get push Subscription object
    var subscription = req.body;

    //send a 201 status
    res.status(201).json({});

    //create payload
    const payload = JSON.stringify({
        title: 'Push Test'
    });

    //pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => console.log(err));

});

const port = 5000;
app.listen(port, () => console.log(`Server running on port: ${port}`));
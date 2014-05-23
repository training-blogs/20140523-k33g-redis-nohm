var nohm = require('nohm').Nohm,
    redis = require('redis').createClient();

redis.on("ready", function (err) {

    nohm.setClient(redis);

    console.log("Connected");

    var UserModel = nohm.model('User', {
        properties: {
            id: {
                type: 'string',
                unique: true
            },
            name: {
                type: 'string',
                index: true
            },
            email: {
                type: 'string',
                index: true
            },
            country: {
                type: 'string',
                index: true
            }
        }
    });

    UserModel.find({
        country: 'England'
    }, function (err, ids) {

        console.log("English people", ids.length);

        nohm.factory('User', ids[345], function (err) {
            if (err === 'not found') {
                console.log(err);
            } else if (err) {
                console.log(err); // database or unknown error
            } else {
                console.log(this.allProperties());
            }
        });

    });

});

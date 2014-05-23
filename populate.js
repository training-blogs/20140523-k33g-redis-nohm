var Faker = require("Faker"),
    nohm = require('nohm').Nohm,
    redis = require('redis').createClient();

redis.on("ready", function (err) {

    nohm.setClient(redis);

    console.log("Connected"); // should deal with errors

    nohm.model('User', {
        properties: {
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

    console.log("Populating Database ...");

    for (var i = 0; i <= 100000; i++) {
        var user = nohm.factory('User');

        var userCountry = Faker.Address.ukCountry();

        user.p({
            name: Faker.Name.findName(),
            email: Faker.Internet.email(),
            country: userCountry
        });

        user.save(function (err) {});
        console.log(i + " - " + userCountry);
    }

    console.log("the end");
    process.exit(1);

});

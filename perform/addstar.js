const dotenv = require('dotenv');
dotenv.config();
const LocationAction = require('../action/location.action');

const lineReader = require('line-reader');


const main = (async () => {

    try {

        const eachLine = function (filename, options, iteratee) {
            return new Promise(function (resolve, reject) {
                lineReader.eachLine(filename, options, iteratee, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        };
        eachLine('docs/yelp_academic_dataset_business.json', function (line) {
            const item = JSON.parse(line);
            // console.log(item);
            if (item.categories && item.address) {
                if (item.categories.indexOf('Restaurant') >= 0) {
                    LocationAction.addStarToLocation(item).then(r => {
                        const {location_id, score} = r;
                        console.log(`UPDATE Location # ${location_id} Score: ${score}`);
                    });
                }
            }
        }).then(function () {
            console.log('done');
        }).catch(function (err) {
            console.error(err);
        });
    } catch (e) {
        console.log(e);
    }
})();
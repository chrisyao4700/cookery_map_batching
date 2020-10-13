const dotenv = require('dotenv');
dotenv.config();

const lineReader = require('line-reader');
const CMReviewAction = require('../action/review.action');


const main = (async () => {
    lineReader.eachLine('docs/yelp_academic_dataset_review.json', function (line) {
        const item = JSON.parse(line);
        // console.log(item);
        CMReviewAction.addReviewToLocation(item)
            .then((review_id) => {
                if (review_id) console.log(`INSERT REVIEW # ${review_id}`); else console.log(`SKIPPED ONE`);
            });
        if (line.includes('STOP')) {
            // console.log(list.length);
        }
    });
})();
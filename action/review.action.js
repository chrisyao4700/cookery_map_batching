const CMReview = require('../class/review.class');
const CMLocation = require('../class/location.class');

class ReviewAction {

    static async addReviewToLocation(item) {
        try {
            const {business_id, text, user_id, stars} = item;
            const location_id = await CMLocation.searchLocationWithIdentifier(business_id);

            if (!location_id) return 0;

            const {review_id} = await new CMReview().registerReview(location_id, 1, {
                user_code: user_id,
                content: text,
                score: stars,
            });

            return review_id;
        } catch (e) {
            console.log(e);
            console.log(item);
        }
    }

}

module.exports = ReviewAction;
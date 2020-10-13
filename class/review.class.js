const func = require('od-utility');
const ODInstance = require('../model/instance.model');

class CMReview extends ODInstance {
    constructor() {
        super('cm_review', 'review_token');
    }

    async registerReview(location_id, review_source_id, info) {

        if (!location_id) func.throwErrorWithMissingParam('location_id');
        if (!review_source_id) func.throwErrorWithMissingParam('review_source_id');
        const {content, score, user_code} = info;

        try {
            this.instance_id = await this.insertInstance({
                location_id,
                review_source_id,
                content,
                score,
                user_code,
                cdate: 'now()',
                udate: 'now()',
                status: 1
            });

            return {review_id: this.instance_id};
        } catch (e) {
            throw e;
        }

    }
}

module.exports = CMReview;
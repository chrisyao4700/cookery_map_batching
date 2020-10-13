const func = require('od-utility');
const ODInstance = require('../model/instance.model');

class CMLocationCategory extends ODInstance {
    constructor(location_category_token, location_category_id) {
        super('cm_location_has_category', 'location_category_token', location_category_token, location_category_id);
    }

    async registerLocationCategory(location_id, category_id) {

        if (!location_id) func.throwErrorWithMissingParam('location_id');
        if (!category_id) func.throwErrorWithMissingParam('category_id');
        try {
            this.instance_id = await this.insertInstance({
                location_id,
                category_id,
                cdate: 'now()',
                udate: 'now()',
                status: 1
            });

            return {location_category_id: this.instance_id};
        } catch (e) {
            throw e;
        }
    }
}

module.exports = CMLocationCategory;
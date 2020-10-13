const func = require('od-utility');
const ODInstance = require('../model/instance.model');

class CMLocation extends ODInstance {

    constructor(location_token, location_id) {
        super('cm_location', 'location_token', location_token, location_id);
    }

    async registerLocationWithAddress(address_id, info) {
        const {name, identifier} = info;
        if (!name) func.throwErrorWithMissingParam('name');
        try {
            this.instance_id = await this.insertInstance({
                name,
                cdate: 'now()',
                udate: 'now()',
                status: 1,
                identifier: identifier,
                address_id: address_id
            });
            return {location_id: this.instance_id};
        } catch (e) {
            throw e;
        }
    }

    static async searchLocationWithIdentifier(identifier) {
        const result = await ODInstance.performQuery(
            `SELECT id AS location_id FROM cm_location WHERE identifier = '${identifier}'
            AND status = 1
            LIMIT 1
            `);
        if (!result.length) return 0;
        const {location_id} = result[0];
        return location_id;
    }
}

module.exports = CMLocation;
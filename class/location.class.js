const func = require('od-utility');
const ODInstance = require('../model/instance.model');
const ODCondition = require('../model/condition.model');

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
        try {
            const result = await ODInstance.performQuery(
                `SELECT id AS location_id FROM cm_location WHERE identifier = '${identifier}'
            AND status = 1
            LIMIT 1
            `);
            if (!result.length) return 0;
            const {location_id} = result[0];
            return location_id;
        } catch (e) {
            throw e;
        }
    }

    async updateScoreWithIdentifier(identifier, score) {
        try {
            const condition = new ODCondition();
            condition
                .configComplexConditionKey('cm_location', 'id', 'location_id')
                .configComplexConditionQueryItem('cm_location', 'identifier', identifier);

            const {location_id} = await this.findInstanceDetail(condition);

            this.instance_id = location_id;

            await this.updateInstance({score: score});

            return location_id;
        } catch (e) {
            throw e;
        }

    }
}

module.exports = CMLocation;
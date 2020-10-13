const func = require('od-utility');
const ODInstance = require('../model/instance.model');
const ODCondition = require('../model/condition.model');

// const categories = ['Chinese', 'Mexican', 'Japanese', 'Fast', 'Pizza', 'Seafood', 'Thai', 'Italian', 'Korean', 'American', 'Sandwiches'];
let categories = [];

class CMCategory extends ODInstance {

    constructor(category_id) {
        super('cm_category', null, null, category_id);
        this.categories = [];
    }


    async registerCategory(name) {
        if (!name) func.throwErrorWithMissingParam('name');
        try {
            this.instance_id = await this.insertInstance({
                name,
                cdate: 'now()',
                udate: 'now()',
                status: 1
            });
            return {category_id: this.instance_id};
        } catch (e) {
            throw e;
        }
    }

    static async searchCategories(list) {

        if (categories.length === 0) {
            categories = await this._findAllCategories();
        }
        return list.reduce((acc, curr) => {
            let temp = [];
            for (const item of categories) {
                if (curr.indexOf(item.name) >= 0) {
                    //has item
                    temp.push(item.id);
                    break;
                }
            }
            return [...acc, ...temp];
        }, []);
    }

    static async _findAllCategories() {
        return await ODInstance.performQuery(`SELECT id, name FROM cm_category WHERE status = 1`);
    }

}

module.exports = CMCategory;
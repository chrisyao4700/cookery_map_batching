const CMLocation = require('../class/location.class');
const CMAddress = require('../class/address.class');
const CMCategory = require('../class/category.class');
const CMLocationCategory = require('../class/location.category');


class CMLocationAction {
    static async AnalyzeLocation(location) {

        try {

            const streets = location.address.split(',');
            const {city, state, postal_code, latitude, longitude, name, business_id, categories} = location;
            const address_info = {
                street_line_1: streets[0],
                street_line_2: streets[1],
                city,
                state,
                zip: postal_code,
                lat: latitude,
                lng: longitude
            };

            const {address_id} = await new CMAddress().registerAddress(address_info);

            const location_info = {name, identifier: business_id};
            const {location_id} = await new CMLocation().registerLocationWithAddress(address_id, location_info);
            const category_id_list = await CMCategory.searchCategories(categories.split(','));
            const category_insert_list = category_id_list.map(
                category_id => new CMLocationCategory().registerLocationCategory(location_id, category_id)
            );
            await Promise.all(category_insert_list);

            return location_id;
        } catch (e) {
            console.log(e);
            console.log(location);
        }
    }

}

module.exports = CMLocationAction;
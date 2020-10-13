const dotenv = require('dotenv');
dotenv.config();

const CMCategory = require('../class/category.class');


const main = (async () => {


    try {
        const categories = 'Burgers, Restaurants, American (Traditional), Chicken Wings';
        const list = await CMCategory.searchCategories(categories.split(','));
        console.log(list);
    } catch (e) {
        console.log(e);
    }

})();
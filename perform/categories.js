const dotenv = require('dotenv');
dotenv.config();
const CMCategory = require('../class/category.class');

const categories = ['Burgers', 'Chinese', 'Mexican', 'Japanese', 'Fast Food', 'Pizza', 'Seafood', 'Thai', 'Italian', 'Middle Eastern', 'Korean', 'American', 'Sandwiches', 'Vietnamese'];
const main = (async () => {
    try {
        const plist = categories.map((ele) => {
            return new CMCategory().registerCategory(ele);
        });
        await Promise.all(plist);
    } catch (e) {
        console.log(e);
    }
})();
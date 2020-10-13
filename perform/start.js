// const locations = require('../docs/yelp_academic_dataset_business.json').list;
const dotenv = require('dotenv');
dotenv.config();
const LocationAction = require('../action/location.action');

const lineReader = require('line-reader');


// const readline = require('readline');
// const attempt1 = () => {
//     try {
//         var stream = fs.createReadStream('docs/yelp_academic_dataset_business.json', {flags: 'r', encoding: 'utf-8'});
//
//
//         let queue = 0;
//         let curr = '';
//         let list = [];
//         let item = null;
//         let block = 0;
//         let itemcount = 0;
//         stream.on('data', function (d) {
//             // // const data = JSON.parse(d);
//             // // console.log(d);
//             // count++;
//             // if (count % 17 === 0) console.log(typeof d+'\n====\n');
//             // // console.log()
//             curr += d;
//             block++;
//             console.log(`STARTING STREAM BLOCK #${block} ${queue} ${(block / 2334).toFixed(2)}%`);
//             console.log(curr);
//
//             if (list.length > 20) {
//                 const plist = list.map(ele => LocationAction.analyzeLocation(ele));
//                 Promise.all(plist).then(result => {
//                     console.log('Finished A Set');
//                 });
//                 list = [];
//             }
//
//
//             let index = 0;
//             while (index < curr.length) {
//                 // console.log(`${index} vs ${curr.length}`);
//                 if (curr[index] === '{') queue++;
//                 if (curr[index] === '}') {
//                     queue--;
//                     if (queue === 0) {
//                         //found json;
//                         item = JSON.parse(curr.slice(0, index + 1));
//                         // console.log(item.categories);
//                         // list.push(item);
//                         itemcount++;
//
//                         // if (itemcount % 50 === 0) console.log(`sample ${itemcount} ${item.categories}`);
//                         if (item.categories.indexOf('Restaurants')) {
//                             list.push(item);
//                             console.log('FOUND A ITEM');
//                         }
//                         curr = curr.slice(index + 1, curr.length);
//                         index = 0;
//                         continue;
//                     }
//                 }
//                 index++;
//             }
//
//         });
//         stream.on('end', () => {
//             // console.log(list);
//             console.log('finished');
//         });
//     } catch (e) {
//         console.log(e);
//     }
//
// };

const main = (async () => {
    // var stream = fs.createReadStream('docs/yelp_academic_dataset_business.json', {flags: 'r', encoding: 'utf-8'});
    // const list = [];

    // console.log(process.env.CM_HOST);

    try {
        // lineReader.eachLine('docs/yelp_academic_dataset_business.json',  function (line) {
        //     const item = JSON.parse(line);
        //     // console.log(item);
        //     if (item.categories && item.address) {
        //         if (item.categories.indexOf('Restaurant') >= 0) {
        //             const location_id = await LocationAction.AnalyzeLocation(item);
        //             console.log(`INSERT LOCATION # ${location_id}`);
        //
        //         }
        //     }
        //     if (line.includes('STOP')) {
        //         // console.log(list.length);
        //     }
        // });


        const eachLine = function (filename, options, iteratee) {
            return new Promise(function (resolve, reject) {
                lineReader.eachLine(filename, options, iteratee, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }
        eachLine('docs/yelp_academic_dataset_business.json', function (line) {
            const item = JSON.parse(line);
            // console.log(item);
            if (item.categories && item.address) {
                if (item.categories.indexOf('Restaurant') >= 0) {
                    LocationAction.AnalyzeLocation(item).then(r => {
                        console.log(`INSERT LOCATION # ${r}`);
                    });
                }
            }
        }).then(function () {
            console.log('done');
        }).catch(function (err) {
            console.error(err);
        });
    } catch (e) {
        console.log(e);
    }

    // lineReader.open('docs/yelp_academic_dataset_business.json', function(reader) {
    //     if (reader.hasNextLine()) {
    //         reader.nextLine(function(line) {
    //             // console.log(line);
    //             item = JSON.parse(line);
    //             if(item.categories.indexOf('Restaurant')>= 0) list.push(item);
    //         });
    //     }else{
    //         console.log(list.length);
    //
    //     }
    // });
    // lineReader.eachLine()


})();
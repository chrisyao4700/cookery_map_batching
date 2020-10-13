var eclairjs = require('eclairjs');

var spark = new eclairjs();

var sc = new spark.SparkContext("local[*]", "Simple Word Count"); // sc means spark context i guess

var textFile = sc.textFile('s3a://arn:aws:s3:::chris-email-domain');

var words = textFile.flatMap(function (sentence) {
    return sentence.split(" ");
});

var wordsWithCount = words.mapToPair((word, Tuple2) => new Tuple2(word, 1), [eclairjs.Tuple2]);

var reducedWordsWithCount = wordsWithCount.reduceByKey((value1, value2) => value1 + value2);

reducedWordsWithCount.collect()
    .then((results) => {
            console.log('Word Count:', results);
            sc.stop();
        }
    );
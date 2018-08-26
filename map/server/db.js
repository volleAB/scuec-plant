const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/scuec-plant');

let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;

db.on('error', function(){
    console.log('数据库连接出错！');
});
db.on('open', function(){
    console.log('数据库连接成功！');
});

//声明schema
const plantSchema = mongoose.Schema({
    name: String,
    eName: String,
    pos: {
        street: String,
        building: String,
        distance: String
      },
    lng: String,
    lat: String,
    allReviser: [String, String],
    lastReviser: String,
    family: String,
    genus: String,
    img: String,
    sharp: String,
    distribution: String,
    value: String
});

//根据schema生成model
const model = {
    Plant: mongoose.model('Plant', plantSchema)
};

module.exports = model;
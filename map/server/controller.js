const Plant = require('./db.js').Plant;

//根据name查找用户
const findPlant = (name) => {
    return new Promise((resolve, reject) => {
        Plant.findOne({ name }, (err, doc) => {
        if (err) {
          reject(err);
        }
        resolve(doc);
      });
    });
  };

const findAllPlant = () => {
    return new Promise((resolve, reject) => {
        Plant.find({}, (err, doc) => {
        if (err) {
          reject(err);
        }
        resolve(doc);
      });
    });
  };

//

const AddPlant = async(ctx) => {
    let plant = new Plant({
        name: ctx.request.body.name,
        eName: ctx.request.body.eName,
        pos: ctx.request.body.pos
    });

    let doc = await findPlant(plant.name);
    if (doc) {
        console.log('植物已经存在');
        ctx.status = 200;
        ctx.body = {
        success: false
        };
    } else {
        await new Promise((resolve, reject) => {
        plant.save((err) => {
            if (err) {
            reject(err);
            }
            resolve();
        });
        });
        console.log('添加成功');
        ctx.status = 200;
        ctx.body = {
        success: true
        }
    }
};

const GetAllPlant = async(ctx) => {
    //查询所有植物信息
    let doc = await findAllPlant();
    ctx.status = 200;
    ctx.body = {
        succsess: '成功',
        result: doc
    };
};


module.exports = {
    GetAllPlant,
    AddPlant
  };
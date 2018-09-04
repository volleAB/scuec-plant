const Plant = require('./db.js').Plant;

//根据name查找植物
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
//获取所有植物
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

//根据name删除记录
const delPlant = (name) => {
    return new Promise((resolve, reject) => {
        Plant.remove({name: name}, (err, doc) => {
        if (err) {
          reject(err);
        }
        resolve(doc);
      });
    });
  };

//服务

const AddPlant = async(ctx) => {
    let plant = new Plant({
        name: ctx.request.body.name,
        eName: ctx.request.body.eName,
        pos: ctx.request.body.pos,
        lng: ctx.request.body.lng,
        lat: ctx.request.body.lat,
        allReviser: ctx.request.body.allReviser,
        lastReviser: ctx.request.body.lastReviser,
        family: ctx.request.body.family,
        genus: ctx.request.body.genus,
        img: ctx.request.body.img,
        sharp: ctx.request.body.sharp,
        distribution: ctx.request.body.distribution,
        value: ctx.request.body.value
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

//查询所有植物信息
const GetAllPlant = async(ctx) => {
    let doc = await findAllPlant();
    ctx.status = 200;
    ctx.body = {
        succsess: '成功',
        result: doc
    };
};

//删除植物信息
const DelPlant = async(ctx) => {
    let name = ctx.request.body.name;
    let doc = await delPlant(name);
    ctx.status = 200;
    ctx.body = {
        succsess: '删除成功',
        result: doc
    };
}


module.exports = {
    GetAllPlant,
    AddPlant,
    DelPlant
  };
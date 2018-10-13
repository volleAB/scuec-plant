const Plant = require('./db.js').Plant
const User = require('./db.js').User

//植物
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

//用户
//所有用户
const findAllUser = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, doc) => {
            if(err) {
                reject()
            }else {
                resolve(doc)
            }
        })
    })
}

//找到某个用户
const findOneUser = (name) => {
    return new Promise((resolve, reject) => {
        User.findOne({userName: name}, (err, doc) => {
            if(err) {
                reject(err)
            }else {
                resolve(doc)
            }
        })
    })
}

//删除某个用户
const delUser = (name) => {
    return new Promise((resolve, reject) => {
        User.remove({userName: name}, (err, doc) => {
            if(err) {
                reject(err)
            }else {
                resolve(doc)
            }
        })
    })
}

/*--------------------------------------------------------------------*/

//植物操作
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

//用户操作
//查询所有用户
const FindAllUser = async(ctx) => {
    let doc = await findAllUser();
    ctx.status = 200;
    ctx.body = {
        succsess: '成功',
        result: doc
    };
}

//注册(添加用户)
const AddUser = async(ctx) => {
    let name = ctx.request.body.userName
    let user = new User({
        userName: ctx.request.body.userName,
        passWord: ctx.request.body.passWord,
        date: ctx.request.body.date
    })
    let doc = await findOneUser(name)
    if(doc) {
        console.log('该用户已经存在！')
        ctx.status = 200;
        ctx.body = {
        success: false
        };
    }else {
        await new Promise((resolve, reject) => {
            user.save((err) => {
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
}

//登录
const Login = async(ctx) => {
    //拿到账号和密码
    let name = ctx.request.body.userName;
    let password = ctx.request.body.passWord;
  
    let doc = await findOneUser(name);
  
    if (!doc) {
      console.log('检查到用户名不存在');
      ctx.status = 200;
      ctx.body = {
        info: false
      }
    } else if (doc.passWord === password) {
      console.log('密码一致!');

      await new Promise((resolve, reject) => {
        doc.save((err) => {
          if (err) {
            reject(err);
          }
          resolve();
        });
      });
  
      ctx.status = 200;
      ctx.body = {
        success: true,
        name,
        info: "登录成功"
      };
    } else {
      console.log('密码错误!');
      ctx.status = 200;
      ctx.body = {
        success: false
      };
    }
  };

//删除用户
const DelUser = async(ctx) => {
    let name = ctx.request.body.userName;
    let doc = await delUser(name);
    ctx.status = 200;
    ctx.body = {
        succsess: '删除成功',
        result: doc
    };
}


module.exports = {
    GetAllPlant,
    AddPlant,
    DelPlant,
    FindAllUser,
    AddUser,
    DelUser,
    Login
  };
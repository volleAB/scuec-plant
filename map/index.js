const Koa = require('koa');
const app = new Koa();

//router
const Router = require('koa-router');

//koa-cors
const cors = require('koa2-cors');

//父路由
const router = new Router();

app.use(cors({
    origin: function (ctx) {
    if (ctx.url) {
    return "*";
    }
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }))

//bodyparser:该中间件用于post请求的数据
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//引入数据库操作方法
const Controller = require('./controller.js');

//获取所有信息
const allPlantRouter = new Router();
allPlantRouter.get('/plant', Controller.GetAllPlant);
//添加植物
const addPlantRouter = new Router();
addPlantRouter.post('/addplant', Controller.AddPlant);
//删除植物信息
const delPlantRouter = new Router();
delPlantRouter.post('/delplant', Controller.DelPlant);

router.use('/api',allPlantRouter.routes(),allPlantRouter.allowedMethods());
router.use('/api',addPlantRouter.routes(),addPlantRouter.allowedMethods());
router.use('/api',delPlantRouter.routes(),delPlantRouter.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(8000, () => {
    console.log('The server is running at http://localhost:' + 8000);
});
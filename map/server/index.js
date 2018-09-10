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

//获取所有植物信息
const allPlantRouter = new Router();
allPlantRouter.get('/plant', Controller.GetAllPlant);
//添加植物
const addPlantRouter = new Router();
addPlantRouter.post('/addplant', Controller.AddPlant);
//删除植物信息
const delPlantRouter = new Router();
delPlantRouter.post('/delplant', Controller.DelPlant);

//获取所有用户信息
const allUserRouter = new Router();
allUserRouter.get('/user', Controller.FindAllUser);

//添加用户
const addUserRouter = new Router();
addUserRouter.post('/adduser', Controller.AddUser);

//删除用户
const delUserRouter = new Router();
delUserRouter.post('/deluser', Controller.DelUser);

//登录
const loginRouter = new Router();
loginRouter.post('/login', Controller.Login);

router.use('/api',allPlantRouter.routes(),allPlantRouter.allowedMethods());
router.use('/api',addPlantRouter.routes(),addPlantRouter.allowedMethods());
router.use('/api',delPlantRouter.routes(),delPlantRouter.allowedMethods());
router.use('/api',allUserRouter.routes(),allUserRouter.allowedMethods());
router.use('/api',addUserRouter.routes(),addUserRouter.allowedMethods());
router.use('/api',delUserRouter.routes(),delUserRouter.allowedMethods());
router.use('/api',loginRouter.routes(),loginRouter.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(8000, () => {
    console.log('The server is running at http://localhost:' + 8000);
});
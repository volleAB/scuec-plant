const path = require('path')
const fs = require('fs')
const uploadPath = require('./config').uploadPath
const Controller = require('./controller.js')

mkdirsSync = (dirname) => { //文件夹是否存在，没有进行创建
    if (fs.existsSync( dirname )) {
        return true
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync( dirname )
            return true
        }
    }
}

buildFolderName = () => {   //生成文件夹名
    let time = new Date
    let year = time.getFullYear().toString()
    let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : '' + (time.getMonth() + 1)
    let date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    let dirname = year + month + date + Math.random().toString(16).substr(12)
    let filePath = path.join(uploadPath, dirname)
    // console.log(filePath)
    mkdirsSync(filePath)
    return filePath
}

getSuffixName = (fileName) => { //获取文件类型
    let nameList = fileName.split('.')
    return nameList[nameList.length - 1]
}

handleFile = (filePath) =>{
    let images = Images
    setTimeout(() => {
        images(filePath)
            .resize(726, 408)
            .save(filePath, {
                quality : 1000
            })
    }, 1000)
}

checkData = async(name, path) => {
    let imgPathArr = []
    let newPath = ''
    let reg = /\\/g

    if(path.length > 1) {
        for(let i = 0; i < path.length; i++) {
            newPath = path[i].toString()
            let start = newPath.indexOf('images')
            newPath = newPath.slice(start)
            newPath = newPath.replace(reg, '/')
            newPath = './' + newPath
            imgPathArr.push(newPath)
            console.log(newPath)
        }
    } else {
        newPath = path.toString()
        let start = newPath.indexOf('images')
        newPath = newPath.slice(start)
        newPath = newPath.replace(reg, '/')
        newPath = './' + newPath
        console.log(newPath)
        imgPathArr.push(newPath)
    }
    let doc = await Controller.revisePlant(name, imgPathArr)
    console.log('修改成功！')
}

uploadFile = (name, files) => { //上传文件
    let mkdirResult = buildFolderName()
    let imgPath = []
    if (files.length > 1) {
        console.log('多文件正在上传')
        for (let file of files) {
            // 创建可读流
            const reader = fs.createReadStream(file.path);
            // 获取上传文件扩展名
            let uploadFileName = file.name
            let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(uploadFileName)
            let filePath = path.join(mkdirResult, fileName)
            // 创建可写流
            const upStream = fs.createWriteStream(filePath)
            // 可读流通过管道写入可写流
            reader.pipe(upStream)
            imgPath.push(filePath)
            // handleFile(filePath)
        }
    } else {
        console.log('单文件正在上传')
        let uploadFileName = files.name
        // 创建可读流
        const reader = fs.createReadStream(files.path)
        let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(uploadFileName)
        let filePath = path.join(mkdirResult, fileName)
        // 创建可写流
        const upStream = fs.createWriteStream(filePath)
        // 可读流通过管道写入可写流
        reader.pipe(upStream)
        imgPath.push(filePath)
        // console.log('filePath:' + filePath)
        // handleFile(filePath)
    }
    // console.log('filePath:' + imgPath)
    checkData(name, imgPath)
    console.log('上传成功！')
    return "上传成功！"
}

const UploadFile = async(ctx) => {
    let name = ctx.request.body.name
    let files = ctx.request.files.images
    let doc = await uploadFile(name, files)
    ctx.status = 200
    ctx.body = {
        result: doc
    }
}

module.exports =  {
    UploadFile
}
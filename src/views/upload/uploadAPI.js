const express = require('express')
const app = express()
const router = express.Router()
const formidable = require('../../../node_modules/formidable')
const fs = require('fs')
const title = 'upload example'
const AVATAR_UPLOAD_FOLDER = '/avatar/'
app.listen(3000)
router.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm()
  form.encoding = 'utf-8' // 设置编辑
  form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER // 设置上传目录
  form.keepExtensions = true // 保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024 // 文件大小
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.locals.error = err
      res.render('index', { title: title })
      return
    }

    var extName = '' // 后缀名
    switch (files.fulAvatar.type) {
      case 'image/pjpeg':
        extName = 'jpg'
        break
      case 'image/jpeg':
        extName = 'jpg'
        break
      case 'image/png':
        extName = 'png'
        break
      case 'image/x-png':
        extName = 'png'
        break
    }

    if (extName.length === 0) {
      res.locals.error = '只支持png和jpg格式图片'
      res.render('index', { title: title })
      return
    }

    var avatarName = Math.random() + '.' + extName
    var newPath = form.uploadDir + avatarName

    console.log(newPath)
    fs.renameSync(files.fulAvatar.path, newPath) // 重命名
  })

  res.locals.success = '上传成功'
  res.render('index', { title: title })
})

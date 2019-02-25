<template>

<div id="file">

<input name="files" id="uploaderInput" type="file" accept="images/*" multiple @change="change"/>

<div class="file_upload">

<div class="progress"></div>

</div>

<div class="img_holder"></div>

</div>

</template>

<script>

export default {

  name: 'file',

  methods: {

    change (E) {
      // 获取到获取的图片列表 （选择多张）

      let file = event.target.files[0]

      // 获取到获取的图片列表 （选择一张）

      // let img1 = event.target.files[0];

      // let reader = new FileReader();

      // console.log($("#uploaderInput")[0].files);

      // console.log(img1);

      // let type = file.type; //文件的类型，判断是否是图片

      // let size = file.size; //文件的大小，判断图片的大小

      var reader = new FileReader() // 新建FileReader对象

      reader.readAsDataURL(file) // 读取为base64

      // 以下代码可以删除

      reader.onloadstart = function () {
        console.log('start') // 开始读取
      }

      // 代码进度条

      reader.onprogress = function (e) {
        // 这个是定时触发的事件，文件较大的时候较明显

        // console.log(e)

        var p = '已完成：' + Math.round(e.loaded / e.total * 100) + '%'

        $('.file_upload')

          .find('.progress')

          .html(p)

        console.log('uploading') // 文件较大，就会出现多个uploading
      }

      reader.onabort = function () {
        console.log('abort') // 用作取消上传功能
      }

      reader.onerror = function () {
        console.log('error') // 文件读取出错的时候触发，暂模拟不出
      }

      // 成功后 获取文件url

      reader.onload = function (e) {
        console.log('load complete') // 完成

        console.log(e)

        let res = e.target.result.split(';') // 截取 data:; base64 转换后默认会有data属性判断文件格式;分为两段，前段为data，后端为文件base64编码

        if (res[0] !== 'data:application/apk;') {
          // 不同浏览器会有不一样的解析；so 这一步单独处理

          this.apk.app = 'data:application/apk;' + res[1]
        } else {
          this.apk.app = e.target.result
        }

        console.log(this.apk.app)
      }

      // 预览代码

      reader.onloadend = function (e) {
        var dataURL = reader.result

        var image = '<img src="' + dataURL + '"/>' // 预览图片

        // var text = '<span>"' + dataURL + '"</span>' // 测试预览text

        var name = file.name

        var size = Math.round(file.size / 1024)

        var div = '<p>Name: ' + name + '</p><p>Size: ' + size + 'kb</p>'

        var imglist =

          '<div class="img_box"><span class="delete">X</span>' +

          image +

          div +

          '</div>'

        $('.img_holder').html(imglist)
      }

      // if (this.imgData.accept.indexOf(type) == -1) {

      // alert("请选择我们支持的图片格式！");

      // return false;

      // }

      // if (size > 3145728) {

      // alert("请选择3M以内的图片！");

      // return false;

      // }
    }

  }

}

</script>

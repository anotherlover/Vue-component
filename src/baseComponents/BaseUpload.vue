<template>
  <div >
    <div class="wrap">
      <file-upload
        ref="upload"
        v-model="files"
        class="upload"
        :post-action="postAction"
        :put-action="putAction"
        multiple
        @input-file="inputFile"
        @input-filter="inputFilter"
      >
        <!-- accept="image/png,image/gif,image/jpeg,image/webp" -->
      上传文件
      </file-upload>
      <slot></slot>
      <Dropdown trigger="click" placement="bottom-end">
          <a href="javascript:void(0)">
              |
              <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
              <DropdownItem @click.native="canDrag">拖拽上传</DropdownItem>
          </DropdownMenu>
      </Dropdown>
    </div>
    <!-- 拖拽区域 -->
    <v-drag :visible.sync="dragVisible"
      @spreadFile='spreadFile'></v-drag>
    <!-- 显示区域 -->
    <ul>

      <li v-for="(file, index) in files" class="row" :key='file.id'>
        <!-- name -->
        <div class="name t">
            <a  :href="file.blob" :download="file.name">{{file.name}}</a>
        </div>
        <!-- size -->
        <div class="size t">{{file.size | conver}}</div>
        <!-- type -->
        <div class="type t">{{file.type}}</div>
        <!-- progress -->
        <div class="progress t">
          <img v-if="file.type.split('/')[0] === 'image'" :src="file.blob" :alt="file.name" style="width: 50px; height: 50px;">
        </div>
        <div class="preview">
          <iframe :src="file.blob" :style="{display: true, width: '100%', height: '400%'}"  frameborder="0"></iframe>
        </div>
        <!-- action :
          upload: 上传,
          remove： 移除,
          cancel：取消上传，只有在上传过程中才出现
        -->
        <div class="action t">
           <Dropdown trigger="click">
              <a href="javascript:void(0)">
                  action
                  <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                  <DropdownItem>上传</DropdownItem>
                  <!-- <DropdownItem> -->
                    <!-- <a :href="file.blob" style="color: #515a6e;font-size: 12px!important;" :download="file.name">下载</a> -->
                  <!-- </DropdownItem> -->
                  <DropdownItem>
                    <a  style="color: #515a6e;font-size: 12px!important;" @click.prevent="downdLoadIE(file)">下载</a>
                  </DropdownItem>
                  <DropdownItem disabled>取消</DropdownItem>
                  <DropdownItem  @click.native="removeFile(index)">删除</DropdownItem>
              </DropdownMenu>
          </Dropdown>
        </div>
      </li>
    </ul>
    <!-- <button v-show="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true" type="button">开始上传</button> -->
    <!-- <button v-show="$refs.upload && $refs.upload.active" @click.prevent="$refs.upload.active = false" type="button">停止上传</button> -->
  </div>
</template>

<script>

import dragUpload from '../views/upload/EmailUpload'
export default {
  name: 'BaseUpload',
  data () {
    return {
      files: [],
      dragVisible: false
    }
  },
  components: {
    'v-drag': dragUpload
  },
  props: {
    postAction: { // post 上传URL
      type: String,
      default: ''
    },
    putAction: { // put 上传URL
      type: String,
      default: ''
    }
  },
  methods: {
    /**
     * Has changed
     * @param  Object|undefined   newFile   只读
     * @param  Object|undefined   oldFile   只读
     * @return undefined
     */
    inputFile: function (newFile, oldFile) {
      console.log('newfile', this.files)
      // console.log('old file', oldFile)
      // console.log('files', this.files)
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // 获得相应数据
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  获得响应状态码
          console.log('status', newFile.xhr.status)
        }
      }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   读写
     * @param  Object|undefined   oldFile   只读
     * @param  Function           prevent   阻止回调
     * @return undefined
     */
    inputFilter: function (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // 过滤不是图片后缀的文件
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          // return prevent()

        }
      }
      // 创建 blob 字段 用于图片预览，也可用于本地下载，使用download 属性，href值为blob
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        // FIXME: 字符串， 绑定img的src属性，缩略图
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    },
    canDrag () {
      this.dragVisible = true
    },
    spreadFile (file) {
      // 暂时适配列表中有的，契合vue-upload-component
      const _file = Object.assign({}, {
        file: file,
        name: file.name,
        type: file.type,
        size: file.size,
        blob: URL.createObjectURL(file)
      })
      this.files.push(_file)
      // this.$refs.upload.addDataTransfer(file)
    },
    removeFile (index) {
      console.log('index', index)
      this.files.splice(index, 1)
    },
    // 本地下载文件
    downdLoadIE (file) {
      var csvData = new Blob([file.file], { type: file.type })
      // for IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(csvData, file.name)
      } else {
      // for Non-IE (chrome, firefox etc.)
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        var url = window.URL.createObjectURL(csvData)
        a.href = url
        a.download = file.name
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
      }
    }
  },
  watch: {
    files: function (val) {
      // this.$emit('spreadFiles', val)
    }
  }

}
</script>

<style lang="less" scoped>
  .wrap {
    display: inline-block;
    width: 125px;
    font-size: 16px;
    position: relative;
    height:30px;
    line-height: 30px;
    margin-top: 30px;
    .ivu-dropdown {
      position: relative;
      top: -10px;
      left: 5px;
    }
    .row {
      display: block;
      font-size: 14px;
    }
  }
  /deep/.t {
    font-size: 14px;
    display: inline-block;
    width:20%;
    padding-left: 30px;
  }
</style>

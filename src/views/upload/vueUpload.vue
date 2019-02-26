<template>
  <div style="max-height: 100px;width:500px;border: 1px solid #999">
    <div class="wrap">
      <file-upload
        ref="upload"
        v-model="files"
        class="upload"
        :drop="true"
        accept="image/png,image/gif,image/jpeg,image/webp"
        post-action="/post.method"
        put-action="/put.method"
        multiple
        @input-file="inputFile"
        @input-filter="inputFilter"
      >
      上传文件
      </file-upload>
      <!-- <Dropdown trigger="click" placement="bottom-end">
          <a href="javascript:void(0)">
              |
              <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
              <DropdownItem @click.native="canDrag">拖拽上传</DropdownItem>
          </DropdownMenu>
      </Dropdown> -->
    </div>
    <!-- 拖拽区域 -->
    <v-drag :visible.sync="dragVisible"
      @spreadFile='spreadFile'></v-drag>
    <!-- 显示区域 -->
    <ul>
      <li v-for="file in files" class="row" :key='file.id'>
        <!-- name -->
        <div class="name t">{{file.name}}</div>
        <!-- size -->
        <div class="size t">{{file.size | conver}}</div>
        <!-- type -->
        <div class="type t">{{file.type}}</div>
        <!-- progress -->
        <div class="progress t"></div>
        <!-- action :
          upload: 上传,
          remove： 移除,
          cancel：取消上传，只有在上传过程中才出现
        -->
        <div class="action t">
           <Dropdown>
              <a href="javascript:void(0)">
                  action
                  <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                  <DropdownItem>上传</DropdownItem>
                  <DropdownItem disabled>取消</DropdownItem>
                  <DropdownItem  @click.prevent="$refs.upload.remove(file)">删除</DropdownItem>
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
import dragUpload from './EmailUpload'
export default {
  data () {
    return {
      files: [],
      dragVisible: false
    }
  },
  components: {
    'v-drag': dragUpload
  },
  methods: {
    /**
     * Has changed
     * @param  Object|undefined   newFile   只读
     * @param  Object|undefined   oldFile   只读
     * @return undefined
     */
    inputFile: function (newFile, oldFile) {
      console.log('newfile', newFile)
      console.log('old file', oldFile)
      console.log('files', this.files)
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
          return prevent()
        }
      }

      // 创建 blob 字段 用于图片预览
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    },
    canDrag () {
      this.dragVisible = true
    },
    spreadFile (file) {
      console.log('拖拽的文件', file)
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap {
    margin-top: 40px;
    font-size: 16px;
    position: relative;
    height:30px;
    line-height: 30px;

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

<template>
  <div>
    <!-- <h3>upload: drag file to upload with progress</h3> -->
    <div class="dropbox"
      v-show='canDrag'>
      <span class="close"
        @click='close'
        title="关闭">X</span>
      <h3 v-if='files.length===0'
        class="text-center">{{tips}}</h3>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      files: [],
      tips: '将文件拖拽到此区域',
      canDrag: (() => {
        return this.visible
      })()
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    // 检测文件拖拽， 检测dropenter & dragover 阻止浏览器默认下载行为
    const dropbox = document.querySelector('.dropbox')
    dropbox.addEventListener('dragenter', this.onDrag, false) // 第一次拖入区域
    dropbox.addEventListener('dragover', (e) => {
      this.onDrag(e)
      this.tips = '释放鼠标'
    }, false) // 区域内来回拖动
    dropbox.addEventListener('drop', this.onDrop, false) // 文件在拖动区，松开鼠标时
  },
  methods: {
    // 保存拖动到浏览器中的文件, 并上传
    uploadFile: function (file) {
      this.$emit('spreadFile', file)
      //  do something upload action
    },
    // 阻止浏览器默认行为
    onDrag (e) {
      e.stopPropagation()
      e.preventDefault()
    },
    onDrop (e) {
      e.stopPropagation()
      e.preventDefault()
      this.close()
      this.tips = '将文件拖拽到此区域'
      const dt = e.dataTransfer.files
      for (let i = 0; i < dt.length; i++) {
        this.uploadFile(dt[i])
      }
    },
    close () {
      this.$emit('update:visible', false)
    }
  },
  watch: {
    visible: function (visible) {
      this.canDrag = visible
    }
  }
}
</script>
<style lang="less" scoped>
  .dropbox {
    border: 1px dashed #909090;
    height: 100px;
    line-height: 100px;
    width: 500px;
    margin: 10px auto;
    z-index: 99;
    position: relative;
      .close {
        width:18px;
        height: 18px;
        line-height: 18px;
        position: absolute;
        top: 5px;
        right: 5px;
      }
  }
</style>

<template>
  <div>
    <div class="otherPlace"></div>
    <baseUpload
     putAction="/upload/put.php"
     postAction="/upload/post.php"
     @spreadFiles="getFiles"
    >
      <!-- <Dropdown class="myDropDown"
        trigger="click"
        placement="bottom-end">
          <a href="javascript:void(0)">
              |
              <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
              <DropdownItem @click.native="checkDragState">拖拽上传</DropdownItem>
          </DropdownMenu>
      </Dropdown> -->
    </baseUpload>
    <!-- <dragUpload :visible.sync="dragVisible"
      @spreadFile='spreadFile'/> -->
     <div class="content">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque provident quae officia qui rerum est et veritatis, hic impedit tempora, fuga nemo sunt accusantium? Deserunt reiciendis impedit quae in repellat!</div>
  </div>
</template>
<script>
// import dragUpload from './EmailUpload'
export default {
  data () {
    return {
      // canDrag: false,
      // dragVisible: false

    }
  },
  components: {
    // dragUpload
  },
  methods: {
    checkDragState () {
      // 控制拖拽框出现
      this.dragVisible = true
      // this.canDrag = !this.canDrag
    },
    spreadFile (file) {
      // 上传文件
      console.log('拖拽的文件', file)
    },
    // 得到files 数据
    getFiles (files) {
      console.log('files', files)
    }
  }
}
</script>
<style lang="less" scoped>
  .otherPlace {
    width: 100%;
    height: 50px;
    background-color: antiquewhite;
  }
  .content {
    margin: 0 auto;
    width: 500px;
    height: 300px;
  }
  .myDropDown{
    position: absolute;
    right: 0;
  }
  .drag {
    min-width: 500px;
    height: 180px;
    margin: 0 auto;
    border: 1px solid #999;
    z-index: 999;
  }
</style>

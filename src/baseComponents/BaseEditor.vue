<template>
  <div class="myEditor">
    <textarea name=""  id="editor" cols="10" style="width: auto" rows="30"></textarea>
  </div>
</template>

<script>
// TODO:封装editordemo
import CKEDITOR from 'CKEDITOR'
export default {
  data () {
    return {
      // content: '<h2>seal with a kiss</h2>'
    }
  },
  mounted () {
    this.editorInit()
    // Register the plugin within the editor.
    CKEDITOR.plugins.add('timestamp', {

      // Register the icons. They must match command names.
      icons: 'timestamp',

      // The plugin initialization logic goes inside this method.
      init: function (editor) {
        // Define the editor command that inserts a timestamp.
        editor.addCommand('insertTimestamp', {

          // Define the function that will be fired when the command is executed.
          exec: function (editor) {
            var now = new Date()

            // Insert the timestamp into the document.
            editor.insertHtml('The current date and time is: <em>' + now.toString() + '</em>')
          }
        })

        // Create the toolbar button that executes the above command.
        editor.ui.addButton('Timestamp', {
          label: 'Insert Timestamp',
          command: 'insertTimestamp',
          toolbar: 'insert'
        })
      }
    })

    // CKEDITOR.replace('editor', { height: '300px', width: '100%', toolbar: 'Full' })
  },
  methods: {
    editorInit () {
      CKEDITOR.replace('editor', {
        height: '300px',
        width: '100%',
        editorToolbar: [
          {
            name: 'clipboard',
            items: ['PasteFromWord', '-', 'Undo', 'Redo']
          },
          {
            name: 'basicstyles',
            items: [
              'Bold',
              'Italic',
              'Underline',
              'Strike',
              'RemoveFormat',
              'Subscript',
              'Superscript'
            ]
          },
          {
            name: 'links',
            items: ['Link', 'Unlink']
          },
          {
            name: 'paragraph',
            items: [
              'NumberedList',
              'BulletedList',
              '-',
              'Outdent',
              'Indent',
              '-',
              'Blockquote'
            ]
          },
          {
            name: 'insert',
            items: ['Image', 'Table']
          },
          '/',

          {
            name: 'styles',
            items: ['Format', 'Font', 'FontSize']
          },
          {
            name: 'colors',
            items: ['TextColor', 'BGColor', 'CopyFormatting']
          },
          {
            name: 'align',
            items: [
              'JustifyLeft',
              'JustifyCenter',
              'JustifyRight',
              'JustifyBlock'
            ]
          },
          {
            name: 'tools',
            items: ['Maximize']
          },
          {
            name: 'document',
            items: ['Print', 'Source']
          }
        ],
        toolbar: 'Full', // 菜单栏
        language: 'en-US', // 语言
        uiColor: '#9AB8F3' // 主题颜色
      })
      //  CKEditor 初始化完成加载数据
      CKEDITOR.on('instanceReady', e => {
        this.setContent()
      })

      //  CKEditor 数据改变-监听
      CKEDITOR.instances.editor.on('change', e => {
        this.getContent()
      })
    },
    // 初始化编辑器内容，可用于固定模版
    setContent () {
      CKEDITOR.instances.editor.setData('<h1>seal with a kiss</h1>')
    },
    getContent () {
      // 参照vue子组件传值给
      // this.$emit('catchData', CKEDITOR.instances.editor.getData())
      console.log('content data', CKEDITOR.instances.editor.getData())
    }

  }
}
</script>
<style lang="less" scoped>
  // @import './editPlgin/content.css'
</style>

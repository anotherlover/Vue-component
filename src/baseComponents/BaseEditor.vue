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
    }
  },
  mounted () {
    this.editorInit()
    // CKEDITOR.replace('editor', { height: '300px', width: '100%', toolbar: 'Full' })
  },
  methods: {
    editorInit () {
      CKEDITOR.replace('editor', { height: '300px', width: '100%', toolbar: 'Full' })
      // var editor = CKEDITOR.instances.editor2
    }
  }
}
</script>

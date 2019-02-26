<template>
  <div id="app">
    <!-- <v-upload></v-upload> -->
    <router-view/>
  </div>
</template>

<script>
// import uploadEamil from './components/eamilUpload'
export default {
  data () {
    return {

    }
  },
  components: {
    // 'v-upload': uploadEamil
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>

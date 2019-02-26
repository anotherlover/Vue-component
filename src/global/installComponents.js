import Vue from 'vue'

const requireComponent = require
  .context('../baseComponents', false, /^\.\/Base(.)+\.vue$/)
  .keys()

requireComponent.forEach(file => {
  const fileName = file.replace(/^\.\//, '').replace(/\.\w+$/, '')
  let componentConfig = require(`../baseComponents/${fileName}.vue`)
  const name = fileName.replace(/^\w/, s => s.toLowerCase())
  console.log('name', file)
  Vue.component(name, componentConfig.default || componentConfig)
})

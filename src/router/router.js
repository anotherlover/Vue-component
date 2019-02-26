const routes = [
  {
    path: '/'
  },
  {
    path: '/home',
    name: 'upload',
    component: () => import('../baseComponents/BaseUpload')
  },
  {
    path: '/drag',
    component: () => import('../views/upload/EmailUpload')
  },
  {
    path: '/vue-upload',
    component: () => import('../views/upload/vueUpload')
  },
  {
    path: '/demo',
    component: () => import('../views/upload/uploadDemo')
  }
]

export default routes

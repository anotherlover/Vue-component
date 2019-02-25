const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'upload',
    component: () => import('../baseComponents/BaseUpload')
  }
]

export default routes

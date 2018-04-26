import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Library from '@/components/Library'
import Count from '@/components/Count'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/calculate',
      children: [
        {
          path: '/calculate',
          component: Count,
          name: '相似度计算'
        },
        {
          path: '/library',
          component: Library,
          name: '文件库'
        }
      ]
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: r => require.ensure([], () => r(require('@/pages/MSite/MSite')), 'MSite'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: r => require.ensure([], () => r(require('@/pages/Order/Order')), 'Order'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: r => require.ensure([], () => r(require('@/pages/Search/Search')), 'Search'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: r => require.ensure([], () => r(require('@/pages/Profile/Profile')), 'Profile'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: r => require.ensure([], () => r(require('@/pages/Login/Login')), 'Login')
    }

  ]
})

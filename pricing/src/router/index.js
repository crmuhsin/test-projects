import Vue from 'vue'
import Router from 'vue-router'

const Pricing = () => import('@/components/Pricing')

Vue.use(Router)

export default new Router({
    mode: "history",
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            redirect: '/pricing',
            name: 'Home',
            component: {
                render(c) { return c('router-view') }
            },
            children: [
                {
                    path: '/pricing',
                    name: 'Pricing',
                    component: Pricing,
                    meta: { title: 'Price' }
                }
            ]
        }
    ],
})


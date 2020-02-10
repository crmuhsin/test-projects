import Vue from 'vue'
import Router from 'vue-router'

const Search = () => import('@/components/Search')

Vue.use(Router)

export default new Router({
    mode: "history",
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            redirect: '/search',
            name: 'Home',
            component: {
                render(c) { return c('router-view') }
            },
            children: [
                {
                    path: '/search',
                    name: 'Search',
                    component: Search,
                    meta: { title: 'Search Movie' }
                },
            ]
        }
    ],
})


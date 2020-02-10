import Vue from 'vue'
import Router from 'vue-router'

const AppointmentList = () => import('@/components/AppointmentList')
const Appointment = () => import('@/components/Appointment')

Vue.use(Router)

export default new Router({
    mode: "history",
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            redirect: '/lists',
            name: 'Home',
            component: {
                render(c) { return c('router-view') }
            },
            children: [
                {
                    path: '/lists',
                    name: 'AppointmentList',
                    component: AppointmentList,
                    meta: { title: 'Appointment List' }
                },
                {
                    path: '/appointment',
                    name: 'Appointment',
                    component: Appointment,
                    meta: { title: 'Appointment Booking' }
                },
            ]
        }
    ],
})


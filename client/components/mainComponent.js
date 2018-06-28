import ExpenseView from './ExpenseView/ExpenseView.js'
import AboutView from './AboutView/AboutView.js'

const routes = [
    {path: '/about', component: AboutView},
    {path: '/dash', component: ExpenseView},
    {path:'/', component: ExpenseView}
]

const router = new VueRouter({
    routes
})

const main = new Vue({
    el: '#app',
    router,

})


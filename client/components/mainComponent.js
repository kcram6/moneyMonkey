import ExpenseView from './ExpenseView/ExpenseView.js'
import AboutView from './AboutView/AboutView.js'

const main = new Vue({
    el: '#app',
    data: {
        message: 'hello i am a component'
    },
    template: `
        
        <expense-view></expense-view>
        
    `
})

const about = new Vue({
    el: '#app2',
    data: {
        message: 'hello i am a component'
    },
    template: `
        <about-view></about-view>
        
        
    `
})
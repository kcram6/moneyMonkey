const StatsView = Vue.component('stats-view', {
    data() {
        return {
            startPicker: moment().subtract(1, 'month').format('YYYY-MM-DD'),
            endPicker:moment().format('YYYY-MM-DD'),
        }
    },
    computed: {
        rangedExpenses() {

        }
    },
    template: `
    
        <v-content>
            <v-container mt-5>
            <center>
            <v-layout row>

            <h1>Start Date: </h1>
            <v-spacer></v-spacer>
            <h1>End Date:</h1>
            </v-layout row>
            <v-layout row>
                
                    <v-date-picker v-model="startPicker"></v-date-picker>
                   <v-spacer></v-spacer>
                    <v-date-picker v-model="endPicker"></v-date-picker>
                
                
                </v-layout row>
            </center>
            </v-container>
        </v-content>
    
    `

})

export default StatsView
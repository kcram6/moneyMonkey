const StatsView = Vue.component('stats-view', {
    data() {
        return {
            startPicker: moment().subtract(1, 'month').format('YYYY-MM-DD'),
            endPicker:moment().add(1, 'day').format('YYYY-MM-DD'),
        }
    },
    computed: {
        expenses() {
            const startUTC = moment(this.startPicker).unix()
            const endUTC = moment(this.endPicker).unix()
            return this.$store.getters.inRange(startUTC, endUTC)
        }, 
        items() {
            return [
                { text: 'TOTAL', value: this.total },
                { text: 'AVERAGE', value: this.average },
                { text: 'MINIMUM', value: this.minimum },
                { text: 'MAXIMUM', value: this.maximum },
            ]
        },
        total() {
            return this.expenses.reduce((acc, curr) => acc + curr.amount, 0)
        },
        average() {
            return this.total / this.expenses.length
        },
        minimum() {
            return this.expenses.sort((a, b) => {
                if (a.amount < b.amount) return -1
                if (a.amount > b.amount) return 1
                else return 0
            })[0].amount
        },
        maximum() {
            return this.expenses.sort((a, b) => {
                if (a.amount > b.amount) return -1
                if (a.amount < b.amount) return 1
                else return 0
            })[0].amount
        }
    },
    template: `
        <v-content>
            <v-container mt-5>
                    <v-layout row text-xs-center>
                        <v-container>
                            <h1>Start Date: </h1>
                            <v-date-picker v-model="startPicker"></v-date-picker>
                        </v-container> 
                        <v-container>
                            <h1>End Date:</h1>
                            <v-date-picker v-model="endPicker"></v-date-picker>
                        </v-container>
                    </v-layout>
                    <br><br><br>
                    <v-layout row justify-center>
                        <h1>Statistics</h1>
                    </v-layout>
                    
                    <v-layout row justify-center>
                        <v-flex xs8>
                            <div v-if='expenses.length'>
                                <v-data-table :items=items hide-actions hide-headers>
                                    <template slot='items' slot-scope='props'>
                                        <td class='text-xs-left'><b> {{ props.item.text }} </b></td>
                                        <td class='text-xs-center'> \$\{{ props.item.value.toFixed(2) }} </td>
                                    </template>
                                </v-data-table>
                            </div>
                        </v-flex>
                    </v-layout>
                    <br><br><br>
            </v-container>
        </v-content>
    
    `

})

export default StatsView
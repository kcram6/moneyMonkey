const template =  `
        
        


        <v-content>
            <v-container>
                <v-snackbar
                right
                :color="snackColor"
                :timeout="2000"
                v-model="snackbar"
                >
                {{ snackText }}
            </v-snackbar>

                <v-form class='ma-5' @keyup.native.enter='saveExpense'> 
                    <div style='display:flex;'>
                        <v-text-field style='width:calc(40% - 30px); margin:7px;' class='inputField' v-model='description' ref='descriptionRef' placeholder='Description' type='text'></v-text-field>
                        <v-text-field style='width:calc(40% - 30px); margin:7px;' class='inputField' v-model='amount' ref='amountRef'placeholder='Amount' type='text'></v-text-field>
                        <v-text-field style='width:calc(20% - 30px); margin:7px;' class='inputField' type='number' v-model='quantity' placeholder='Quantity' ref='quantityRef'></v-text-field><br/>
                    </div>

                    <v-btn @click='saveExpense' color="info">{{ changeButtonValue }}</v-btn>
                    <v-btn @click='clear' v-if='clearButtonVisible'>Clear</v-btn>

                    <v-alert :value='!valid.description' type='error'>
                        Enter Valid Description
                    </v-alert>

                    <v-alert :value='!valid.amount' type='error'>
                            Enter Valid Amount
                    </v-alert>
                    
                    <v-alert :value='!valid.quantity' type='error'>
                        Enter Valid Quantity 
                    </v-alert>
                </v-form>

                <h2 class='text-xs-center ma-3'>
                    Total Expenses:
                    <v-chip color='green' text-color='white'>
                        \$\{{total.toFixed(2)}}
                    </v-chip>
                </h2>

                <v-data-table :no-data-text='loadingText' :loading='loading' :headers='headers' :items='expenses' class='elevation-1' hide-actions>
                    <template slot='items' slot-scope='props'>
                        <td  class='text-xs-left'>
                            <v-icon v-if='expenseId === props.item._id'>
                                edit
                            </v-icon>
                        </td>
                        <td class='text-xs-left'>
                            <b>{{ props.item.description }}</b>
                        </td>
                        <td class='text-xs-left'>
                            <b>\$\{{ props.item.amount.toFixed(2) }}</b>
                        </td>
                        <td class='text-xs-left'>
                            <b>{{ props.item.quantity }}</b>
                        </td>
                        <td class='text-xs-left'>
                            <b>{{ formatDate(props.item.date) }}</b>
                        </td>
                        <td>
                            <v-tooltip bottom>
                                <span slot="activator">
                                    <v-btn @click='setEditingId(props.item._id)' outline fab small><v-icon>edit</v-icon></v-btn>
                                </span>
                                <span>Edit</span>
                            </v-tooltip>

                            <v-tooltip bottom>
                                    <span slot="activator">
                                        <v-btn @click='copyExpense(props.item._id)' outline fab small><v-icon>add_box</v-icon></v-btn>
                                    </span>
                                    <span>Duplicate</span>
                                    
                            </v-tooltip>

                            <v-tooltip bottom>
                                    <span slot="activator">
                                        <v-btn @click='setDeletingId(props.item._id)'outline fab small color='error'><v-icon>delete</v-icon></v-btn>
                                    </span>
                                    <span>Delete</span>
                                    
                            </v-tooltip>
                            <v-dialog :value="deletingId" persistent max-width="300">
                                    <v-card>
                                        <v-card-title class="headline">Are you sure?</v-card-title>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="info" @click="setDeletingId(null)">Cancel</v-btn>
                                            <v-btn color="error" @click="deleteExpense">Confirm</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>		
                                    
                            
                        </td>

                    </template>
                </v-data-table>
                
                <br><br><br>
        </v-container>


        </v-content>
        

`

export default template
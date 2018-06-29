const template = `
    <v-app :dark='dark'>
         <v-toolbar app>
            <v-toolbar-side-icon>
                <v-avatar>
                    <img :class="{inverted: theme === 'dark'}" src='dank.jpg' width='100' height='100' alt='nice'>
                </v-avatar>
            </v-toolbar-side-icon>
            <h1>&nbsp; {{ message }}</h1>
            &nbsp; &nbsp;<router-link to='/dash'>Home</router-link>
            &nbsp; &nbsp;<router-link to='/about'>About Us</router-link>
            &nbsp; &nbsp;<router-link to='/stats'>Stats</router-link>

            
            
            <v-spacer></v-spacer>
            <h4>Theme:</h4>&nbsp;&nbsp;&nbsp;
            <v-btn-toggle>
                <v-btn @click="setTheme('light')">light</v-btn>
                <v-btn @click="setTheme('dark')">dark</v-btn>
            </v-btn-toggle>

            <!--<v-chip @click="setTheme('light')" color='white'></v-chip>
            <v-chip @click="setTheme('dark')"  color='black'></v-chip>-->
        </v-toolbar>
        <router-view></router-view>
    </v-app>
`

export default template
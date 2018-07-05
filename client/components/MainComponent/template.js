const template = `
    <v-app :dark='dark'>
         <v-toolbar app>
            <v-toolbar-side-icon>
                <v-avatar>
                    <img :class="{inverted: theme === 'dark'}" src='dank.jpg' width='100' height='100' alt='nice'>
                </v-avatar>
            </v-toolbar-side-icon>
            <h1>&nbsp; {{ message }}</h1>
            <router-link to='/dash'><v-btn>Home</v-btn></router-link>
            <router-link to='/about'><v-btn>About</v-btn></router-link>
            <router-link to='/stats'><v-btn>Stats</v-btn></router-link>

            
            
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
<template>
  <v-app>

    <v-navigation-drawer fixed absolute temporary v-model="sideNav" color ="light-green lighten-3">
      <v-list nav dense>
        <v-list-item-group
                active-class="border" color="light-green darken-4">
          <v-list-item v-for="item in menuItems"
                       :key="item.title"
                       :to ="item.link">
            <v-list-item-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>{{item.title}}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>


    </v-navigation-drawer>
    <div>
      <v-toolbar
              color ="light-green lighten-4"
              dense>
        <v-app-bar-nav-icon
                @click.stop ="sideNav = !sideNav"
                class="hidden-sm-and-up"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">Meetings Manager</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only">
          <v-btn text v-for="item in menuItems" :key="item.title" :to ="item.link">
            <v-icon left dark>{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>


  export default {
    name: 'App',

    components: {
      //
    },

    data: () => ({
      sideNav: false,

      menuItems: [
        {icon: 'mdi-calendar', title: 'View meetings', link: '/meetings'},
        {icon: 'mdi-map-marker-outline', title: 'Organize meeting', link: '/createMeeting'},
        {icon: 'mdi-account', title: 'Profile', link: '/profile'},
        {icon: 'mdi-face', title: 'Sign up', link: '/signup'},
        {icon: 'mdi-pen-plus', title: 'Sign in', link: '/signin'},
      ]
    }),
  };
</script>

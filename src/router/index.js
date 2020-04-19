import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/components/home'
import Meetings from '@/components/Meetings/Meeting'
import CreateMeeting from '@/components/Meetings/CreateMeeting'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Meetingg from '@/components/Meetings/Meetingg'



Vue.use(VueRouter)




export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: home
    },
    {
      path: '/meetings',
      name: 'Meeting',
      component: Meetings
    },
    {
      path: '/createMeeting',
      name: 'CreateMeeting',
      component: CreateMeeting
    },
    {
      path: '/meetings/:id',
      name: 'Meeting',
      component: Meetingg
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signup',
      name: 'Sign up',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Sign in',
      component: Signin
    },
  ],
  mode: 'history'
})

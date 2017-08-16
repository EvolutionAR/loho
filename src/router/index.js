import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import New from '@/components/New'
import Mine from '@/components/Mine'
import Nearby from '@/components/Nearby'
import Productions from '@/components/Productions'
import Position from '@/components/Position'
import Register from '@/components/Register'
import Car from '@/components/Car'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',redirect:'/main'},
    {path: '*',redirect:'/main'},
    {path: '/main',name: 'Main',component: Main},
    {path: '/car/:title',name: 'Car',component: Car},
    {path: '/register',name: 'Register',component: Register},
    {path: '/new/:title/:tid',name: 'New',component: New},
    {path: '/nearby/:title/:cityId',name: 'nearby',component: Nearby},
    {path: '/mine/:title',name: 'Mine',component: Mine},
    {path: '/position/:city',name: 'Position',component: Position},
    {path: '/productions/:id',name: 'Productions',component: Productions},
  ]
})

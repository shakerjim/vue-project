import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

import homeContainer from "../components/container/homeContainer.vue"
import memberContainer from "../components/container/memberContainer.vue"
import cartContainer from "../components/container/cartContainer.vue"
import searchContainer from "../components/container/searchContainer.vue"
//
import newsList from "../components/news/list.vue"
import newsDetail from "../components/news/detail.vue"
//
import picList from "../components/pictures/list.vue"
import picDetail from "../components/pictures/detail.vue"
//
import goodsList from "../components/products/list.vue"
import goodsDetail from "../components/products/detail.vue"
import goodsDesc from "../components/products/desc.vue"
import goodsComment from "../components/products/comment.vue"



export default new VueRouter({
  routes:[
    {path:"/",component:homeContainer},
    {path:"/member",component:memberContainer},
    {path:"/cart",component:cartContainer},
    {path:"/search",component:searchContainer}, 

    {path:"/news/list",component:newsList},
    {path:"/news/detail/:id",component:newsDetail},

    {path:"/pic/list",redirect:"/pic/list/0"},
    {path:"/pic/list/:id",component:picList},
    {path:"/pic/detail/:id",component:picDetail},
    
    {path:"/goods/list",component:goodsList},
    {path:"/goods/detail/:id",component:goodsDetail,name:"goodsdetail"},
    {path:"/goods/desc/:id",component:goodsDesc},
    {path:"/goods/comment/:id",component:goodsComment},
    
  ]
})
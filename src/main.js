//1.导入Vue模块
import Vue from "vue"
//2.导入App.vue组件
import App from "./App.vue"
//3.导入Mint-ui
import Mint from "mint-ui"
import 'mint-ui/lib/style.css'
Vue.use(Mint)
//4.导入Mui的css
import "../lib/mui/dist/css/mui.css"
import "../lib/mui/examples/hello-mui/css/icons-extra.css"
//导入路由配置
import router from "./router/router"
//导入vue-resource
import VueResource from "vue-resource"
Vue.use(VueResource)

import store from "./store/store"







var vm=new Vue({
    el:"#app",
    router,
    store,
    render(createElement){
      return  createElement(App)
    }
  
})
// console.log(Vue)
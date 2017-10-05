import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carts: []
  },
  mutations: {
    addToCart(state, goods) {
      // 变更状态
      // goods {id:12,count:12}
      var carts = localStorage.getItem("carts");
      carts = carts ? JSON.parse(carts) : [];
      var flag = false;
      carts.forEach(v => {
        if (v.id === goods.id) {
          v.count += goods.count;
          flag = true
        }
      })
      if (!flag) {
        carts.push(goods)
      }
      localStorage.setItem("carts", JSON.stringify(carts))
      state.carts = carts
    },
    minusCount(state, id) {
      state.carts.forEach(v => {
        if (v.id == id) {
          v.count--;
        }

      })
      localStorage.setItem("carts", JSON.stringify(state.carts))
    },
    plusCount(state, id) {
      state.carts.forEach(v => {
        if (v.id == id) {
          v.count++;
        }
      
      })
      localStorage.setItem("carts", JSON.stringify(state.carts))
    },
    del(state, id) {
      var index = state.carts.findIndex(v => {
        return v.id = id
      });
      state.carts.splice(index, 1);
      localStorage.setItem("carts", JSON.stringify(state.carts))
    }
  },
  getters: {

    // ...
    getTotalCount: (state) => {
      var carts = localStorage.getItem("carts");
      state.carts = carts ? JSON.parse(carts) : [];
      var result = 0;
      state.carts.forEach(v => {
        result += v.count
      })
      return result
    },
    counts: (state) => {
      var obj = {};
      state.carts.forEach(v => {
        obj[v.id] = v.count
      })
      return obj
    }
  }
})
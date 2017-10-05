<template>
  <div>
    <div class="goods-list">
      <div class="mui-card" v-for="(item, index) in goodsList" :key="index">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="item.isSelect"></mt-switch>
            <img :src="picUrl + item.thumb_path" class="thumb_img">
            <div class="info">
              <h4>{{item.title}}</h4>
              <div class="box">
                <span class="price">￥{{item.sell_price}}</span>
                <div data-numbox-min="1" class="mui-numbox" style="height: 28px;">
                  <button type="button" class="mui-btn mui-numbox-btn-minus" @click="minusCount(item.id)">-</button>
                  <input type="number" v-model="$store.getters.counts[item.id]" class="mui-input-numbox">
                  <button type="button" class="mui-btn mui-btn-numbox-plus" @click="plusCount(item.id)">+</button>
                </div>
                <a href="#" @click.prevent="del(item.id)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <div class="amount">
              <p>总计（不含运费）</p>
              <p>
                已勾选商品
                <span class="red">{{totalCount}}</span> 件 总价：
                <span class="red">￥{{totalPrice}}</span>
              </p>
            </div>
            <button class="mint-button mint-button--danger mint-button--normal">
              <!---->
              <label class="mint-button-text">去结算</label>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import config from "../../config"
import mui from "../../../lib/mui/examples/hello-mui/js/mui.js"
import Vue from "vue"
export default {
  data() {
    return {
      apiUrl: config.apiUrl,
      picUrl: config.picUrl,
      goodsList: [],

    }
  },
  created() {
    var ids = this.$store.state.carts.map(v => {
      return v.id
    }).join(",")
    if (!ids) {
      return
    }
    this
      .$http.get(this.apiUrl + "/api/goods/getshopcarlist/" + ids)
      .then((res) => {
        var data = res.body
        console.log(res)
        if (data.status == 0) {
          data.message.forEach(v => {
            v.isSelect = true
          })
          this.goodsList = data.message;
          Vue.nextTick(function() {
            mui(".mui-numbox").numbox()
          })
        }
      })
  },
  methods: {
    minusCount(id) {
      this.$store.commit('minusCount', id);
    },
    plusCount(id) {
      this.$store.commit('plusCount', id)
    },
    del(id) {
      this.$store.commit('del', id);
      var index = this.goodsList.findIndex(v => {
        return v.id = id
      });
      this.goodsList.splice(index, 1)
    }
  },
  computed: {
    totalCount() {
      var selectedCount = this.goodsList.filter(v => {
        return v.isSelect
      })
      var sum = 0;
      selectedCount.forEach(v => {
        sum += this.$store.getters.counts[v.id]
      })
      return sum
    },
    totalPrice() {
      var selectedCount = this.goodsList.filter(v => {
        return v.isSelect
      })
      var price = 0;
      selectedCount.forEach(v => {
        price += this.$store.getters.counts[v.id] * v.sell_price
      })
      return price
    }
  }
}
</script>

<style scoped>
.goods-list .mui-card-content-inner {
  display: flex;
}


.goods-list .mui-card-content-inner .thumb_img {
  width: 60px;
  height: 60px;
}

.goods-list .mui-card-content-inner .info {
  flex: 1;
}

.goods-list .mui-card-content-inner .info h4 {
  font-size: 14px;
}

.goods-list .mui-card-content-inner .info .box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goods-list .mui-card-content-inner .info .box .price {
  font-size: 16px;
  color: red;
}

.mui-card-content-inner .amount {
  flex: 1;
}

.mui-card-content-inner .red {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
</style>
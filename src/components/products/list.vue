<template>
  <div class="goods-list">
    <div class="goods-item" v-for="(item, index) in goodsList" :key="index" @click="goto(item.id)">
      <img :src="item.img_url" alt="">
      <h4>{{item.title}}</h4>
      <div class="info">
        <p class="price">
          <span class="nowPrice">￥{{item.sell_price}}</span>
          <span>
            <del>￥{{item.market_price}}</del>
          </span>
        </p>
        <p class="sale">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="primary" size="large" :disabled="isShow" @click="getMore" v-show="this.goodsList.length>0">更多</mt-button>
  </div>
</template>
<script>
import config from "../../config.js"
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      apiUrl: config.apiUrl,
      pageindex: 1,
      goodsList: [],
      isShow: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    goto(id) {
      this.$router.push({ name: "goodsdetail", params: { id } })
    },
    getMore() {
      this.pageindex++;
      this.getData()
    },

    getData() {
      this
        .$http.get(this.apiUrl + "/api/getgoods?pageindex=" + this.pageindex)
        .then((res) => {
          console.log(res)
          if (res.body.status == 0) {
            var data = res.body.message;
            if (data.length > 0) {
              this.goodsList = this.goodsList.concat(data)
            } else {
              if (this.pageindex != 1) {
                Toast({
                  message: '没有更多信息了',
                  position: 'middle',
                  duration: 1000
                });
                this.isShow = true
              }
            }
          }
        }, () => { })
    }
  }
}
</script>
<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 3px;
}

.goods-list .goods-item {
  width: 48%;
  border: 1px solid #ccc;
  margin: 1%;
  box-shadow: 0 0 7px #aaa;
  padding: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.goods-list .goods-item img {
  width: 100%;
}

.goods-list .goods-item h4 {
  font-size: 14px;
}

.goods-list .goods-item .info p:nth-child(1) .nowPrice {
  color: red;
  font-size: 15px;
  margin-right: 8px;
}

.goods-list .goods-item .info p {
  margin: 0;
  margin-top: 10px;
  font-size: 13px;
}

.goods-list .goods-item .info {
  background-color: #eee;
}
</style>



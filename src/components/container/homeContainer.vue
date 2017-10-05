<template>
  <div>
       <swiper :picList="picList"> </swiper>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/news/list">
          <!-- <span class="mui-icon mui-icon-home"></span> -->
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/pic/list">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/goods/list">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/">
          <img src="../../images/menu9.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/">
          <img src="../../images/menu10.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import config from "../../config.js"
import swiper from "../subcomps/swiper.vue"
export default {
  data() {
    return {
      picList: [],
      apiUrl: config.apiUrl
    }
  },
  created() {
    this
      .$http.get(this.apiUrl + "/api/getlunbo")
      .then((res) => {
        if (res.status == 200) {
          console.log(res)
          var data = res.body;
          data.message.forEach(v => {
            v.img = this.apiUrl + v.img
          })
          this.picList = data.message
          console.log(data.message)
        }

      }, () => { })
  },
  components: {
    swiper
  }
}
</script>

<style scoped>
.mui-table-view-cell img {
  display: block;
  width: 100%;
}

.mui-grid-view.mui-grid-9 {
  border-left: none;
  background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
</style>
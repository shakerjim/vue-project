<template>
  <div class="news">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(item,index) in newsList" :key="index">
        <router-link :to="'/news/detail/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            {{item.title}}
            <p class='mui-ellipsis'>
              <span>发表时间:{{item.add_time|dateFormat}}</span>
              <span>点击:{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>

    </ul>
  </div>
</template>
<script>
import config from "../../config"
import "../../filters/datefilter.js"
export default {
  data() {
    return {
      newsList: [],
      apiUrl: config.apiUrl
    }
  },
  created() {
    this
      .$http.get(this.apiUrl + "/api/getnewslist")
      .then((res) => {
        console.log(res.body)
        if (res.body.status == 0) {
          var data = res.body
          this.newsList = data.message
        }
      }, () => { })
  }
}
</script>
<style scoped>
p {
  display: flex;
  color: #26A2FF;
  justify-content: space-between;
  margin-top: 6px;
  line-height: 15px;
}
</style>



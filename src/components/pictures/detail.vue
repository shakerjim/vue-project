<template>
  <div class="pic">
    <div class="title">
      <h4 v-text="dataList.title"></h4>
      <p class='mui-ellipsis'>
        <span>发表时间 : {{dataList.add_time|dateFormat}}</span>
        <span>点击:{{dataList.click}}次</span>
      </p>
    </div>
    <div class="imgList">
      <img class="preview-img" v-for="(item, index) in picList" :key="index" :src="item.src" height="100" @click="$preview.open(index, picList)">
    </div>
    <div class="info" v-html="dataList.content">

    </div>
    <comments :article-id="$route.params.id"></comments>
  </div>
</template>
<script>
import Vue from "vue"
import config from "../../config.js"
import comments from "../subcomps/comments.vue"
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
export default {
  data() {
    return {
      apiUrl: config.apiUrl,
      picUrl: config.picUrl,
      dataList: [],
      picList: []
    }
  },
  created() {
    this
      .$http.get(this.apiUrl + "/api/getimageInfo/" + this.$route.params.id)
      .then((res) => {
        // console.log(res)
        if (res.body.status == 0) {
          var data = res.body.message[0];
          this.dataList = data
        }

      }, () => { })
    this
      .$http.get(this.apiUrl + "/api/getthumimages/" + this.$route.params.id)
      .then((res) => {
        console.log(res)
        if (res.body.status == 0) {
          var data = res.body.message
          data.forEach(v => {
            v.src = this.picUrl + v.src;
            v.w = 600;
            v.h = 400;
          })
          this.picList = data
        }
      }, () => { })
  },
  methods: {

  },
  components: {
    comments
  }
}
</script>
<style scoped>
.imgList{
  padding: 10px 0;
}
.imgList img {
  margin: 1%;
  width: 23%;
}

.pic {
  padding: 0 10px;
}

p.mui-ellipsis {
  display: flex;
  color: #26A2FF;
  justify-content: space-between;
  margin-bottom: 5px;
}

.title {
  border-bottom: 1px solid #ccc;
}
</style>

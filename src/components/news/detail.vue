<template>
  <div class="detail">
    <div class="title">
      <h4 v-text="dataList.title"></h4>
      <p class='mui-ellipsis'>
        <span>发表时间 : {{dataList.add_time|dateFormat}}</span>
        <span>点击:{{dataList.click}}次</span>
      </p>
    </div>
    <div class="content">
      <div v-html="dataList.content"></div>
      <comments :article-id="$route.params.id"></comments>
    </div>
  </div>
</template>
<script>
import config from "../../config.js"
import comments from "../subcomps/comments.vue"
export default {
  data() {
    return {
      dataList: [],
      apiUrl: config.apiUrl
    }
  },
  created() {
    this
      .$http.get(this.apiUrl + '/api/getnew/' + this.$route.params.id)
      .then((res) => {
        // console.log(res.body.message[0])
        if (res.body.status == 0) {
          var data = res.body;
          this.dataList = data.message[0]
        }
      }, () => { })
  },
  components:{
    comments
  }
}
</script>
<style scoped>
.title {
  padding: 0 5px;
  border-bottom: 1px solid #ccc;
}

.content {
  padding: 5px 10px 0;
}

p.mui-ellipsis {
  display: flex;
  color: #26A2FF;
  justify-content: space-between;
  margin-bottom: 4px;
}
</style>


<template>
  <div>
    <div class="title">
      <h4 v-text="dataList.title"></h4>
    </div>
    <div class="content" v-html="dataList.content">
    </div>
  </div>
</template>
<script>
import config from "../../config"
export default {
  data() {
    return {
      dataList: {},
      apiUrl: config.apiUrl
    }
  },
  created() {
    this
      .$http.get(this.apiUrl + "/api/goods/getdesc/" + this.$route.params.id)
      .then((res) => {
        // console.log(res)
        if (res.body.status == 0) {
          var data = res.body.message[0];
          this.dataList = data
        }

      }, () => { })
  }
}
</script>
<style>
.title{
    border-bottom: 1px solid #ccc;
}
.content{
    padding:10px;
}
.content img{
    width: 100%
}

</style>
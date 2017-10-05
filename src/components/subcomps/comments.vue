<template>
  <div class="comments">
    <div class="comments-post">
      <h4>发表评论</h4>
      <hr>
      <textarea name="" id="" cols="30" rows="5" placeholder="请输入评论内容，最多输入120个字" v-model="commentContent"></textarea>
      <mt-button type="primary" size="large" @click="sendComment">发表评论</mt-button>
    </div>
    <div class="comments-list">
      <div class="comments-item" v-for="(item,index) in commentsList" :key="index">
        <div class="comments-title">
          <span>第{{index+1}}楼</span>
          <span>用户：{{item.user_name}}</span>
          <span>发表时间: {{item.add_time|dateFormat}}</span>
        </div>
        <div class="comments-info">
          {{item.content}}
        </div>
      </div>
    </div>
    <mt-button type="primary" size="large" :disabled="isShow" @click="getMore" v-show="this.commentsList.length>0">更多评论</mt-button>
  </div>
</template>
<script>
import config from "../../config.js";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      apiUrl: config.apiUrl,
      pageindex: 1,
      commentsList: [],
      isShow: false,
      commentContent: ""
    }
  },
  props: [
    "articleId"
  ],
  created() {
    this.getData()
  },
  methods: {
    sendComment() {
      if (this.commentContent.trim()) {
        this
          .$http.post(this.apiUrl + "/api/postcomment/" + this.articleId, { content: this.commentContent }, { emulateJSON: true })
          .then((res) => {
            if (res.body.status == 0) {
              var data = res.body.message
              this.commentsList.unshift({
                user_name: "匿名用户",
                content: this.commentContent,
                add_time: new Date().toGMTString()
              })
              this.commentContent = ""
            }
          }, () => { })
      } else {
        Toast({
          message: "评论提交成功",
          position: 'middle',
          duration: 1000
        });
      }

    },
    getData() {
      this
        .$http.get(this.apiUrl + "/api/getcomments/" + this.articleId, { params: { pageindex: this.pageindex } })
        .then((res) => {
          if (res.body.status == 0) {
            var data = res.body.message;
            if (data.length > 0) {
              this.commentsList = this.commentsList.concat(data)
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
          // console.log(res)
        }, () => { })
    },
    getMore() {
      this.pageindex++;
      this.getData()
    }
  }

}
</script>
<style scoped>
textarea {
  margin-bottom: 0;
}

.comments-title {
  margin: 5px auto;
  background-color: #ccc;
  line-height: 30px;
  font-size: 16px;
}

.comments-info {
  text-indent: 2em;
}

.comments-item {
  margin-bottom: 5px;
}
</style>



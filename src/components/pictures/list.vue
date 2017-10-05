<template>
  <div class="pic">
    <div id="slider" class="mui-slider ">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a class="mui-control-item" @click.prevent="getcategory(0)">
            全部
          </a>
          <a class="mui-control-item" v-for="(item,index) in category" :key="index" @click.prevent="getcategory(item.id)">
            {{item.title}}
          </a>
        </div>
      </div>

    </div>
    <div class="pictureList">
      <ul>
        <li v-for="(item,index) in picList" :key="index">
          <router-link :to='"/pic/detail/"+item.id'>
            <img v-lazy="picUrl + item.img_url">
            <div>
              <p>{{item.title}}</p>
              <p>{{item.zhaiyao}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import mui from "../../../lib/mui/examples/hello-mui/js/mui"
import config from "../../config.js"

export default {
  data() {
    return {
      apiUrl: config.apiUrl,
      category: [],
      picList: [],
      picUrl: config.picUrl
    }
  },
  mounted() {
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005
    });
  },
  created() {
    this
      .$http.get(this.apiUrl + "/api/getimgcategory")
      .then((res) => {
        var data = res.body
        // console.log(res)
        if (data.status == 0) {
          this.category = data.message
        }
      }, () => { })
    this.getpicList()
  },
  methods: {
    getpicList() {
      this
        .$http.get(this.apiUrl + "/api/getimages/" + this.$route.params.id)
        .then((res) => {
          console.log(res)
          if (res.body.status == 0) {
            var data = res.body.message;
            this.picList = data
          }
        }, () => { })
    },
    getcategory(id) {
      this.$router.push("/pic/list/" + id)
    }
  },
  watch: {
    $route() {
      this.getpicList()
    }
  }
}
</script>
<style scoped>
.pic {
  background-color: #ccc;
}

.mui-scroll {
  background-color: #fff;
}

ul {
  padding: 0;
  margin-top: 0;
}

ul div {
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, .4);
  margin-right: 10px;
  padding: 0 5px;
}

ul div p {
  color: #fff;
}

li {
  list-style: none;
  background-color: #ccc;
  margin-bottom: 10px;
  box-shadow: 0 0 15px #999;
  position: relative;
  padding: 0 10px;
}

img {
  display: block;
}

img[lazy=loaded] {
  width: 100%;
}

img[lazy=loading] {
  width: 400px;
  height: 300px;
  margin: auto;
}
</style>



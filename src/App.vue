<template>
  <div class="app">
    <!-- 1.头部 -->
    <mt-header fixed title="固定在顶部">
      <!-- <router-link to="/" slot="left"> -->
        <mt-button icon="back" slot="left" v-if="$route.path!='/'" @click.prevent="$router.go(-1)">返回</mt-button>
      <!-- </router-link> -->
    </mt-header>
    <!-- 2.router-view -->
    <router-view></router-view>
    <!-- 3.底部导航 -->
    <nav class="mui-bar mui-bar-tab">
      <a class="mui-tab-item mui-active" @click='goto("/")'>
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </a>
      <a class="mui-tab-item" @click='goto("/member")'>
        <span class="mui-icon mui-icon-contact">

        </span>
        <span class="mui-tab-label">会员</span>
      </a>
      <a class="mui-tab-item" @click='goto("/cart")'>
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">{{$store.getters.getTotalCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </a>
      <a class="mui-tab-item" @click='goto("/search")'>
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </a>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    goto(route) {
      this.$router.push(route)
    }
  }
}

</script>
<style lang="css">
body {
  background-color: white;
}

.app {
  padding-top: 40px;
  padding-bottom: 50px;
}
</style>

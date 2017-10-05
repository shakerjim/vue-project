<template>
  <div>
    <mt-swipe :auto="0">
      <mt-swipe-item v-for="(item,index) in picList" :key="index">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>

export default {
  props: ["picList"],

}
</script>
<style scoped>
.mint-swipe {
  height: 180px;
}

.mint-swipe-item img{
    display: block;
    max-width: 100%;
    height: 180px;
    margin: 0 auto;
}



</style>



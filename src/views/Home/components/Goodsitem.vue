<!-- 把商品页面中的小模块抽离出来使用 -->
<!-- 实现代码复用的情况 -->
<script setup>
  //  定义一个数据用来接收数据 
  defineProps({
    good:{
      type:Object,
      default:()=>({})
    }
  })
</script>

<template >
  <!--定义一个数据用来接收数据-->
  <RouterLink to="/" class="goods-item">
        <img v-img-lazy="good.picture" alt="" />
        <p class="name ellipsis">{{ good.name }}</p>
        <p class="desc ellipsis">{{ good.desc }}</p>
        <p class="price">&yen;{{ good.price }}</p>
  </RouterLink>
</template>

<style lang="scss">

.goods-item {
      display: block;
      width: 220px;
      padding: 20px 30px;
      text-align: center;
      transition: all .5s;

      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      }

      img {
        width: 160px;
        height: 160px;
      }

      p {
        padding-top: 10px;
      }

      .name {
        font-size: 16px;
      }

      .desc {
        color: #999;
        height: 29px;
      }

      .price {
        color: $priceColor;
        font-size: 20px;
      }
    }
</style>
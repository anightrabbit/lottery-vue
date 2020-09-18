<template>
  <ul class="products">
    <template v-for="item in data">
      <li v-if="item.awardable" :key="item.id">
        <img class='product-img' :src="item.resource" />
        <p class='product-txt'>{{item.title.replace(/\|/g," ")}}</p>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'PrizeProducts',
  props: {
    data: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  li {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -ms-flex-preferred-size: 30%;
    flex-basis: 30%;
    color: #fff;
    float: left;
    width: 30%;
    margin: 0 1.5% 10px;
    color: #fff;
    background: #FF6B5D;
    border-radius: 10px;
    overflow:hidden;
  }
  .product-img {
    display: block;
    border-radius: 10px;
    height: 60px;
    background: #fff;
  }
  .product-txt {
    padding: 0 10px;
    line-height: 30px;
    height: 30px;
    text-align: center;
  }
  &::after {
    content: " ";
    display: block;
    clear: both;
  }
}
</style>

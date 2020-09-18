<template>
  <section class="infor">
    <h2 class='title'><span>{{ title }}</span></h2>
    <article v-if="content" v-html="content"></article>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'PrizeInfor',
  props: {
    title: String,
    content: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.infor {
  padding: 10px 0;
  color: #FFF;
  font-size:12px;
  line-height:16px;
  .title {
    position: relative;
    line-height: 30px;
    text-align: center;
    color: #fff;
    margin-bottom: 10px;
    font-size: 16px;
    span {
      z-index: 9;
      display: inline-block;
      width: 90px;
      position: relative;
      &::before {
        content: "\2022";
        color: #fff;
        font-size: 26px;
        position: absolute;
        right: -2px;
        top: 1px;
      }
      &::after {
        content: "\2022";
        font-size: 26px;
        color: #fff;
        position: absolute;
        left: -2px;
        top: 1px;
      }
    }
    &::before {
      right: 0;
    }
    &::after {
      left: 0;
    }
    &::after, &::before {
      display: block;
      content: " ";
      width: calc(50% - 45px);
      height: 1px;
      background: #fff;
      position: absolute;
      top: 15px;
    }
  }
}
</style>

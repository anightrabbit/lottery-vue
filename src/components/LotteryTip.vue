<template>
  <section class="tips" @click='hide'>
    <div class='tips-box'>
      <img v-if="type" src='../assets/smile.png' class='smile' />
      <img v-if="!type" src='../assets/sad.png' class='sad' />
      <div class='tips-content'>
        <p>很遗憾<br />您和大奖擦肩而过</p>
        <button>返回主场</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LotteryTip',
  props: {
    type: Boolean,
    message: String
  },
  methods: {
    hide () {
      this.$emit('hide')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tips {
  position: fixed;
  z-index:999;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background:rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: center;
  .tips-box {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .tips-content {
      position:absolute;
      left:0;
      right:0;
      bottom:20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      line-height: 20px;
      button {
        background:#FFCC00;
        display:block;
        color: #000;
        border:none;
        border-radius: 20px;
        font-size:18px;
        padding: 5px 30px;
        margin-top:20px;
      }
    }
  }
  img {
    display:block;
    width:100%;
    height: auto;
    &.sad {
      width: 80%;
    }
  }
}
</style>

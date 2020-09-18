<template>
  <section class="lotter">
    <img src='../assets/turnable@3x.png' class='turnable' />
    <img src='../assets/go@3x.png' class='go' @click="getAward" />
    <canvas class="canvas" :class="{'on':reloadStatus}" :style="{'-webkit-transform':'rotate('+(angle*9)+'deg)','transition': 'rotate('+(angle*9)+'deg)'}" id="canvas" :width="width" :height="width"></canvas>
  </section>
</template>

<script>
import { postLottery } from '../model/'
export default {
  name: 'Lottery',
  props: {
    prize: Array
  },
  watch: {
    prize (val) {
      if (val && val.length) {
        this.initCanvas()
      }
    }
  },
  data () {
    return {
      reloadStatus: false,
      angle: 0,
      width: window.innerWidth >= 750 ? 750 * 9 / 10 : window.innerWidth * 9 / 10,
      colors: ['#dcf2fa', '#edfbff', '#ffffff']
    }
  },
  methods: {
    initCanvas () {
      const canvas = document.getElementById('canvas')
      if (canvas.getContext) {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, this.width, this.width)
        this.prize.map((item, index) => {
          const imgObj = new Image()
          imgObj.src = item.secondary
          imgObj.onload = this.img2Canvas(ctx, index, imgObj)
        })
      }
    },
    img2Canvas (ctx, i, img) {
      const vm = this
      const len = vm.prize.length
      const angle = (2 / len) * Math.PI
      const r = vm.width / 2
      const text = vm.prize[i].title ? vm.prize[i].title.split('|') : ''
      ctx.strokeStyle = vm.colors[i % vm.colors.length]
      ctx.fillStyle = vm.colors[i % vm.colors.length]
      ctx.font = 'bold 10px Microsoft YaHei'
      ctx.beginPath()
      ctx.arc(r, r, parseInt(vm.width * 4 / 9 - 5), angle * i, angle * (i + 1), false)
      ctx.arc(r, r, parseInt(vm.width * 1 / 9), angle * (i + 1), angle * i, true)
      ctx.stroke()
      ctx.fill()
      ctx.save()
      ctx.translate(r + (Math.cos(angle * i + angle / 2) * r) * 4 / 5, r + (Math.sin(angle * i + angle / 2) * r) * 4 / 5)
      ctx.rotate(angle * i + angle / 2 + Math.PI / 2)
      ctx.fillStyle = '#ff3333'
      if (vm.prize[i].awardable) {
        ctx.drawImage(img, -r / 6, 0, r / 3, r / 3)
        text.forEach((val, index) => {
          ctx.fillText(val, -ctx.measureText(val).width / 2, r * 3 / 7 + 14 * index)
        })
      } else {
        ctx.drawImage(img, -r / 6, r / 6, r / 3, r / 3)
      }
      ctx.restore()
    },
    async getAward () {
      if (!localStorage.getItem('token')) {
        return this.$emit('handleLottery', 0)
      }
      const res = await postLottery()
      if (res && res.code === '-1') {
        this.$emit('handleLottery', 2)
      }
      if (res && res.code === '0') {
        this.rotate(res.data.id)
        this.$emit('handleLottery', 1)
      }
    },
    rotate (prizeId) {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.lotter {
  position: relative;
  .turnable {
    display:block;
    width: 100%;
  }
  .canvas {
    position: absolute;
    z-index: 8;
    left: 0;
    top: 0;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    &.on {
      -webkit-transition: all 3s ease-out;
      transition: all 3s ease-out
    }
  }
  .go {
    position: absolute;
    z-index: 9;
    width: 20%;
    left: 40%;
    top: 38%;
  }
}

</style>

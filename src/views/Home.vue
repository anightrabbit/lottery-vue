<template>
  <div class="home" :style="{'background':attributes.bgImgMiddle?'url('+attributes.bgImgMiddle+') center top repeat-y':attributes.bgColor, 'background-size':attributes.bgImgMiddle?'100% auto':''}">
    <img v-if="attributes.bgImgTop" :src='attributes.bgImgTop' class='banner' />
    <div class='content'>
      <Lottery :prize="proudcts" @handleLottery="handleLottery" />
      <PrizeInfor title="奖品说明">
        <PrizeProducts :data="proudcts" />
      </PrizeInfor>
      <PrizeInfor title="活动规则" :content="data.prizeDescription"/>
      <PrizeInfor title="开奖方式" :content="data.prizeMothod"/>
      <PrizeInfor title="活动说明" :content="data.prizeMemo"/>
      <LotteryTip :type='lotteryType' v-if="showTip" @hide='showTip=false' />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PrizeInfor from '@/components/PrizeInfor.vue'
import PrizeProducts from '@/components/PrizeProducts.vue'
import Lottery from '@/components/Lottery'
import LotteryTip from '@/components/LotteryTip'
import { getPrize } from '../model/'
import { loginURL } from '../config/constants'
export default {
  name: 'Home',
  components: {
    PrizeInfor,
    PrizeProducts,
    Lottery,
    LotteryTip
  },
  data () {
    return {
      data: {},
      attributes: {},
      proudcts: [],
      lotteryType: false,
      showTip: false
    }
  },
  methods: {
    async getPrize () {
      const res = await getPrize()
      if (res.responseCode === '0' && res.data) {
        this.data = res.data
        if (res.data.proudcts && res.data.proudcts.length) this.proudcts = res.data.proudcts
        if (this.data.attributes && this.data.attributes.length) this.data.attributes.map((item, index) => (this.attributes[item.name] = item.value))
      }
    },
    handleLottery (type) {
      if (!type) {
        window.location.href = loginURL + window.encodeURIComponent(window.location.href)
      } else if (type === 1) {
        this.lotteryType = true
        this.showTip = true
      } else if (type === 2) {
        this.lotteryType = false
        this.showTip = true
      } else {
        this.showTip = false
      }
    }
  },
  created () {
    this.getPrize()
  }
}
</script>
<style scoped lang="scss">
.banner {
  display: block;
  width: 100%;
}
.content {
  padding: 0 5%;
}
</style>

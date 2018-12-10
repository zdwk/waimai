<template>
  <div>
    <ShopHeader />
    <div class="tab">
      <div class="tab-item">
        <a @click.prevent="goToLink('/shop/goods')"
           :class="{'router-link-active': $route.path === '/shop/goods'}"
           href="">点餐</a>
      </div>
      <div class="tab-item">
        <a @click.prevent="goToLink('/shop/ratings')"
           :class="{'router-link-active': $route.path === '/shop/ratings'}"
           href="">评价</a>
      </div>
      <div class="tab-item">
        <a @click.prevent="goToLink('/shop/info')"
           :class="{'router-link-active': $route.path === '/shop/info'}"
           href="">商家信息</a>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader'
import { mapActions } from 'vuex'
export default {
  mounted () {
    this.getShopInfo()
  },
  methods: {
    ...mapActions(['getShopInfo']),
    goToLink (url) {
      this.$router.replace(url)
    }
  },
  components: {
    ShopHeader
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl'
.tab
  height 40px
  line-height 40px
  background #fff
  bottom-border-1px(rgba(7, 17, 27, 0.1))
  .tab-item
    float left
    width 33.33333%
    text-align center
    font-size 14px
    color rgb(77, 85, 93)
    a
      display block
      position relative
      &.router-link-active
        color #02a774
        &::after
          content ''
          position absolute
          left 50%
          bottom 1px
          width 35px
          height 2px
          transform translateX(-50%)
          background #02a774
</style>

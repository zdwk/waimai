<template>
  <div>
    <ShopHeader />
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods"
                     replace
                     :class="{'router-link-active': $route.path === '/shop/goods'}">点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings"
                     replace
                     :class="{'router-link-active': $route.path === '/shop/ratings'}">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info"
                     replace
                     :class="{'router-link-active': $route.path === '/shop/info'}">商家信息</router-link>
      </div>
    </div>
    <!-- keep-alive 缓存路由 -->
    <keep-alive>
      <router-view />
    </keep-alive>
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
    ...mapActions(['getShopInfo'])
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

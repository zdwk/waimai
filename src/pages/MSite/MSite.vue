<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link tag="span"
                   to="/search"
                   slot="left"
                   class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>

      <router-link tag="span"
                   :to="userInfo._id ? 'userInfo' : '/login'"
                   slot="right"
                   class="header_login">
        <span class="header_login_text">
          <span v-if="!userInfo._id ">登录|注册</span>
          <i v-else
             class="iconfont icon-person"></i>
        </span>
      </router-link>

    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div v-if="categorys.length"
           class="swiper-container">
        <div class="swiper-wrapper">

          <div v-for="(categorys, i) in categorysArr"
               :key="i"
               class="swiper-slide">
            <a v-for="(item, i) in categorys"
               :key="i"
               href="javascript:"
               class="link_to_food">
              <div class="food_container">
                <img :src="baseImageUrl + item.image_url">
              </div>
              <span>{{ item.title }}</span>
            </a>
          </div>

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination banner"></div>
      </div>
      <img v-else
           src="./images/msite_back.svg"
           alt="back">
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <div class="shop_container">
        <ShopList />
      </div>
    </div>
  </section>

</template>

<script>
import { mapState, mapActions } from 'vuex'

import HeaderTop from '../../components/HeaderTop/HeaderTop'
import ShopList from '../../components/ShopList/ShopList'
import Swiper from 'swiper'
export default {
  data () {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  components: {
    HeaderTop,
    ShopList
  },
  methods: {
    ...mapActions(['getCategorys', 'getShops'])
  },
  mounted () {
    this.getCategorys()
    this.getShops()
  },
  computed: {
    ...mapState(['address', 'categorys', 'userInfo']),
    categorysArr () {
      // console.log(this)
      // 根据 categorys 一维数组生成一个二维数组，小数组中的元素个数最大是 8
      const { categorys } = this
      const arr = []  // 准备空的二维数组
      let minArr = [] // 准备空的小数组
      categorys.forEach(item => {
        // 如果 minArr 满了，创建一个新的
        if (minArr.length === 8) {
          minArr = []
        }
        // 如果 minArr 是空的，将小数组保存到大数组中
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        // 将当前分类保存到小数组中
        minArr.push(item)
      })
      return arr
    }
  },
  watch: {
    categorys (newVal, oldVal) {
      // 侦听 categorys 是否有数据，categorys 有数据了， 在异步更新界面之前
      // $nextTick 是 vue 提供的界面更新之后的回调
      // 一旦完成界面更新， 立即调用（此条语句要写在数据更新之后）
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import 'swiper/dist/css/swiper.min.css'
@import '../../common/stylus/mixins.styl'
.icon-sousuo
  font-size 20px
  color #fff
&.msite // 首页
  width 100%
  overflow hidden
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
    .shop_container
      margin-bottom 50px
</style>
<style>
/* 分页器是 vue 挂载后创建的，因此覆盖样式必须写在 scoped 样式之外 */
.banner .swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  display: inline-block;
  background: #ccc;
  margin: 0 2px;
  border-radius: 999999px;
}
.banner .swiper-pagination-bullet-active {
  background: #02a774;
}
</style>

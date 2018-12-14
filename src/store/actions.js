/**
 * 通过 mutations 间接更新 state 的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-tyoe'
import {
  reqAddress,
  reqFoodsCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqSearchShop
} from '../api'
export default {
  // 异步获取地址
  async getAddress({
    commit,
    state
  }) {
    const geohash = state.latitude + ',' + state.longitude
    // 发送异步 axios 请求
    const result = await reqAddress(geohash)

    if (result.code === 0) {
      const address = result.data
      // 提交一个 mutation
      commit(RECEIVE_ADDRESS, {
        address
      })
    }
  },

  // 异步获取食品分类列表
  async getCategorys({
    commit
  }) {
    const result = await reqFoodsCategorys()
    if (result.code === 0) {
      const categorys = result.data
      // 提交一个 mutation
      commit(RECEIVE_CATEGORYS, {
        categorys
      })
    }
  },
  // 异步获取商家列表
  async getShops({
    commit,
    state
  }) {
    const {
      latitude,
      longitude
    } = state
    const result = await reqShops(latitude, longitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {
        shops
      })
    }
  },
  // 同步记录用户信息(用户信息已在登录时获取，现在传递给 vuex)
  recordUser({
    commit
  }, userinfo) {
    commit(RECEIVE_USER_INFO, userinfo)
  },

  // 异步获取用户信息
  async getUserInfo({
    commit
  }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userinfo = result.data
      commit(RECEIVE_USER_INFO, userinfo)
    }
  },

  // 异步退出登录
  async getLogout({
    commit
  }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },

  // 异步获取商品列表
  async getShopGoods({
    commit
  }, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      commit(RECEIVE_GOODS, result.data)
      // 数据更新，通知组件数据已改变
      callback && callback()
    }
  },
  // 异步获取商家评价
  async getShopRatings({
    commit
  }, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      commit(RECEIVE_RATINGS, result.data)
      callback && callback()
    }
  },
  // 异步获取商家信息
  async getShopInfo({
    commit
  }, callback) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      commit(RECEIVE_INFO, result.data)
    }
  },
  // 同步 更新 food 中的 count 数量
  updateFoodCount({
    commit
  }, {
    isAdd,
    food
  }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, food)
    } else {
      commit(DECREMENT_FOOD_COUNT, food)
    }
  },
  // 同步清空购物车
  clearCart({
    commit
  }) {
    commit(CLEAR_CART)
  },
  // 异步搜索商家列表
  async searchShops({
    commit,
    state
  }, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {
        searchShops
      })
    }
  }

}

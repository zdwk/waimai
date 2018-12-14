/**
 * 直接更新 state 的多个对象
 */
import Vue from 'vue'

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
export default {
  [RECEIVE_ADDRESS](state, {
    address
  }) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, {
    categorys
  }) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, {
    shops
  }) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO](state) {
    state.userInfo = {}
  },
  [RECEIVE_GOODS](state, goods) {
    state.goods = goods
  },
  [RECEIVE_RATINGS](state, ratings) {
    state.ratings = ratings
  },
  [RECEIVE_INFO](state, info) {
    state.info = info
  },
  [INCREMENT_FOOD_COUNT](state, food) {
    if (!food.count) {
      // 第一次增加
      // food.count = 1 // 新增属性（没有数据绑定）
      Vue.set(food, 'count', 1)
      // 将 food 添加到 cartFoods
      state.cartFoods.push(food)
      // 两个引用变量指向同一个对象，
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, food) {
    if (food.count) {
      // 只有有值才去减
      food.count--
      if (food.count === 0) {
        // 将 food 从 cartFoods 中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART](state) {
    //清除 foods 中的 count
    state.cartFoods.forEach(food => food.count = 0)
    // 移除购车中所有购物项
    state.cartFoods = []
  },
  [RECEIVE_SEARCH_SHOPS](state, searchs) {
    state.searchShops = searchs
  }
}

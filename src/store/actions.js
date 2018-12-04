/**
 * 通过 mutations 间接更新 state 的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-tyoe'
import {
  reqAddress,
  reqFoodsCategorys,
  reqShops
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
  }
}

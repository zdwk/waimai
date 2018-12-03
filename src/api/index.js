/**
 * 包含 n 个接口请求函数的模块
 * 函数的返回值： promise 对象
 */
import ajax from './ajax'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`/position/${geohash}`)

// 2、获取食品分类列表
export const reqFoodsTypes = () => ajax('/index_category')

// 3、根据经纬度获取商品列表
export const reqShopList = (latitude, longitude) => ajax('/shops', {
  latitude,
  longitude
})

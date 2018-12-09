/**
 * 使用 mockjs 提供 mock 数据接口
 */
import Mock from 'mockjs'
import Data from './data.json'

// 返回商品 goods 的接口
Mock.mock('/shop_goods', {
  code: 0,
  data: Data.goods
})

// 返回评价 ratings 的接口
Mock.mock('/shop_ratings', {
  code: 0,
  data: Data.ratings
})

// 返回商家 info 的接口
Mock.mock('/shop_info', {
  code: 0,
  data: Data.info
})

// 不需要向外暴露任何数据，只需要保存能执行即可

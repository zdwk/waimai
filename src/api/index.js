/**
 * 包含 n 个接口请求函数的模块
 * 函数的返回值： promise 对象
 */
import ajax from './ajax'

// const BASE_URL = 'http://localhost:3000'
const BASE_URL = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)

// 2、获取食品分类列表
export const reqFoodsCategorys = () => ajax(BASE_URL + '/index_category')

// 3、根据经纬度获取商铺列表
export const reqShops = (latitude, longitude) => ajax(BASE_URL + '/shops', {
  latitude,
  longitude
})

// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL + '/search_shops', {
  geohash,
  keyword
})

// 6、用户名密码登录
export const reqPwdLogin = ({
  name,
  pwd,
  captcha
}) => ajax(BASE_URL + '/login_pwd', {
  name,
  pwd,
  captcha
}, 'POST')

// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode?phone=' + phone)

// 8、手机号验证码登录
export const reqSmsLogin = (phone, code) => ajax(BASE_URL + 'login_sms', {
  phone,
  code
}, 'POST')

// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')

// 10、用户退出
export const reqLogout = () => ajax(BASE_URL + '/logout')

// 因为是获取 mock 模拟数据，所以不加 BASE_URL
// 获取商家信息
export const reqShopInfo = () => ajax('/shop_info')

// 获取商家评价
export const reqShopRatings = () => ajax('/shop_ratings')

// 获取商家商品
export const reqShopGoods = () => ajax('/shop_goods')

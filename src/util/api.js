import request from './request'

// 调用搜索接口
export const search = (keywords) => {
  return request.get('/v1_0/search?q='+keywords)
}

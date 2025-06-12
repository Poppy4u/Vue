// 导入网络模块
import httpInstance from '@/utils/http.js'

export const getGoodsAPI= (id)=>{
  return httpInstance({
    url:'/goods',
    params:{
      id
    }
  })
}

export const fetchHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return httpInstance({
    url:'/goods/hot',
    params:{
      id, 
      type, 
      limit
    }
  })
}
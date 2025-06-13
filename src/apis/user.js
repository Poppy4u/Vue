import httpInstance from '../utils/http'

// 登录接口（与Node.js后端对接）
export const loginAPI = ({ account, password }) => {
  return httpInstance({
    url: '/api/user/login',
    method: 'POST',
    data: {
      username: account, // 注意后端字段为username
      password
    }
  })
}

// 获取用户信息（需要用户id）
export const getUserInfoAPI = (id) => {
  return httpInstance({
    url: '/api/user/info',
    method: 'GET',
    params: {
      id
    }
  })
}

// 修改用户名
export const updateUserNameAPI = ({ id, username }) => {
  return httpInstance({
    url: '/api/user/update',
    method: 'POST',
    data: {
      id,
      username
    }
  })
}

// 保留原有的获取猜你喜欢接口（如需用到）
export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance({
    url: '/goods/relevant',
    params: {
      limit
    }
  })
}
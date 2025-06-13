// axios基础的封装
import axios from 'axios'
import { useUserStore } from '@/stores/user.js'
import { ElMessage } from 'element-plus'

// 创建axios实例
const httpInstance = axios.create({
  // === 修改点：后端API地址 ===
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 1.从pinia获取token数据（如果你的新后端不需要token，可以注释掉下面这几行）
  const userStore = useUserStore()
  const token = userStore.userInfo.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
},
e => Promise.reject(e)
)

// axios响应拦截器
httpInstance.interceptors.response.use(
  res => res.data,
  e => {
    // 统一错误提示
    ElMessage({
      type: 'warning',
      message: e.response?.data?.message || '请求失败'
    })
    // 如果你的后端返回401错误需要跳转登录页，可以解除注释
    // if (e.response && e.response.status === 401) {
    //   const userStore = useUserStore()
    //   userStore.clearUserInfo()
    //   // router.push('/login') // 需要引入router
    // }
    return Promise.reject(e)
  }
)

export default httpInstance
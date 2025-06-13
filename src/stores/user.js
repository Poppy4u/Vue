// 用户登录与信息管理（Node.js后端适配版）

import { loginAPI, getUserInfoAPI, updateUserNameAPI } from '@/apis/user.js'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart.js'

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  // 用户信息
  const userInfo = ref({})

  // 登录并获取用户信息
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    if (res.code === 0) {
      userInfo.value = res.data
      // 可选：登录后合并购物车
      mergeCartAPI &&
        mergeCartAPI(
          cartStore.cartList.map(item => ({
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          }))
        )
      cartStore.updateCartList && cartStore.updateCartList()
      return true
    }
    return false
  }

  // 退出登录，清空用户和购物车信息
  const clearUserInfo = () => {
    userInfo.value = {}
    cartStore.clearCart && cartStore.clearCart()
  }

  // 获取用户详细信息（通过id）
  const fetchUserInfo = async (id) => {
    const res = await getUserInfoAPI(id)
    if (res.code === 0) {
      userInfo.value = res.data
    }
  }

  // 修改用户名
  const updateUserName = async (username) => {
    const res = await updateUserNameAPI({ id: userInfo.value.id, username })
    if (res.code === 0) {
      userInfo.value.username = username
      return true
    }
    return false
  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo,
    fetchUserInfo,
    updateUserName
  }
}, {
  persist: true
})
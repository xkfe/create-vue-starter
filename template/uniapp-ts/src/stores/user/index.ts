import { defineStore } from 'pinia'

export const useLoginStore = defineStore('user', () => {
  const loginInfo = reactive({
    token: '',
  })
  const userInfo = reactive({})

  function setLoginInfo() {}
  function clearLoginInfo() {}

  function setUserInfo() {}
  function clearUserInfo() {}

  return { loginInfo, setLoginInfo, clearLoginInfo, userInfo, setUserInfo, clearUserInfo }
}, {
  persist: {
    enabled: true,
    H5Storage: window?.localStorage,
  },
})

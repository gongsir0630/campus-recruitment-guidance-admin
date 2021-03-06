import http from '@/utils/request'

function login(data) {
  return http.post(`/admin/user/loginByPass`, {
    ...data
  })
}

function loginByTel(data) {
  return http.post(`/admin/user/loginByTel`, {
    ...data
  })
}

function getInfo(token) {
  return http.get(`/admin/user/mine`)
}

function logout() {
  return null
}

function getList() {
  return http.get(`/admin/user/list`)
}

export default {
  login,
  loginByTel,
  logout,
  getInfo,
  getList
}

import { getToken, setToken, removeToken } from '@/utils/auth'
import api from '@/api/index'

const state = {
  token: getToken(),
  isLogin: false,
  userInfo: {
    userId: '',
    password: '',
    nickName: '',
    avatar: '',
    phoneNumber: '',
    email: ''
  },
  adminUser: {
    total: 0,
    list: [{
      userId: '',
      password: '',
      nickName: '',
      avatar: '',
      phoneNumber: '',
      email: ''
    }]
  }
}

const mutations = {
  SET_ADMIN_USER(state, payload) {
    if (payload) {
      state.adminUser.list = payload
      state.adminUser.total = payload.length
    }
  },
  SET_TOKEN(state, payload) {
    state.token = payload
    setToken(payload)
    state.isLogin = true
  },
  CLEAR_TOKEN(state) {
    state.token = ''
    removeToken()
  },
  SET_USERINFO(state, payload) {
    if (payload) {
      state.userInfo = payload
    }
  },
  SET_LOGIN_STATUS(state, payload) {
    state.isLogin = payload
  }
}

const actions = {
  getAdminUserList({ commit }, payload) {
    return api.user.getList()
      .then(res => {
        commit('SET_ADMIN_USER', res.data)
      })
  },
  setUserInfo(context, payload) {
    context.commit('SET_USERINFO', payload)
  },
  setToken({ commit }, payload) {
    commit('SET_TOKEN', payload)
  },
  setLoginStatus(context, payload) {
    context.commit('SET_LOGIN_STATUS', payload)
  },
  getUserInfo(context, payload) {
    return api.user.getInfo(payload)
      .then(res => {
        context.commit('SET_USERINFO', res.data)
      })
  },
  resetToken(context, payload) {
    context.commit('CLEAR_TOKEN', payload)
  },
  logout(context, payload) {
    context.commit('CLEAR_TOKEN', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


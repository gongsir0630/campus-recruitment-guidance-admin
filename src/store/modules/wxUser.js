import api from '@/api/index'

const state = {
  wxUser: {
    total: 0,
    list: [{
      openId: 'visitor',
      avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
      nickName: '游客',
      gender: '男',
      realName: '游客',
      phoneNumber: '',
      email: '',
      eduId: 0,
      jobId: 0,
      profile: '',
      eduInfo: {
        id: 0,
        schoolId: 1,
        major: '',
        entrance: '',
        graduate: '',
        level: '',
        description: '',
        status: '',
        school: {
          id: 1,
          logo: '',
          name: '',
          majorList: '',
          mailSuffix: ''
        }
      },
      jobInfo: {
        id: 0,
        openId: '',
        companyId: 1,
        department: '',
        jobTitle: '',
        description: '',
        status: '',
        company: {
          id: 1,
          logo: '',
          name: '',
          slogan: '',
          mailSuffix: ''
        }
      }
    }]
  }
}

const mutations = {
  SET_WX_USER(state, payload) {
    if (payload) {
      state.wxUser.total = payload.total
      state.wxUser.list = payload.list
    }
  }
}

const actions = {
  getWxUserList({ commit }, payload) {
    return api.wxUser.getList()
      .then(res => {
        commit('SET_WX_USER', res.data)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


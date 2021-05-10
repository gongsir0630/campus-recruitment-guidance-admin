import api from '@/api/index'

const state = {
  eduInfo: {
    total: 0,
    list: [{
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
    }]
  },

  jobInfo: {
    total: 0,
    list: [{
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
    }]
  },

  member: {
    total: 0,
    list: [{
      applyTime: '2021-04-27',
      certificationStatus: '待审核',
      currentState: '工作',
      fieldTags: '考研保研,校招答疑,简历指导,岗位内推,学科竞赛,校园社团,技术咨询',
      id: 4,
      introduction: '测试测试',
      likeCount: 1,
      likeList: 'olAW-4vIdX8DTkzftHveDWIlR4zU',
      openId: 'olAW-4vIdX8DTkzftHveDWIlR4zU',
      photo: 'https://cdn.yzhelp.top/campus-recruitment-guidance/visitor/d640f58c-50c5-40f1-a252-36bd8e1f44a9.png',
      title: '计算机协会会长',
      topics: '',
      user: {
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
      }
    }]
  }
}

const mutations = {
  SET_EDU_LIST(state, payload) {
    if (payload) {
      const { total, list } = payload
      state.member.list = list
      state.member.total = total === list.length ? total : list.length
    }
  },
  SET_JOB_LIST(state, payload) {
    if (payload) {
      const { total, list } = payload
      state.member.list = list
      state.member.total = total === list.length ? total : list.length
    }
  },
  SET_MEMBER_LIST(state, payload) {
    console.log(payload)
    if (payload) {
      const { total, list } = payload
      state.member.list = list
      state.member.total = total === list.length ? total : list.length
    }
  }
}

const actions = {
  getJobList(context, payload) {
    return api.job
      .getList()
      .then(res => {
        context.commit('SET_JOB_LIST',
          res.data)
      })
  },
  getEduList(context, payload) {
    return api.edu
      .getList()
      .then(res => {
        context.commit('SET_EDU_LIST',
          res.data)
      })
  },
  getMemberList(context, payload) {
    return api.member
      .getList()
      .then(res => {
        context.commit('SET_MEMBER_LIST',
          res.data)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


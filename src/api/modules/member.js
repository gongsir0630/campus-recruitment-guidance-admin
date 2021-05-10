import http from '@/utils/request'

function getList() {
  return http.get(`/admin/member/list`)
}

export default {
  getList
}

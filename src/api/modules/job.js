import http from '@/utils/request'

function getList() {
  return http.get(`/admin/job/list`)
}

export default {
  getList
}

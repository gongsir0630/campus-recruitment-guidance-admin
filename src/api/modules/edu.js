import http from '@/utils/request'

function getList() {
  return http.get(`/admin/edu/list`)
}

export default {
  getList
}

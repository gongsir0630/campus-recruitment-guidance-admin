import http from '@/utils/request'

function getList() {
  return http.get(`/admin/wx/list`)
}

export default {
  getList
}

<template>
  <div class="app-container">
    <el-row class="margin-bottom">
      <el-button type="danger" round>批量删除</el-button>
    </el-row>
    <el-row>
      <el-table
        v-loading="listLoading"
        :data="list ? list.filter(data => !search || data.realName.toLowerCase().includes(search.toLowerCase())) : []"
        element-loading-text="数据加载中~"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="微信 ID" width="300">
          <template slot-scope="scope">
            {{ scope.row.openId }}
          </template>
        </el-table-column>
        <el-table-column label="昵称" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.nickName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="110" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.avatar"
            />
          </template>
        </el-table-column>
        <el-table-column label="性别" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gender }}</span>
          </template>
        </el-table-column>
        <el-table-column label="真实姓名" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.realName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="教育信息" width="300" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.eduInfo.school.name }}</span>-
            <span>{{ scope.row.eduInfo.major }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工作信息" width="300" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.jobInfo.company.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="个人简介" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.profile }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" fixed="right" width="300">
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
              prefix-icon="el-icon-search"
            />
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              round
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              round
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!-- 编辑时候的弹出层 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogFormVisible"
      width="500px"
      top="200px"
    >
      <el-form :model="currentUser">
        <el-form-item
          label="微信 ID"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="currentUser.openId"
            auto-complete="off"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="currentUser.nickName"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item
          label="真实姓名"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="currentUser.realName"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item
          label="个人简介"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="currentUser.profile"
            auto-complete="off"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSet(currentUser.openId)"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      search: '',
      dialogFormVisible: false, // 弹出层默认为关闭
      // 弹出层中的表单
      currentUser: {
        openId: '',
        avatar: '',
        nickName: '',
        gender: '',
        realName: '',
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
      },
      formLabelWidth: '110px'
    }
  },
  computed: {
    ...mapState('wxUser', ['wxUser'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    ...mapActions('wxUser', ['getWxUserList']),
    handleEdit(index, row) {
      console.log(index, row)
      this.dialogFormVisible = true
      this.currentUser = this.list[index]
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm(`此操作将永久删除该用户『${row.nickName}』, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
        this.$message({
          type: 'success',
          message: `用户『${row.nickName}』删除成功!`
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async fetchData() {
      this.listLoading = true
      this.getWxUserList(null)
        .then(() => {
          this.list = this.wxUser.list
          this.listLoading = false
        })
    },
    handleSet(openId) {
      this.dialogFormVisible = false
      console.log(this.currentUser)
      console.log(openId)
    }
  }
}
</script>

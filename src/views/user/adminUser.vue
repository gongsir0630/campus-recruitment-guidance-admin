<template>
  <div class="app-container">
    <el-row class="margin-bottom">
      <el-button type="danger" round>批量删除</el-button>
    </el-row>
    <el-row>
      <el-table
        v-loading="listLoading"
        :data="list ? list.filter(data => !search || data.userId.toLowerCase().includes(search.toLowerCase())) : []"
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
        <el-table-column label="用户账号" width="200">
          <template slot-scope="scope">
            {{ scope.row.userId }}
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
        <el-table-column label="手机号" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" width="210" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
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
          label="用户账号"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="currentUser.userId"
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
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="currentUser.password"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="currentUser.phoneNumber"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item
          label="邮箱"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="currentUser.email"
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
          @click="handleSet(currentUser.userId)"
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
        userId: '',
        password: '',
        nickName: '',
        avatar: '',
        phoneNumber: '',
        email: ''
      },
      formLabelWidth: '110px'
    }
  },
  computed: {
    ...mapState('user', ['adminUser'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    ...mapActions('user', ['getAdminUserList']),
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
      this.getAdminUserList(null)
        .then(() => {
          this.list = this.adminUser.list
          this.listLoading = false
        })
    },
    handleSet(userId) {
      this.dialogFormVisible = false
      console.log(this.currentUser)
      console.log(userId)
    }
  }
}
</script>

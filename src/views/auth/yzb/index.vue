<template>
  <div class="app-container">
    <el-row class="margin-bottom">
      <el-button type="danger" round>批量删除</el-button>
    </el-row>
    <el-row>
      <el-table
        v-loading="listLoading"
        :data="list ? list.filter(data => !search || data.user.realName.toLowerCase().includes(search.toLowerCase())) : []"
        element-loading-text="数据加载中~"
        fit
        highlight-current-row
        style="width: 100%"
        :row-class-name="tableRowClassName"
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
        <el-table-column label="ID/OpenID" width="200">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              title="用户ID / OpenID"
              width="200"
              trigger="hover"
              :content="scope.row.id+' / '+scope.row.openId"
            >
              <span slot="reference">{{ scope.row.user.nickName }} / {{ scope.row.user.realName }}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="当前状态" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.currentState }}</span>
          </template>
        </el-table-column>
        <el-table-column label="真实头像" width="110" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.photo"
            />
          </template>
        </el-table-column>
        <el-table-column label="领域标签" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fieldTags }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头衔" width="200" align="center">
          <template slot-scope="scope">
            <el-tag v-for="(tag,idx) in scope.row.title.split(',')" :key="idx" class="margin-bottom">
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="擅长话题" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.topics }}</span>
          </template>
        </el-table-column>
        <el-table-column label="个人自述" width="210" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.introduction }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点赞" width="210" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top-start" title="点赞列表">
              <p v-for="(like,idx) in scope.row.likeList.split(',')" :key="idx">
                {{ like }}
              </p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.likeCount }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" fixed="right" width="300">
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入真实姓名关键字搜索"
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
      <el-form :model="currentData">
        <el-form-item
          label="认证姓名"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="currentData.user.realName"
            auto-complete="off"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="认证状态"
          :label-width="formLabelWidth"
        >
          <el-select v-model="statusVal" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSet(currentData.id,statusVal)"
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
      currentData: {
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
      },
      formLabelWidth: '110px',
      options: [{
        value: 0,
        label: '未认证'
      }, {
        value: 1,
        label: '待审核'
      }, {
        value: 2,
        label: '认证通过'
      }],
      statusVal: '认证通过'
    }
  },
  computed: {
    ...mapState('auth', ['member'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    ...mapActions('auth', ['getMemberList']),
    tableRowClassName({ row, rowIndex }) {
      if (row.certificationStatus === '认证通过') {
        return 'success-row'
      } else if (row.certificationStatus === '待审核') {
        return 'warning-row'
      }
      return ''
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.dialogFormVisible = true
      this.currentData = this.list[index]
      this.statusVal = this.currentData.certificationStatus
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm(`此操作将永久删除该用户『${row.user.realName}』, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
        this.$message({
          type: 'success',
          message: `用户『${row.user.realName}』删除成功!`
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
      this.getMemberList(null)
        .then(() => {
          this.list = this.member.list
          this.listLoading = false
        })
    },
    handleSet(id, status) {
      this.dialogFormVisible = false
      console.log(id + '-' + status)
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<template>
  <div class="card-container">
    <!--
      搜索区域
      把各种搜索条件当成请求参数发送给后端，后端根据字段对数据库数据做过滤筛选，返回符合条件的数据
      1.表单组件的双向绑定 收集到当前的请求参数
      2.将参数通过调用接口传给后端
    -->
    <div class="search-container">
      <span class="search-label">车牌号码：</span>
      <el-input v-model="params.carNumber" clearable placeholder="请输入内容" class="search-main" />
      <span class="search-label">车主姓名：</span>
      <el-input v-model="params.personName" clearable placeholder="请输入内容" class="search-main" />
      <span class="search-label">状态：</span>
      <!--
        el-select: 双向绑定收集当前选中的数据
        el-option: 下拉框中每一项label（"有效"，"无效"） value（选中之后赋值给v-model 将来传给后端）
      -->
      <el-select v-model="params.cardStatus">
        <el-option v-for="item in statusList" :value="item.id" :label="item.name" :key="item.id" />
      </el-select>
      <el-button type="primary" class="search-btn" @click="handleSearch">查询</el-button>
    </div>
    <!-- 新增删除操作区域 -->
    <div class="create-container">
      <el-button type="primary" @click="$router.push('/cardAdd')">添加月卡</el-button>
      <el-button>批量删除</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="list">
        <el-table-column type="index" label="序号" />
        <el-table-column label="车主名称" prop="personName" />
        <el-table-column label="联系方式" prop="phoneNumber" />
        <el-table-column label="车牌号码" prop="carNumber" />
        <el-table-column label="车辆品牌" prop="carBrand" />
        <!--
          实现目标
            0-有效
            1-已过期
        -->
        <el-table-column label="剩余有效天数" prop="totalEffectiveDate" />
        <el-table-column label="状态" prop="cardStatus" :formatter="formatter" />
        <el-table-column label="操作" fixed="right" width="180">
          <!--
            scope作用域插槽
            scope.row -> 当前行的对象数据
          -->
          <template #default="scope">
            <el-button size="mini" type="text">续费</el-button>
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text" @click="editCard(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--
      分页器
      1.页数分出来  页数等于 = total / 每页总条数
      2.点击每页的时候，获取当前页的数据重新渲染到table上
        1. 通过事件获取当前点击的是第几页
        2. 以当前拿到的页数作为参数和后端要数据
        3. 把获取到的当前页的列表数据重新渲染到table组件上
    -->
    <div class="page-container">
      <el-pagination
        layout="total, prev, pager, next"
        :pageSize="params.pageSize"
        :total="total"
        @current-change="currentChange"
      />
    </div>
    <!-- 添加弹框 -->
    <el-dialog
      title="添加月卡"
      width="580px"
    >
      <!-- 表单接口 -->
      <div class="form-container">
        <!-- <el-form ref="addForm" :model="addForm" :rules="addFormRules">
          <el-form-item label="楼宇名称" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="楼宇层数" prop="floors">
            <el-input v-model="addForm.floors" />
          </el-form-item>
          <el-form-item label="在管面积" prop="area">
            <el-input v-model="addForm.area" />
          </el-form-item>
          <el-form-item label="物业费" prop="propertyFeePrice">
            <el-input v-model="addForm.propertyFeePrice" />
          </el-form-item>
        </el-form> -->
      </div>
      <template #footer>
        <el-button size="mini">取 消</el-button>
        <el-button size="mini" type="primary">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCardListAPI } from '@/api/card'
// import router from '@/router'
export default {
  data() {
    return {
      list: [], // 月卡列表
      params: {
        page: 1,
        pageSize: 5,
        carNumber: '',
        personName: '',
        cardStatus: null
      },
      total: 0,
      statusList: [
        {
          id: null,
          name: '全部'
        },
        {
          id: 0,
          name: '有效'
        },
        {
          id: 1,
          name: '已过期'
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      // 1.调用接口
      const res = await getCardListAPI(this.params)
      // 2.把后端数据赋值给给响应式list
      this.list = res.data.rows
      this.total = res.data.total
    },
    formatter(row) {
      // return的数据就是要渲染到当前列的数据
      // 如果当前的状态除了0/1/2/3/4/5/6 -if
      // 解决方案：通过映射的方式做匹配
      const map = {
        0: '有效',
        1: '已过期'
      }
      // 对象取值 点语法 []语法
      // return row.cardStatus === 0 ? '有效' : '已过期'
      return map[row.cardStatus]
    },
    async currentChange(page) {
      // console.log(page)
      this.params.page = page
      this.getList()
    },
    handleSearch() {
      this.params.page = 1
      this.getList()
    },
    editCard(id) {
      console.log(id)
      // query - url?id=1001
      // params - url/1001
      this.$router.push({
        path: '/cardAdd',
        query: {
          id
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.card-container {
  padding: 20px;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  padding-bottom: 20px;
  .search-main {
    width: 220px;
    margin-right: 10px;
  }
  .search-btn{
    margin-left:20px;
  }
}
.create-container{
  margin: 10px 0px;
}
.page-container{
  padding:4px 0px;
  text-align: right;
}
.form-container{
  padding:0px 80px;
}
</style>

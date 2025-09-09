<template>
  <div class="add-card">
    <header class="add-header">
      <el-page-header content="增加月卡" @back="$router.back()" />
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">车辆信息</div>
        <div class="form">
          <!--
            el-form: :model :rules
            el-form-item prop指定用哪条规则
            el-input：v-model双向绑定
          -->
          <el-form label-width="100px" :model="carInfoForm" :rules="carInfoRules">
            <el-form-item label="车主姓名" prop="personName">
              <el-input v-model="carInfoForm.personName" />
            </el-form-item>
            <el-form-item label="联系方式" prop="phoneNumber">
              <el-input v-model="carInfoForm.phoneNumber" />
            </el-form-item>
            <el-form-item label="车辆号码" prop="carNumber">
              <el-input v-model="carInfoForm.carNumber" />
            </el-form-item>
            <el-form-item label="车辆品牌" prop="carBrand">
              <el-input v-model="carInfoForm.carBrand" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="form-container">
        <div class="title">最新一次月卡缴费信息</div>
        <div class="form">
          <el-form label-width="100px">
            <el-form-item label="有效日期">
              <el-input />
            </el-form-item>
            <el-form-item label="支付金额">
              <el-input />
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select>
                <el-option
                  v-for="item in [{}]"
                  :key="item.industryCode"
                  :value="item.industryCode"
                  :label="item.industryName"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button>重置</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    const validatorCarNumber = (rule, value, callback) => {
      // value: 用户在表单里输入的最新的数据
      // callback 是一个放行函数 校验通过直接调用，如果未通过callback(new Error('错误提示'))
      const plateNumberRegex = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/
      if (plateNumberRegex.test(value)) {
        callback()
      } else {
        callback(new Error('请输入符合规范的车牌号'))
      }
    }
    return {
      // 表单对象
      carInfoForm: {
        personName: '',
        phoneNumber: '',
        carNumber: '',
        carBrand: ''
      },
      // 规则对象
      carInfoRules: {
        personName: [{
          required: true,
          message: '请输入车主姓名',
          trigger: 'blur'
        }],
        phoneNumber: [{
          required: true,
          message: '请输入联系方式',
          trigger: 'blur'
        }],
        carNumber: [{
          required: true,
          message: '请输入车辆号码',
          trigger: 'blur'
        },
        {
          validator: validatorCarNumber,
          trigger: 'blur'
        }],
        carBrand: [{
          required: true,
          message: '请输入车辆品牌',
          trigger: 'blur'
        }]
      }
    }
  }

}
</script>

<style scoped lang="scss">
.add-card {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 64px;
    background-color: #fff;

    .left {
      span {
        margin-right: 4px;
      }
      .arrow{
        cursor: pointer;
      }
    }

    .right {
      text-align: right;
    }
  }

  .add-main {
    background: #f4f6f8;
    padding: 20px 130px;

    .form-container {
      background-color: #fff;

      .title {
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
      }

      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;

        .el-form {
          display: flex;
          flex-wrap: wrap;

          .el-form-item {
            width: 50%;
          }
        }
      }
    }
    .preview{
      img{
        width: 100px;
      }
    }
  }

  .add-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 24px 50px;
    color: #000000d9;
    font-size: 14px;
    background: #fff;
    text-align: center;
  }
}
</style>

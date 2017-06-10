<template>
  <div class="userInfo-box height80">

    <el-row :gutter="20" class="mg-top10 mg-left10 mg-bottom10">
      <el-col :xs="4" :sm="6" :md="8" :lg="8">&nbsp;教师名：
        <el-input v-model="searchName" placeholder="请输入用户名" style="width:60%;"></el-input>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="8">教师职称：
        <el-input v-model="searchTitle" placeholder="请输入用户职称" style="width:60%;"></el-input>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="8">用户账号：
        <el-input v-model="searchUsername" placeholder="请输入用户账号" style="width:60%;"></el-input>
      </el-col>
    </el-row>

    <el-row class="mg-top10 mg-left10 mg-bottom10">

      <el-col :xs="4" :sm="6" :md="8" :lg="8">用户类型：
        <el-select v-model="selectedRole" placeholder="请选择" style="width:58%;">
          <el-option v-for="item in roleSelectedList" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
       </el-select>
<!--
        <el-radio-group v-model="selectedRole" class="mg-left30">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="2">督导管理员</el-radio>
          <el-radio :label="3">督导员</el-radio>
          <el-radio :label="4">教师</el-radio>
        </el-radio-group>-->
      </el-col>
    </el-row>

    <div class="block mg-top10 mg-left10 mg-right10  mg-bottom10" style="text-align:right">
      <span class="wrapper ">

        <el-button type="primary" @click="handleSearch()" :disabled="getBtnSearchDisabled">搜索</el-button>
        <el-button @click="resetSearchInput()">重置</el-button>
        <el-button type="success" @click="showDialog()">添加</el-button>
        <el-button type="danger" @click="handleDelete()" :disabled="btnDeleteDisable">删除</el-button>
      </span>
    </div>

    <!--table-->
    <el-table class="tempform-table" v-bind:data="getUserList" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="userName" label="账号" show-overflow-tooltip>
      </el-table-column>
            <el-table-column prop="teacherName" label="姓名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="title" label="职称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="collegeName" label="学院" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="roleName" label="角色" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="isSynchro" label="微信同步" show-overflow-tooltip>
         <template scope="scope">
           {{getSynchro(scope.row)}}
        </template>
      </el-table-column>

      <el-table-column prop="weChatId" label="微信号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="opertate" label="操作" width="180">
        <template scope="scope">
          <el-button size="small" type="primary" @click="showDialog(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block ta-c mg-top10">
      <el-pagination @current-change="handleCurrentChange" :current-page="getCurrentPage()" :page-size="10" layout="prev, pager, next, jumper" :total="getUserListTotalElements">
      </el-pagination>
    </div>

    <el-dialog :title="dialogTitle" v-model="dialogFormVisible" :show-close="false" size="tiny">
      <el-form :model="dialogForm" :rules="rule" ref="dynamicValidateForm">
        <el-form-item label="用户名:" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="dialogForm.userName" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="教师姓名:" :label-width="formLabelWidth" v-if="getShowTeacherName">
          <el-select v-model="dialogForm.teacherId" placeholder="请选择">
            <el-option v-for="item in getAllTeacherList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学院:" :label-width="formLabelWidth" prop="collegeId">
          <el-select v-model="dialogForm.collegeId" placeholder="请选择">
            <el-option v-for="item in getAllCollegeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="角色:" :label-width="formLabelWidth" prop="roleId">
          <el-select v-model="dialogForm.roleId" placeholder="请选择">
            <el-option v-for="item in getRoleList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号:" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.phone" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="邮件:" :label-width="formLabelWidth" prop="email">
          <el-input v-model="dialogForm.email" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="微信号:" :label-width="formLabelWidth" prop="weChatId">
          <el-input v-model="dialogForm.weChatId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" :label-width="formLabelWidth" prop="weChapasswordtId">
          <el-input type="password" v-model="dialogForm.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogCancel()">取 消</el-button>
        <el-button type="primary" @click="handleDialogOk()" :disabled="getDialogOkDisabled" :loading="updatingUser">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script src="./UserInfoIndex.js">
</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>
.el-tabs__content {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  height: 75%;
}


.height80 {
  height: 88% !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
}


@media(min-width: 992px) {
  .userInfo-box .el-dialog {
    top: 10% !important;
    position: absolute;
    left: 50%;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-sizing: border-box;
    margin-bottom: 50px;
  }
}

@media(min-width: 1200px) {
  .userInfo-box .el-dialog {
    top: 3% !important;
    position: absolute;
    left: 50%;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-sizing: border-box;
    margin-bottom: 0;
  }
}
</style>

<template>
  <div class="TeacherInfoIndex-box">


  <el-row  class="mg-top10 mg-left10 mg-bottom10">
        <el-col>用户类型：<el-radio-group v-model="selectedRole" class="mg-left30"  >
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">系统管理员</el-radio>
          <el-radio :label="2">督导管理员</el-radio>
          <el-radio :label="3">督导员</el-radio>
          <el-radio :label="4">教师</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>


  <el-row  :gutter="20" class="mg-top10 mg-left10 mg-bottom10">
      <el-col :span="6">用户名：<el-input v-model="searchName" placeholder="请输入用户名"  style="width:200px;" ></el-input>
    </el-col>
          <el-col :span="6">用户职称：<el-input v-model="searchTitle" placeholder="请输入用户职称"  style="width:200px;" ></el-input>
    </el-col>
          <el-col :span="6">用户账号：<el-input v-model="searchUsername" placeholder="请输入用户账号"  style="width:200px;" ></el-input>
    </el-col>
    </el-row>

    <div class="block mg-top10 mg-left10 mg-right10  mg-bottom10" style="text-align:right">
      <span class="wrapper ">


        <el-button  type="primary" @click="handleSearch()">搜索</el-button>
        <el-button @click="resetSearchInput()">重置</el-button>
        <el-button type="success" @click="showDialog()">添加</el-button>
         <el-button  type="danger"  @click="handleDelete()" :disabled="btnDeleteDisable" >删除</el-button>
      </span>
    </div>

    <!--table-->
    <el-table class="tempform-table" v-bind:data="getUserList" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection"  width="55">
      </el-table-column>
      <el-table-column prop="userName" label="用户名" width="200">
      </el-table-column>
      <el-table-column prop="title" label="教师职称" width="100">
      </el-table-column>
      <el-table-column prop="collegeName" label="所属学院" width="180" >
      </el-table-column>
      <el-table-column prop="roleName" label="角色" show-overflow-tooltip >
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="150">
      </el-table-column>
      <el-table-column prop="email" label="邮件" width="150">
      </el-table-column>
      <el-table-column prop="weChatId" label="微信号" width="150">
      </el-table-column>
      <el-table-column prop="opertate" label="操作" width="180">
        <template scope="scope">
          <el-button size="small" @click="showDialog(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block ta-c mg-top10">
      <el-pagination @current-change="handleCurrentChange" :current-page="getCurrentPage()"  :page-size="10" layout="prev, pager, next, jumper" :total="getUserListTotalElements">
      </el-pagination>
    </div>

    <el-dialog :title="dialogTitle" v-model="dialogFormVisible" :modal="false" :show-close="false" size="tiny">
      <el-form ref="form" :model="dialogForm" >
        <el-form-item label="用户名:" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.userName" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="教师职称:" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.title" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="所属学院:" :label-width="formLabelWidth">
        <el-select v-model="dialogForm.collegeId" placeholder="请选择">
          <el-option
          v-for="item in getCollegeList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="角色:" :label-width="formLabelWidth">
          <el-select v-model="dialogForm.roleId" placeholder="请选择">
            <el-option
            v-for="item in getRoleList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="手机号:" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.phone" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="邮件:" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.email" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="微信号" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.weChatId" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogCancel()">取 消</el-button>
        <el-button type="primary" @click="handleDialogOk()" :disabled="btnOKDisable">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script src="./UserInfoIndex.js">
</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>

</style>

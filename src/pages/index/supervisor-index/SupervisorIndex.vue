<template>
  <div class="SupervisorIndex-box">


  <el-row  class="mg-top10 mg-left10 mg-bottom10">
    </el-row>


    <div class="block mg-top10 mg-left10 mg-right10  mg-bottom10" style="text-align:right">
      <span class="wrapper ">


        <el-button  type="primary" @click="handleSearch()">自动填补</el-button>
        <el-button type="success" @click="showDialog()">添加</el-button>
         <el-button  type="danger"  @click="handleDelete()" :disabled="btnDeleteDisable" >删除</el-button>
      </span>
    </div>

    <!--table-->
    <el-table class="tempform-table" border style="width: 100%"    :data="getSupervisorList" @selection-change="handleSelectionChange">
      <el-table-column type="selection"  width="55">
      </el-table-column>
      <el-table-column prop="userName" label="督导" width="200">
      </el-table-column>
      <el-table-column prop="week" label="周" width="200">
      </el-table-column>
      <el-table-column prop="day" label="日" width="200">
      </el-table-column>
      <el-table-column prop="course" label="节数" show-overflow-tooltip >
      </el-table-column>
      <el-table-column prop="opertate" label="操作" width="180">
        <template scope="scope">
          <el-button size="small" @click="showDialog(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block ta-c mg-top10">
      <el-pagination @current-change="handleCurrentChange" :current-page="1"  :page-size="10" layout="prev, pager, next, jumper" :total="100">
      </el-pagination>
    </div>

    <!--<el-dialog :title="dialogTitle" v-model="dialogFormVisible" :modal="false" :show-close="false" size="tiny">
      <el-form :model="dialogForm">
        <el-form-item label="用户名:" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.Username" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="教师职称:" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.ttitle" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="所属学院:" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.cname" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>

        <el-form-item label="角色:" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.RoleName" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.Phone" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="邮件:" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.Email" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="微信号" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.Wecat" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogCancel()">取 消</el-button>
        <el-button type="primary" @click="handleDialogOk()" :disabled="btnOKDisable">确 定</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script src="./SupervisorIndex.js">
</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>

</style>

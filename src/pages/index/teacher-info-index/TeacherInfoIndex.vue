<template>
  <div class="TeacherInfoIndex-box">

    <el-row :gutter="20" class="mg-top10 mg-left10 mg-bottom10">
      <el-col  :xs="4" :sm="6" :md="8" :lg="8">教师姓名：
        <el-input style="width:60%;" v-model="searchTeacherName" placeholder="请输入教师姓名"></el-input>
      </el-col>
      <el-col  :xs="4" :sm="6" :md="8" :lg="8">教师职称：
        <el-input style="width:60%;" v-model="searchTeacherTitle" placeholder="请输入教师职称"></el-input>
      </el-col>
    </el-row>
    <div class="block mg-top10 mg-left10 mg-right10  mg-bottom10" style="text-align:right">
      <span class="wrapper ">
        <el-button type="primary" @click="handleSearch()" :disabled="getSearchBtnDisable">搜索</el-button>
        <el-button @click="resetSearchInput()">重置</el-button>

        <el-button type="success" @click="showDialog()">添加</el-button>
      </span>
    </div>
    <!--table-->
    <el-table class="tempform-table" v-bind:data="getTeacherList" border style="width: 100%">
      <!--<el-table-column type="selection" width="55">
          </el-table-column>-->
      <el-table-column prop="name" label="教师姓名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="title" label="职称" show-overflow-tooltip>
      </el-table-column>

      <el-table-column prop="opertate" label="操作" width="180">
        <template scope="scope">
          <el-button size="small" type="primary" @click="showDialog(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block ta-c mg-top10">
      <el-pagination @current-change="handleCurrentChange" :current-page="getCurrentPage()" :page-size="10" layout="prev, pager, next, jumper" :total="getTeacherListTotalElements">
      </el-pagination>
    </div>

    <el-dialog :title="dialogTitle" v-model="dialogFormVisible" :show-close="false" size="tiny">
      <el-form :model="dialogForm">
        <el-form-item label="教师姓名:" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.name" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="职称" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogCancel()">取 消</el-button>
        <el-button type="primary" @click="handleDialogOk()" :disabled="btnOKDisable" :loading="updatingTeacher">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script src="./TeacherInfoIndex.js">
</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>

</style>

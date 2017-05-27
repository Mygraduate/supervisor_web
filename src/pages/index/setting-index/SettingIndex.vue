<template>
  <div class="SettingIndex-box">

    <el-tabs type="border-card">
      <el-tab-pane label="学院设置">
        <div class="block mg-bottom10">
          <span class="wrapper">
            <el-button type="success" @click="showDialog()">添加</el-button>
            <el-button  type="danger"  @click="handleDelete()" :disabled="btnDeleteDisable" >删除</el-button>
          </span>
        </div>
        <!--table-->
        <el-table class="tempform-table" v-bind:data="getCollegeList" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="id" label="id" width="120">
          </el-table-column>
          <el-table-column prop="name" label="名称">
          </el-table-column>
          <el-table-column prop="des" label="描述" width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="opertate" label="操作" width="180">
              <template scope="scope">
                  <el-button size="small" @click="showDialog(scope.row)">修改</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class="block ta-c mg-top10">
          <el-pagination @current-change="handleCurrentChange"  :current-page="$route.query.page?$route.query.page:1" :page-size="10" layout="prev, pager, next, jumper" :total="getCollegeListTotalElements">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :title="dialogTitle" v-model="dialogFormVisible"  :modal="false" :show-close="false">
      <el-form :model="dialogForm">
        <el-form-item v-if="dialogType==='UPDATE'"  label="学院ID：" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.id" :readonly="true" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="学院名称:" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.name" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="学院描述" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.des" auto-complete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogCancel()">取 消</el-button>
        <el-button type="primary" @click="handleDialogOk()"  :disabled="btnOKDisable">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script src="./SettingIndex.js">
</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>

</style>

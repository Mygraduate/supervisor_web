<template>
  <div class="PermissionIndex-box">
    <div class="block mg-top10 mg-left10 mg-bottom10">
      <span class="wrapper">
          <el-button type="success" @click="btnAdd">添加</el-button>
         </span>
    </div>

    <!--table-->
    <el-table class="tempform-table" v-bind:data="tempTableData" border style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <!--<el-table-column label="课程" width="120">
                                        <template scope="scope">{{ scope.row.date }}</template>
                                      </el-table-column>-->
      <el-table-column prop="course" label="账号" width="120">
      </el-table-column>
      <el-table-column prop="courseContent" label="密码" width="120">
      </el-table-column>
      <el-table-column prop="teachWay" label="角色" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="professional" label="剩余短信" width="120">
      </el-table-column>
      <el-table-column prop="opertate" label="操作" width="180">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <!--<el-table-column prop="address" label="授课方式" show-overflow-tooltip>
                                      </el-table-column>-->
    </el-table>

    <div class="block ta-c mg-top10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="10" layout="prev, pager, next, jumper" :total="1000">
      </el-pagination>
    </div>

      <el-dialog title="收货地址" :visible.sync="dialogFormVisible" :modal="false">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="'120px'">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="'120px'">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./PermissionIndex.js">
</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>

</style>

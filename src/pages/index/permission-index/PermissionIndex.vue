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
      <el-table-column prop="course" label="账号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="courseContent" label="密码" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="teachWay" label="角色" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="professional" label="剩余短信" show-overflow-tooltip>
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
  </div>
</template>

<script src="./PermissionIndex.js">
</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>

</style>

<template>
  <div class="ReferCourseIndex-box">
    <!--table-->
    <el-table  v-bind:data="tempTableData" border style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="course" label="教师" width="120">
      </el-table-column>
      <el-table-column prop="courseContent" label="课程内容" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="teachWay" label="上课时间" width="120">
      </el-table-column>
      <el-table-column prop="professional" label="上课地点" width="120">
      </el-table-column>
      <el-table-column prop="courseClass" label="专业" width="120">
      </el-table-column>
      <el-table-column prop="teachTea" label="课程类型" width="120">
      </el-table-column>

    </el-table>

<el-row  type="flex" justify="end" class="mg-top10 mg-right10">
      <span class="wrapper">
                    <el-button type="success">确认安排</el-button>
     </span>
</el-row>
  </div>
</template>

<script src="./ReferCourseIndex.js">
</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>

</style>

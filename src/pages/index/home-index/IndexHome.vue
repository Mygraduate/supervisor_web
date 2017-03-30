<template>
  <div class="index-box">
    <el-tabs type="border-card">
      <el-tab-pane label="临时表">
        <div class="block">
          <span class="wrapper">
    <el-button type="success">添加</el-button>
    <el-button type="warning">修改</el-button>
    <el-button type="info">保存</el-button>
  </span>
          <el-input class="tempform" placeholder="请输入你想搜索的信息" icon="search" v-model="searchInput" v-bind:on-icon-click="handleSerchClick">
          </el-input>
        </div>

        <!--table-->
        <el-table class="tempform-table" v-bind:data="tempTableData" border style="width: 100%">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <!--<el-table-column label="课程" width="120">
            <template scope="scope">{{ scope.row.date }}</template>
          </el-table-column>-->
          <el-table-column prop="course" label="课程" width="120">
          </el-table-column>
          <el-table-column prop="courseContent" label="授课内容" width="120">
          </el-table-column>
          <el-table-column prop="teachWay" label="授课方式" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="professional" label="专业" width="120">
          </el-table-column>
          <el-table-column prop="courseClass" label="教室" width="120">
          </el-table-column>
          <el-table-column prop="teachTea" label="教师" width="120">
          </el-table-column>
          <el-table-column prop="week" label="周次" width="120">
          </el-table-column>
          <el-table-column prop="listenerTime" label="听课时间" width="120">
          </el-table-column>
          <!--<el-table-column prop="address" label="授课方式" show-overflow-tooltip>
          </el-table-column>-->
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="确认表">
        <div class="block">
          <span class="wrapper">
            <el-button type="warning">修改</el-button>
            <el-button type="danger">删除</el-button>
            <el-button type="success">发送安排</el-button>
            <el-button type="info">发送结果</el-button>
            <el-button type="warning">导出Excel</el-button>
  </span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="发送日志">
        <div class="block">
          <span class="wrapper">
             <el-button type="success">重发</el-button>
            <el-button type="danger">删除</el-button>
          </span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script src="./IndexHome.js">

</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>

</style>

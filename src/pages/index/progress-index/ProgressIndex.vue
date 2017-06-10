<template>
  <div class="ProgressIndex-box">

    <el-tabs type="border-card" v-model="selectedTab" style="height:100%">
      <el-tab-pane label="查看课表" name="course">

        <el-row :gutter="20" class="mg-top10 mg-left10 mg-bottom10">
          <el-col :xs="4" :sm="6" :md="8" :lg="8">学院：
            <el-select v-model="selectedCollege" class=" mg-bottom10" placeholder="学院" style="width:60%;">
              <el-option v-for="item in getAllCollegeList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="8">教师：
            <el-select v-model="selectedTeacher" class=" mg-bottom10" placeholder="教师" style="width:60%;">
              <el-option v-for="item in getAllTeacherList" :key="item.id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="8">专业：
            <el-select v-model="selectedProfressional" class=" mg-bottom10" placeholder="专业" style="width:60%;">
              <el-option v-for="item in getProfessionalList" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mg-top10 mg-left10 mg-bottom10">
          <el-col :xs="4" :sm="6" :md="8" :lg="8">周数：
            <el-select v-model="selectedWeek" placeholder="请选择" style="width:60%;">
              <el-option v-for="item in 20" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="8">星期：
            <el-select v-model="selectedDay" placeholder="请选择" style="width:60%;">
              <el-option v-for="item in selectDayList" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <span class="wrapper  mg-bottom10" style="float:right">
          <el-button type="primary" @click="clickCourseSearch({selectedTeacher, selectedProfressional, selectedWeek, selectedDay,selectedCollege})" :disabled="getCourseBtnDisable">搜索</el-button>
          <el-button @click="clickCourseReset">重置</el-button>
          <el-button type="primary" @click="exportBtn({selectedTeacher, selectedProfressional, selectedWeek,selectedCollege, selectedDay})">导出</el-button>
        </span>
        <!--table-->
        <el-table class="tempform-table" v-bind:data="getCourseList" border style="width: 100%">
          <el-table-column prop="teacher" label="教师" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="content" label="课程内容" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="time" label="上课时间" show-overflow-tooltip>
            <template scope="scope">
              <span v-text="getItemTime(scope.row)"></span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="上课地点" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="major" label="专业" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="type" label="课程类型" show-overflow-tooltip>
          </el-table-column>

        </el-table>

        <div class="block ta-c mg-top10">
          <el-pagination @current-change="handleCourseCurrentChange" :current-page.sync="courseCurrentPage" :page-size="10" layout="prev, pager, next, jumper" :total="getCourseListElements">
          </el-pagination>
        </div>
      </el-tab-pane>

      <el-tab-pane label="导入" name="import">
        <div class="block">
          <span class="wrapper " style="text-align:right;float:right">
            <el-button type="success" class="mg-bottom10" @click="importFile">导入</el-button>
            <el-button :disabled="btnUploadDisable||getAllLoaded" type="primary" class="mg-bottom10" @click="handleUploadFiles">开始上传</el-button>
            <el-button :disabled="btnUploadDisable||getAllUploading" class="mg-bottom10" @click="handleDeleteUploadFile">清空列表</el-button>
          </span>
          <!--table-->
          <el-table class="tempform-table" v-bind:data="importFilesList" border style="width: 100%">
            <el-table-column prop="name" label="文件名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="msg" label="导入信息" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="uploadState" label="导入情况" width="120">
              <template scope="scope">
                <span class="el-tag" :style="[{background:getUploadStateStyle(scope.row.uploadState)}]">
                  {{scope.row&&scope.row.uploadState?scope.row.uploadState:''}}
                </span>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </el-tab-pane>

    </el-tabs>
    <input type="file" multiple v-show="false" ref="fileinput" v-on:change="handleFileChange" />

  </div>
</template>

<script src="./ProgressIndex.js">
</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>
.el-tabs__content {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  height: 75%;
}
</style>

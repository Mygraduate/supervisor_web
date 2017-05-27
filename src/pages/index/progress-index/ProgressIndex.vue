<template>
  <div class="ProgressIndex-box">

    <el-tabs type="border-card" v-model="selectedTab">
      <el-tab-pane label="查看课表" name="course">

        <el-row :gutter="20" class="mg-top10 mg-left10 mg-bottom10">
          <el-col :span="6">学院：
            <el-select v-model="selectedCollege" class=" mg-bottom10" placeholder="学院">
              <el-option v-for="item in getAllCollegeList" :key="item.id" :label="item.name" :value="item.id"  >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">教师：
            <el-select v-model="selectedTeacher" class=" mg-bottom10" placeholder="教师">
              <el-option v-for="item in getTeacherList" :key="item.id" :label="item.name" :value="item.name" >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">专业：
            <el-select v-model="selectedProfressional" class=" mg-bottom10" placeholder="专业">
              <el-option v-for="item in getProfessionalList" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mg-top10 mg-left10 mg-bottom10">
          <el-col :span="6">周数：
            <el-select v-model="selectedWeek" placeholder="请选择">
              <el-option v-for="item in 20" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">星期：
            <el-select v-model="selectedDay" placeholder="请选择">
              <el-option v-for="item in selectDayList" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <span class="wrapper  mg-bottom10" style="float:right">
          <el-button type="primary" @click="clickCourseSearch({selectedTeacher, selectedProfressional, selectedWeek, selectedDay,selectedCollege})" :disabled="getCourseBtnDisable">搜索</el-button>
          <el-button @click="clickCourseReset">重置</el-button>
          <el-button @click="exportBtn({selectedTeacher, selectedProfressional, selectedWeek,selectedCollege, selectedDay})">导出</el-button>
        </span>
        <!--table-->
        <el-table class="tempform-table" v-bind:data="getCourseList" border style="width: 100%">
          <el-table-column prop="teacher" label="教师" width="120">
          </el-table-column>
          <el-table-column prop="content" label="课程内容" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="time" label="上课时间" width="120">
          </el-table-column>
          <el-table-column prop="address" label="上课地点" width="120">
          </el-table-column>
          <el-table-column prop="major" label="专业" width="120">
          </el-table-column>
          <el-table-column prop="type" label="课程类型" width="120">
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
            <!--<el-table-column type="selection" width="55">
                    </el-table-column>-->
            <el-table-column prop="name" label="文件名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="msg" label="导入信息" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="uploadState" label="导入情况" width="120">
            </el-table-column>

            <!--<el-table-column prop="opertate" label="操作" width="180">
                      <template scope="scope">
                        <el-button :disabled="scope.uploadState==='uploading'" size="small" @click="handleDeleteUploadFile(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>-->
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

</style>

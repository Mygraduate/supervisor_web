<template>
  <div class="ProgressIndex-box">

    <el-tabs type="border-card">
      <el-tab-pane label="查看课表">

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
          <el-pagination @current-change="handleCurrentChange" :page-size="10" layout="prev, pager, next, jumper" :total="getCourseListElements">
          </el-pagination>
        </div>
      </el-tab-pane>

      <el-tab-pane label="导入">
        <div class="block">
          <span class="wrapper " style="text-align:right;float:right" >
            <el-button type="success" class="mg-bottom10"  @click="importFile" >导入</el-button>
            <el-button :disabled="btnUploadDisable||getAllLoaded" type="primary" class="mg-bottom10"  @click="handleUploadFiles">开始上传</el-button>
            <el-button :disabled="btnUploadDisable||getAllUploading"class="mg-bottom10"  @click="handleDeleteUploadFile">清空列表</el-button>
          </span>
          <!--table-->
          <el-table class="tempform-table" v-bind:data="importFilesList" border style="width: 100%">
            <!--<el-table-column type="selection" width="55">
            </el-table-column>-->
            <el-table-column prop="name" label="文件名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="msg" label="导入信息"  show-overflow-tooltip>
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
      <el-tab-pane label="导出">
        <div class="block">
          <span class="wrapper">
            <el-select v-model="exportSelectedTeacher" class=" mg-bottom10" placeholder="教师姓名">
              <el-option v-for="item in getTeacherList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>

            <el-select v-model="exportSelectedProfessional"class=" mg-bottom10"placeholder="专业">
              <el-option v-for="item in getProfessionalList" :key="item" :label="item" :value="item" >
              </el-option>
            </el-select>
            <el-button type="success" class=" mg-bottom10" @click="exportBtn"  :disabled="exportSelectedTeacher===null&&exportSelectedProfessional===null">导出</el-button>
          </span>

          <!--table-->
          <el-table class="tempform-table" v-bind:data="tempTableData" border style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--<el-table-column label="课程" width="120">
                                      <template scope="scope">{{ scope.row.date }}</template>
                                    </el-table-column>-->
            <el-table-column prop="reciever" label="收件人" width="120">
            </el-table-column>
            <el-table-column prop="identity" label="身份" width="120">
            </el-table-column>
            <el-table-column prop="topic" label="主题" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time" label="时间" width="120">
            </el-table-column>
            <el-table-column prop="type" label="类型" width="120">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="120">
            </el-table-column>
            <el-table-column prop="opertate" label="操作" width="180">
              <template scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
            <!--<el-table-column prop="address" label="授课方式" show-overflow-tooltip>
                                    </el-table-column>-->
          </el-table>

          <div class="block ta-c mg-top10">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
     <input type="file" multiple v-show="false" ref="fileinput"  v-on:change="handleFileChange"/>
     <a href="http://192.168.3.102:8081/sas/api/word/export?&teacher=%E5%91%A8%E6%9C%A8%E8%89%AF">51515</a>

     <a href="     http://192.168.1.198:8081/sas/doc/classes/1495358123601.docx">     http://192.168.1.198:8081/sas/doc/classes/1495358123601.docx</a>

  </div>
</template>

<script src="./ProgressIndex.js">
</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>

</style>

<template>
  <div class="SupervisorIndex-box">

    <!--<el-row class="mg-top10 mg-left10 mg-bottom10">
        周数：<el-select v-model="listSelectedWeek" placeholder="请选择">
        <el-option v-for="item in 20" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
      </el-row>-->

    <!--table @selection-change="handleSelectionChange"-->
    <el-table class="tempform-table" border style="width: 100%" :data="getSupervisorList">
      <!--<el-table-column type="selection" width="55">
                </el-table-column>-->
      <el-table-column prop="userName" label="督导员" width="200">
      </el-table-column>
      <el-table-column prop="spareWeek" label="已填写空闲时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="opertate" label="操作" width="180">
        <template scope="scope">
          <el-button size="small" @click="showDialog(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block ta-c mg-top10">
      <el-pagination @current-change="handleCurrentChange" :current-page="getCurrentPage()" :page-size="10" layout="prev, pager, next, jumper" :total="getSupervisorListElements">
      </el-pagination>
    </div>

    <el-dialog :title="dialogTitle" v-model="dialogFormVisible" :modal="false" :show-close="false">
      <el-form :model="dialogForm">
        <el-form-item label="教师姓名:" :label-width="formLabelWidth">
          <el-input :readonly="dialogType!=='ADD'" v-model="dialogForm.userName" auto-complete="off" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="周数" :label-width="formLabelWidth">
          <el-select v-model="selectedWeek" placeholder="请选择">
            <el-option v-for="item in 20" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="课表" :label-width="formLabelWidth">
          <el-button class="mg-bottom10" @click="autoCreateSparaTime">自动填补</el-button>
          <el-button class="mg-bottom10" @click="saveSparaTime">保存</el-button>
          <el-button class="mg-bottom10" @click="unSelectAll">清空</el-button>


          <el-table class="tempform-table" style="width: 618px" :data="hang">
            <el-table-column width="55">
              <template scope="scope">
                <span>{{scope.$index+1}}</span>
              </template>
            </el-table-column>

            </el-table-column>
            <el-table-column label="星期一" width="80">
              <template scope="scope">
                <el-checkbox :key="`day1${scope.$index} `" v-model="wholeSpareList.day1[scope.$index]" :disabled="!selectedWeek"></el-checkbox>
              </template>
            </el-table-column>
            </el-table-column>
            <el-table-column label="星期二" width="80">
              <template scope="scope">
                <el-checkbox :key="`day2${scope.$index}`" v-model="wholeSpareList.day2[scope.$index]" :disabled="!selectedWeek"></el-checkbox>
              </template>
            </el-table-column>
            </el-table-column>
            <el-table-column label="星期三" width="80">
              <template scope="scope">
                <el-checkbox :key="`day3${scope.$index}`" v-model="wholeSpareList.day3[scope.$index]" :disabled="!selectedWeek"></el-checkbox>
              </template>
            </el-table-column>
            </el-table-column>
            <el-table-column label="星期四" width="80">
              <template scope="scope">
                <el-checkbox :key="`day4${scope.$index}`" v-model="wholeSpareList.day4[scope.$index]" :disabled="!selectedWeek"></el-checkbox>
              </template>
            </el-table-column>
            </el-table-column>
            <el-table-column label="星期五" width="80">
              <template scope="scope">
                <el-checkbox :key="`day5${scope.$index}`" v-model="wholeSpareList.day5[scope.$index]" :disabled="!selectedWeek"></el-checkbox>
              </template>
            </el-table-column>
            </el-table-column>
            <el-table-column label="星期六" width="80">
              <template scope="scope">
                <el-checkbox :key="`day6${scope.$index}`" v-model="wholeSpareList.day6[scope.$index]" :disabled="!selectedWeek"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="星期日" width="80">
              <template scope="scope">
                <el-checkbox :key="`day7${scope.$index}`" v-model="wholeSpareList.day7[scope.$index]" :disabled="!selectedWeek"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogCancel()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./SupervisorIndex.js">
</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>
.SupervisorIndex-box .el-dialog {
  top: 5% !important;
}
</style>

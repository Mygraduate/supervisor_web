<template>
  <div class="block">
    <el-row :gutter="20" class="mg-top10 mg-left10 mg-bottom10">
      <el-col :span="6">教师姓名：
        <el-input style="width:200px;" v-model="searchTeacherInput" placeholder="请输入教师姓名"></el-input>
      </el-col>
      <el-col v-if="showStatusSelection" :span="6">状态：
        <el-select v-model="selectedStatus" placeholder="请选择">
          <el-option v-for="item in selectStatusList" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="showWeekSelected">周数：
        <el-select v-model="selectedWeek" placeholder="请选择">
          <el-option v-for="item in 20" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="showDaySelected">星期：
        <el-select v-model="selectedDay" placeholder="请选择">
          <el-option v-for="item in selectDayList" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="showDateSelected">日期：
       <el-date-picker
          v-model="selectedDate"
          type="daterange"
          placeholder="选择日期范围">
        </el-date-picker>
      </el-col>



    </el-row>
    <span class="wrapper  mg-bottom10" style="float:right;margin-right:20px">
      <el-button type="primary" @click="clickSearch(),btnSearchClick({searchTeacherInput,selectedDay,selectedStatus,selectedWeek,setlectedItemsList,selectedDate})" :disabled="getBtnSearchDisabled">搜索</el-button>
      <el-button @click="clickReset">重置</el-button>
      <el-button type="danger" :disabled="btnDeletedDisable" @click="btnDeleteClick({setlectedItemsList})" v-if="showMutiplyDeleteBtn">删除</el-button>
      <el-button type="primary" v-if="showAutoCreateBtn" @click="btnAutoCreateClick">自动排课</el-button>
      <el-button type="primary" v-if="showExportExcelBtn" @click="btnExportClick({searchTeacherInput,selectedDay,selectedStatus,selectedWeek,setlectedItemsList,selectedDate})">导出Excel</el-button>
    </span>
    <!--table-->
    <el-table class="tempform-table" v-bind:data="tableDataResource" border style="width: 100%" ref="comfirmTable" @selection-change="selectionChange">
      <el-table-column v-if="showMutiplyDeleteBtn" type="selection" width="55">
      </el-table-column>
      <el-table-column prop="arrage.course.name" label="课程" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="arrage.course.content" label="授课内容" show-overflow-tooltip v-if="showCourseContent">
      </el-table-column>
      <el-table-column prop="arrage.course.type" label="授课方式" width="100">
      </el-table-column>
      <el-table-column prop="arrage.course.major" label="专业" width="120">
      </el-table-column>
      <el-table-column prop="arrage.course.address" label="教室" width="120">
      </el-table-column>
      <el-table-column prop="arrage.course.teacher" label="教师" width="120">
      </el-table-column>
      <el-table-column prop="arrage.course.scope" label="节次" width="80">
      </el-table-column>
      <el-table-column prop="arrage.course.time" label="听课时间" width="120">
      </el-table-column>
      <el-table-column v-if="showArragePeople" prop="groups" label="督导人员安排" width="120">
      </el-table-column>
      <el-table-column v-if="showArragePeopleCount" label="督导人数" width="120">
        <template scope="scope">
          <span v-text="getItemArrargePeopleLength(scope.row.arrage)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="opertate" label="操作" width="180">
        <template scope="scope">
          <el-button v-if="showCreateByHand" size="small" @click="btnItemCreateByHandClick(scope.$index, scope.row)">手动排课</el-button>
          <el-button v-if="showChangeBtn" size="small" @click="btnItemChangeStatusClick(scope.$index, scope.row)">更改状态</el-button>
          <el-button size="small" type="danger" v-if="showItemDeleteBtn" @click="btnItemDeleteClick(scope.$index, scope.row)">删除</el-button>
          <el-button size="small" type="primary" v-if="showItemDownloadBtn" @click="btnItemDownloadClick(scope.$index, scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block ta-c mg-top10">
      <el-pagination @current-change="clickCurrentChange" :page-size="10" :current-page="currentPage" layout="prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
let currentPageName = "feedback-table";

export default {
  name: currentPageName,
  data() {
    return {
      searchTeacherInput: '',
      selectedWeek: '',
      selectedDay: '',
      selectedStatus: '',
      selectedDate:'',
      setlectedItemsList: [],
      selectDayList: [{
        name: '星期一',
        value: 1
      }, {
        name: '星期二',
        value: 2
      }, {
        name: '星期三',
        value: 3
      }, {
        name: '星期四',
        value: 4
      }, {
        name: '星期五',
        value: 5
      }, {
        name: '星期六',
        value: 6
      }, {
        name: '星期天',
        value: 7
      }],
      btnDeletedDisable: true,
      btnSearchDisable: true,
      constValue: false
    }
  },
  props: {
    selectStatusList: {
      type: Array,
      default: function () {
        return []
      }
    },
    btnSearchClick: {
      type: Function,
      default: function () {
      }
    },
    btnResetClick: {
      type: Function,
      default: function () {
      }
    },
    btnDeleteClick: {
      type: Function,
      default: function () {
      }
    },
    btnAutoCreateClick: {
      type: Function,
      default: function () {
      }
    },
    btnExportClick:{
      type:Function,
      default:function(){

      }
    },
    btnItemDeleteClick: {
      type: Function,
      default: function () {
      }
    },
    btnItemChangeStatusClick: {
      type: Function,
      default: function () {
      }
    },
    btnItemCreateByHandClick: {
      type: Function,
      default: function () {
      }
    },
    btnItemDownloadClick:{
      type:Function,
      default:function(){
      }
    },
    tableDataResource: {
      type: Array,
      default: function () {
        return []
      }
    },
    currentPage: {
      type: Number,
      default:1
    },
    currentChange: {
      type: Function,
      default: function () {
      }
    },
    total: {
      type: Number,
      default: 0
    },
    showChangeBtn: {
      type: Boolean,
      default: false
    },
    showAutoCreateBtn: {
      type: Boolean,
      default: false
    },
    showMutiplyDeleteBtn: {
      type: Boolean,
      default: true
    },
    showWeekSelected:{
      type:Boolean,
      default:true
    },
    showDaySelected:{
      type:Boolean,
      default:true
    },
    showDateSelected:{
      type:Boolean,
      default:false
    },
    showItemDeleteBtn: {
      type: Boolean,
      default: true
    },
    showCourseContent:{
      type:Boolean,
      default:true
    },
    showStatusSelection: {
      type: Boolean,
      default: false
    },
    showCreateByHand: {
      type: Boolean,
      default: false
    },
    isResetAll: {
      type: Boolean,
      default: false
    },
    showArragePeopleCount: {
      type: Boolean,
      default: false
    },
    showArragePeople: {
      type: Boolean,
      default: true
    },
    showExportExcelBtn:{
      type:Boolean,
      default:false
    },
    showItemDownloadBtn:{
      type:Boolean,
      default:false
    }


  },
  computed:{
    getBtnSearchDisabled:function(){
      let {
        selectedWeek,
        searchTeacherInput,
        selectedDay,
        selectedStatus,
        selectedDate
      }=this
      return !(selectedWeek>0||selectedDay>0||searchTeacherInput.trim().length>0||selectedStatus>0||selectedStatus===0||selectedDate.length>0)
    }
  },
  watch: {
    isResetAll: function (value) {
      let that = this
      if (value !== that.constValue) {
        this.resetLocalData()
        that.constValue = value
      }
    },
    setlectedItemsList: function (value) {
      if (value.length > 0) {
        this.btnDeletedDisable = false
      } else {
        this.btnDeletedDisable = true
      }
    },
    selectedWeek: function (value) {
      let that = this
      if (value > 0 || that.searchTeacherInput.trim().length > 0 || that.selectedDay > 0 || that.selectedStatus > -1) {
        that.btnSearchDisable = false
      } else {
        that.btnSearchDisable = true
      }
    },

    searchTeacherInput: function (value) {
      let that = this
      if (value.trim().length > 0 || that.selectedWeek > 0 || that.selectedDay > 0 || that.selectedStatus > -1) {
        that.btnSearchDisable = false
      } else {
        that.btnSearchDisable = true
      }
    },
    selectedDay: function (value) {
      let that = this
      if (value > 0 || that.searchTeacherInput.trim().length > 0 || that.selectedWeek > 0 || that.selectedStatus > -1) {
        that.btnSearchDisable = false
      } else {
        that.btnSearchDisable = true
      }
    },
    selectedStatus: function (value) {
      let that = this
      if (value > -1 || that.searchTeacherInput.trim().length > 0 || that.selectedWeek > 0 || that.selectedDay > 0) {
        that.btnSearchDisable = false
      } else {
        that.btnSearchDisable = true
      }
    },


  },
  methods: {
    getItemArrargePeopleLength: function (item) {
      if (item.groups) {
        return item.groups.split(',').length
      }
      return '-'
    },
    clickReset: function () {
      let that = this
      that.resetLocalData()
      that.btnResetClick ? that.btnResetClick() : null

    },
    resetLocalData: function () {
      let that = this
      that.searchTeacherInput = ''
      that.selectedWeek = ''
      that.selectedDay = ''
      that.selectedStatus = ''
      that.selectedDate=''
      that.setlectedItemsList = []
      setTimeout(() => {
        that.btnSearchDisable = true
      }, 100);
      that.btnDeletedDisable = true
      that
        .$refs
        .comfirmTable
        .clearSelection()
      that.replaceRouter()
    },
    clickSearch: function () {
      let that = this
      that.replaceRouter()
    },
    clickCurrentChange: function (page) {
      let that = this
      this.currentChange ? this.currentChange({ page, ...that.$route.query }) : null
    },
    selectionChange: function (value) {
      this.setlectedItemsList = value
    },
    replaceRouter: function () {
      let that = this
      that.$router.replace({
        name: that.$route.name,
        query: {
          ...that.$route.query,
          searchTeacherInput: that.searchTeacherInput,
          selectedWeek: that.selectedWeek,
          selectedDay: that.selectedDay,
          selectedStatus: that.selectedStatus,
          selectedDate:that.selectedDate
        }
      })

    }
  }

}

</script>

<style scoped>

</style>

/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-26 20:57:31
 */

'use strict'
require('./ProgressIndex.css')
import commonUtils from '../../../utils/CommonUtils'
import timeUtils from '../../../utils/TimeUtils'
import {apiUploadExcel, apiExportWord} from '../../../utils/Api'

// vuex
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name : 'cc-ProgressIndex',
  data() {
    return {
      selectedTab: 'course',
      importFilesList: [],
      btnUploadDisable: true,
      hadUploadCount: 0,
      searchMajorInput: '',
      searchTeacherInput: '',
      selectedWeek: '',
      selectedDay: '',
      selectedTeacher: '',
      selectedProfressional: '',
      selectedCollege: '',
      courseCurrentPage: 1,
      selectDayList: [
        {
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
        }
      ],
      selectArrangeList: [
        {
          name: '是',
          value: 1
        }, {
          name: '否',
          value: 0
        }
      ]
    }
  },
  beforeCreate : function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:beforeCreate')
  },
  created : function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:created')
    let that = this
    that.requestCourseList({})
    setTimeout(() => {
      that.requestTeacherList({pageSize: 600})
    }, 1000)
    setTimeout(() => {
      that.requestCollegeAll()
    }, 500)
  },
  beforeMount : function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:beforeMount')
  },
  mounted : function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:mounted', this)
  },
  updated : function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:updated')
  },
  activated : function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:activated')
  },
  deactivated : function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:deactivated')
  },
  beforeDestroy : function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:beforeDestroy')
    let that = this
    that.resetProgressContent()
  },
  destroyed : function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:destroyed')
  },
  computed : {
    ...mapGetters(['getCourseList', 'getCourseListElements', 'getTeacherList', 'getProfessionalList', 'getAllCollegeList']),
    getAllLoaded: function () {
      let that = this
      let result = true
      for (const value of that.importFilesList) {
        if (value.uploadState !== 'success') {
          result = false
        }
      }

      return result
    },
    getAllUploading: function () {
      let that = this
      let result = true
      for (const value of that.importFilesList) {
        if (value.uploadState !== 'uploading') {
          result = false
        }
      }

      return result
    },
    getCourseBtnDisable: function () {
      let {selectedTeacher, selectedProfressional, selectedCollege, selectedWeek, selectedDay} = this
      return !(selectedTeacher.trim().length > 0 || selectedProfressional.trim().length > 0 || selectedWeek > 0 || selectedDay > 0 || selectedCollege > 0)
    }
  },
  watch : {
    importFilesList: function (value) {
      this.btnUploadDisable = !(value.length > 0)
    },
    selectedTab: function (value) {
      let that = this
      if (value !== 'course') {
        that.selectedTeacher = ''
        that.selectedProfressional = ''
        that.selectedWeek = ''
        that.selectedDay = ''
        that.selectedCollege = ''
        that
          .$router
          .replace({
            name: that.$route.name,
            query: {
              ...that.$route.query,
              selectedTeacher: '',
              selectedProfressional: '',
              selectedWeek: '',
              selectedDay: '',
              selectedCollege: '',
              courseCurrentPage: ''
            }
          })
        that.resetProgressContent()
      } else {
        if (that.courseCurrentPage !== 1) {
          that.courseCurrentPage = 1
        } else {
          that.requestCourseList({})
          that.requestCollegeAll()
        }
      }
    },
    selectedTeacher: function (value) {
      if (value.trim().length > 0) {
        this.selectedProfressional = ''
        let tempArray = this
          .getTeacherList
          .filter((element) => {
            return element.name === value
          })

        this.requestProfessional({tid: tempArray[0].id})
      }
    }
  },
  methods : {
    ...mapMutations(['resetProgressContent', 'resetProfessionalList']),
    ...mapActions(['requestCourseList', 'requestTeacherList', 'requestProfessional', 'requestCollegeAll', 'requestExportWord']),
    exportSelectedTeacher: function (tid) {
      let that = this
    },
    clickCourseReset: function () {
      let that = this
      that.selectedTeacher = ''
      that.selectedProfressional = ''
      that.selectedWeek = ''
      that.selectedDay = ''
      that.selectedCollege = ''
      that
        .$router
        .replace({
          name: that.$route.name,
          query: {
            ...that.$route.query,
            selectedTeacher: '',
            selectedProfressional: '',
            selectedWeek: '',
            selectedDay: '',
            selectedCollege: ''
          }
        })
      if (that.courseCurrentPage === 1) {
        that.requestCourseList({
          ...that.$route.query,
          page: that.courseCurrentPage
        })
      }
      that.courseCurrentPage = 1
    },
    clickCourseSearch: function ({
      selectedTeacher,
      selectedProfressional,
      selectedWeek,
      selectedDay,
      selectedArrange,
      selectedCollege
    }) {
      let that = this
      that.courseCurrentPage = 1
      that
        .$router
        .replace({
          name: that.$route.name,
          query: {
            ...that.$route.query,
            selectedTeacher,
            selectedProfressional,
            selectedWeek,
            selectedDay,
            selectedCollege,
            courseCurrentPage: that.courseCurrentPage
          }
        })
      that.requestCourseList({
        major: selectedProfressional,
        collegeId: selectedCollege,
        teacher: selectedTeacher,
        week: selectedWeek,
        day: selectedDay,
        page: 1
      })
    },
    handleCourseCurrentChange(page) {
      alert(page)
      let that = this
      let {selectedTeacher, selectedProfressional, selectedCollege, selectedWeek, selectedDay} = that.$route.query
      that
        .$router
        .replace({
          name: that.$route.name,
          query: {
            ...that.$route.query,
            courseCurrentPage: page
          }
        })
      that.requestCourseList({
        major: selectedTeacher,
        teacher: selectedProfressional,
        collegeId: selectedCollege,
        week: selectedWeek,
        day: selectedDay,
        page
      })
    },
    importFile: function (e) {
      commonUtils.openSelectFilesDialog(this, e)
    },
    handleFileChange: function (e) {
      let that = this
      console.log('handleFileChange', e.target.files)
      let files = e.target.files
      if (commonUtils.checkFiles(files)) {
        for (let i = 0; i < files.length; i++) {
          let formData = new FormData()
          formData.append('file', files[i])
          that
            .importFilesList
            .push({
              fileId: commonUtils.getUUID(),
              uploadState: 'ready',
              name: files[i].name,
              formData
            })
        }

        // that.handleUploadFiles()
      } else {
        commonUtils.showMsgBox({context: that, msg: '文件类型错误，请重试'})
      }
    },
    handleDeleteUploadFile: function (index, obj) {
      let that = this
      // console.log(that.$refs.fileinput.value)
      that.$refs.fileinput.value = ''
      that.importFilesList = []
    },
    handleUploadFiles: function () {
      let that = this
      that
        .importFilesList
        .forEach((element, index) => {
          if (element.uploadState !== 'success') {
            (({body, fileId, success, fail, complete}) => {
              that.importFilesList[index].uploadState = 'uploading'
              apiUploadExcel({body, emulateJSON: true, success, fail, complete})
            })({
              body: element.formData,
              fileId: element.fileId,
              complete: (res) => {
                if (res.data && res.data.code === 1) {
                  that.importFilesList[index].uploadState = 'success'
                  that.importFilesList[index].msg = '上传成功'
                } else {
                  that.importFilesList[index].uploadState = 'fail'
                  that.importFilesList[index].msg = '上传失败'
                }
              }
            })
          }
        })
    },
    exportBtn: function ({selectedTeacher, selectedProfressional, selectedCollege, selectedWeek, selectedDay}) {
      let that = this
      if (selectedTeacher.trim().length <= 0 || selectedCollege <= 0) {
        commonUtils.showMsg({context: that, msg: '请先选择教师与学院', type: 'error'})
        return
      }

      that.courseCurrentPage = 1
      that
        .$router
        .replace({
          name: that.$route.name,
          query: {
            ...that.$route.query,
            selectedTeacher,
            selectedProfressional,
            selectedWeek,
            selectedDay,
            selectedCollege,
            courseCurrentPage: that.courseCurrentPage
          }
        })

      that.requestCourseList({
        major: selectedProfressional,
        collegeId: selectedCollege,
        teacher: selectedTeacher,
        week: selectedWeek,
        day: selectedDay,
        page: 1,
        success(res) {
          if (res.data.data.content && res.data.data.content.length > 0) {
            that.requestExportWord({major: selectedProfressional, teacher: selectedTeacher, collegeId: selectedCollege, week: selectedWeek, day: selectedDay})
          } else {
            commonUtils.showMsg({context: that, msg: '该用户没有数据'})
          }
        }
      })

    }
  }
}

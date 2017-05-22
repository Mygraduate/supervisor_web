/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-22 09:47:07
 */

'use strict'
require('./ProgressIndex.css')
import commonUtils from '../../../utils/CommonUtils'
import timeUtils from '../../../utils/TimeUtils'
import {apiUploadExcel, apiExportWord} from '../../../utils/Api'

// vuex
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: 'cc-ProgressIndex',
  data () {
    return {importFilesList: [], btnUploadDisable: true, hadUploadCount: 0, exportSelectedTeacher:null, exportSelectedProfessional:null}
  },
  beforeCreate: function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:beforeCreate')
  },
  created: function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:created')
    let that = this
    that.requestCourseList({...that.$route.query})
    setTimeout(()=>{
      that.requestTeacherList(
        {
          pageSize: 600
        }
      )
    },1000)

  },
  beforeMount: function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:beforeMount')
  },
  mounted: function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:mounted', this)
  },
  updated: function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:updated')
  },
  activated: function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:activated')
  },
  deactivated: function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:deactivated')
  },
  beforeDestroy: function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:beforeDestroy')
  },
  destroyed: function () {
    commonUtils.log('--ProgressIndex.Vue--Lifecycle:destroyed')
  },
  computed: {
    ...mapGetters(['getCourseList', 'getCourseListElements', 'getTeacherList', 'getProfessionalList']),
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

  },
  watch: {
    importFilesList: function (value) {
      this.btnUploadDisable = !(value.length > 0)
    },
    exportSelectedTeacher: function (tid) {
      let that = this
      if (tid) {
        that.requestProfessional({
          tid
        })
      }
    }
  },
  methods: {
    ...mapActions(['requestCourseList', 'requestTeacherList', 'requestProfessional']),
    handleCurrentChange (page) {
      let that = this
      that
        .$router
        .replace({
          name: that.$route.name,
          query: {
            ...that.$route.query,
            page
          }
        })
      that.requestCourseList({page})
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
      that.importFilesList.forEach((element, index)=> {
        if (element.uploadState !== 'success') {
          (({body, fileId, success, fail, complete}) => {
            that.importFilesList[index].uploadState = 'uploading'
            apiUploadExcel({
              body,
              emulateJSON: true,
              success,
              fail,
              complete
            })
          })({
            body: element.formData,
            fileId: element.fileId,
            complete: (res) => {
              if (res.data.msg) {
                that.importFilesList[index].msg = res.data.msg
              }
              if (res.data.code === 1) {
                that.importFilesList[index].uploadState = 'success'
              } else {
                that.importFilesList[index].uploadState = 'fail'
              }
            }
          })
        }
      })
    },
    exportBtn () {
      window.open('http://192.168.3.102:8081/sas/api/word/export?&teacher=%E5%91%A8%E6%9C%A8%E8%89%AF')
      // apiExportWord({
      //   params: {
      //     teacher: '周木良'
      //   },
      //   method:'GET'
      // })
    }
  }
}

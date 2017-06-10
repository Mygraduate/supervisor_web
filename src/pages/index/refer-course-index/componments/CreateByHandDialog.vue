<template>
  <el-dialog :title="'手动排课'" v-model="showDialog" :show-close="false" :close-on-click-modal="false" size="tiny">
    <el-form ref="form" :model="dialogData" :label-position="'right'" label-width="100px">
      <el-form-item label="课程名称：">
        {{dialogData.name?dialogData.name:''}}
      </el-form-item>
      <el-form-item label="授课内容：">
        {{dialogData.content?dialogData.content:''}}
      </el-form-item>
      <el-form-item label="授课教师：">
        {{dialogData.teacher?dialogData.teacher:''}}
      </el-form-item>
      <el-form-item label="授课时间：">
        {{dialogData.time?dialogData.time:''}}{{getCourseDay}}
      </el-form-item>
      <el-form-item label="地点：">
        {{dialogData.address?dialogData.address:''}}
      </el-form-item>
      <el-form-item label="节次：">
        {{dialogData.scope?dialogData.scope:''}}
      </el-form-item>
      <el-form-item label="督导成员：">
        <el-select v-model="groupsValue" multiple placeholder="请选择">
          <el-option v-for="item in getWholeSelecGroupList" :key="item.userId" :label="getSupervisorLable(item)" :value="item.userId">
            <span style="float: left">{{getSupervisorLable(item)}}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.recomamdText?item.recomamdText:'' }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="btnCancel(),groupsValue=[]">取 消</el-button>
      <el-button type="primary" @click="btnOk(groupsValue,dialogData),groupsValue=[]" :loading="btnOkLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
let currentPageName = "create-by-hand-dialog";

export default {
  name: currentPageName,
  data() {
    return {
      formLabelWidth: '120',
      itemNewStatus: '',
      selectStatusList: [
        {
          name: '未确定',
          value: 0
        }, {
          name: '已确定',
          value: 1
        }, {
          name: '待执行',
          value: 2
        }, {
          name: '已执行',
          value: 3
        }

      ],
      groupsValue: [
      ]
    }
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    btnCancel: {
      type: Function,
      default: function () {
      }
    },
    btnOk: {
      type: Function,
      default: function () {
      }
    },
    selectGroupList: {
      type: Array,
      default: function () {
        return []
      }
    },
    recommandSelectGroupList: {
      type: Array,
      default: function () {
        return []
      }
    },
    btnOkLoading:{
      type:Boolean,
      default:false
    }

  },
  computed: {
    /**
    * 过滤按一定顺序的选择数组
    *
    * @returns
    */
    getWholeSelecGroupList: function () {
      let that = this
      let tempArray = []
      let { selectGroupList,
        recommandSelectGroupList } = that

      if (selectGroupList ===
        recommandSelectGroupList) {
        return selectGroupList
      }

      let unRecommandList = selectGroupList.filter((value) => {
        for(let recommandValue of recommandSelectGroupList){
          if(recommandValue.userName===value.userName){
            return false
          }
        }
        return  true
      })

      let recommandList = recommandSelectGroupList.map((value) => {
        return Object.assign({}, value, { recomamdText: '推荐' })
      })


      tempArray = recommandList.concat(unRecommandList)

      return tempArray
    },
    /**
  * 转换日状态
  *
  * @returns
  */
    getCourseDay: function () {
      let that = this
      let result = ''
      if (that.dialogData.course && that.dialogData.course.day) {

        let { day } = that.dialogData.course
        switch (day) {
          case 1:
            result = '星期一'
            break
          case 2:
            result = '星期二'
            break
          case 3:
            result = '星期三'
            break
          case 4:
            result = '星期四'
            break
          case 5:
            result = '星期五'
            break
          case 6:
            result = '星期六'
            break
          case 7:
            result = '星期天'
            break
          default:
            break;
        }
      }
      return `(${result})`
    },
    /**
     * 转换状态
     *
     * @returns
     */
    getCurrentItemStatus: function () {
      let { dialogData } = this
      if (dialogData.status) {
        if (status === 0) {
          return '未确定'
        } else if (status === 1) {
          return '已确定'
        } else if (status === 2) {
          return '待执行'
        } else if (status === 3) {
          return '已执行'
        }
      } else {
        return '未确定'
      }
    },

    /**
     * 过滤与当前item相同的状态
     *
     * @returns
     */
    getFillterItemStatusList: function () {
      let { selectStatusList, dialogData } = this
      return selectStatusList.filter((value) => {
        return value.value !== dialogData.status
      })
    },
  },
  watch: {
    showDialog: function (value) {
      let that = this
      if (value) {
        that.dialogData.groups ? that.groupsValue = that.dialogData.groups.split(',') : null
      }
    }

  },
  methods: {
    getSupervisorLable(item){
      if(item.teacherName){
        return item.teacherName
      }else if(item.userName){
        return item.userName
      }
    }
  }

}

</script>

<style scoped>

</style>
